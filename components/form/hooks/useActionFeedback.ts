import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state"

type Args = {
    actionState: ActionState
}

type UseActionFeedbackOptions = {
    onSuccess?: (Args: Args) => void;
    onError?: (Args: Args) => void
}

const useActionFeedback = (actionState: ActionState, options: UseActionFeedbackOptions) => {
    const prevTimestamp = useRef(actionState.timestamp)

    useEffect(() => {
        const isUpdate = prevTimestamp.current !== actionState.timestamp;
        if (!isUpdate) return;

        if (actionState.status === 'SUCCESS') {
            options.onSuccess?.({ actionState })
        }
        if (actionState.status === 'ERROR') {
            options.onError?.({ actionState })
        }

        prevTimestamp.current = actionState.timestamp;
    }, [actionState, options])

}
export { useActionFeedback }