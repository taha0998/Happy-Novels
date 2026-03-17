import { redirect } from "next/navigation";
import { SignInPath } from "@/lib/paths";
import { getAuth } from "./get-auth";

export const getAuthOrRedirect = async () => {
    const auth = await getAuth();
    if (!auth.user) {
        redirect(SignInPath())
    }
    return auth;
}