"use server";

import { google } from "@/services/auth/google";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export const createGoogleAuthorisationURL = async () => {
    try {
        const state = generateState();
        const codeVerifier = generateCodeVerifier();

        cookies().set("codeVerifier", codeVerifier, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        cookies().set("state", state, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        const authorisationURL = await google.createAuthorizationURL(
            state,
            codeVerifier,
            { scopes: ["email", "profile"] }
        );

        return {
            success: true,
            data: authorisationURL.toString(),
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            error: error?.message,
        };
    }
};
