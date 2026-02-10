"use client";

import { type HTMLMotionProps, isMotionComponent, motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
  HTMLMotionProps<keyof HTMLElementTagNameMap>,
  "ref"
> & { ref?: React.Ref<T> };

type WithAsChild<Base extends object> =
  | (Base & { asChild: true; children: React.ReactElement })
  | (Base & { asChild?: false | undefined });

type SlotProps<T extends HTMLElement = HTMLElement> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
} & DOMMotionProps<T>;

function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.RefObject<T | null>).current = node;
      }
    });
  };
}

function mergeProps<T extends HTMLElement>(
  childProps: AnyProps,
  slotProps: DOMMotionProps<T>,
): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(
      childProps.className as string,
      slotProps.className as string,
    );
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style as React.CSSProperties),
      ...(slotProps.style as React.CSSProperties),
    };
  }

  return merged;
}

function Slot<T extends HTMLElement = HTMLElement>({
  children,
  ref,
  ...props
}: SlotProps<T>) {
  if (!React.isValidElement(children)) return null;

  // Explicitly reject Fragments (cannot merge props into Fragment)
  if (children.type === React.Fragment) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[Slot] Cannot merge props into React.Fragment. Wrap children in an element.",
      );
    }
    // Type assertion for Fragment children
    const fragmentChildren = children as React.ReactElement<{
      children?: React.ReactNode;
    }>;
    return fragmentChildren.props.children;
  }

  const { ref: childRef, ...childProps } = children.props as AnyProps;
  const mergedProps = mergeProps(childProps, props);

  // Determine rendering strategy WITHOUT creating components during render
  let Base: React.ElementType;

  // Case 1: Child is already a motion component → reuse directly
  if (
    typeof children.type === "object" &&
    children.type !== null &&
    isMotionComponent(children.type)
  ) {
    Base = children.type;
  }
  // Case 2: Child is standard HTML/SVG tag → use pre-existing motion.* component
  else if (typeof children.type === "string") {
    // Type-safe access to motion components
    const tagName = children.type as keyof typeof motion;
    const motionComponent = motion[tagName];

    // Check if motion component exists for this tag
    if (typeof motionComponent === "function") {
      Base = motionComponent;
    } else {
      // Fallback to regular tag if motion component doesn't exist
      Base = children.type as React.ElementType;
    }
  }
  // Case 3: Custom component (non-motion) → render as-is
  // ⚠️ Motion props won't work unless wrapped externally with motion.custom()
  else {
    Base = children.type as React.ElementType;
  }

  return (
    <Base {...mergedProps} ref={mergeRefs(childRef as React.Ref<T>, ref)} />
  );
}

export {
  type AnyProps,
  type DOMMotionProps,
  Slot,
  type SlotProps,
  type WithAsChild,
};
