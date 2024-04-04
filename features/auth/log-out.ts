"use server";

import { lucia, validateRequest } from "@/services/auth";
import { cookies } from "next/headers";

export const logout = async () => {
    try {
        const { session } = await validateRequest();

        if (!session) {
            return {
                error: "Unauthorized",
            };
        }

        await lucia.invalidateSession(session.id);
        const sessionCookie = lucia.createBlankSessionCookie();

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            error: error?.message,
        };
    }
};
