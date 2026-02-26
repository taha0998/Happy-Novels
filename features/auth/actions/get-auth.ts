// get-auth TAHOWA

// import { cookies } from "next/headers"
// import { cache } from "react"
// import { lucia } from "@/lib/lucia"

// export const getAuth = cache(async () => {
//     const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
//     if (!sessionId) {
//         return {
//             user: null,
//             session: null
//         }
//     };
//     const result = lucia.validateSession(sessionId);
//     return result
// })