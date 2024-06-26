"use server";

import { z } from "zod";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { userTable } from "@/services/db/schema";
import db from "../../services/db/drizzle";
import { lucia } from "@/services/auth";
import { cookies } from "next/headers";

export const signupSchema = z
    .object({
        username: z
            .string()
            .min(3, { message: "Username must be at least 3 characters" })
            .max(50, { message: "Username must be at most 50 characters" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 charactesr long" }),
        confirmPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 charactesr long" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const signUp = async (values: z.infer<typeof signupSchema>) => {
    const hashedPassword = await new Argon2id().hash(values.password);
    const userId = generateId(15);

    try {
        await db
            .insert(userTable)
            .values({ id: userId, username: values.username, hashedPassword });

        const session = await lucia.createSession(userId, {
            expiresIn: 60 * 60 * 24 * 30,
        });
        const sessionCookie = await lucia.createSessionCookie(session.id);

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        return {
            success: true,
            data: { userId },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
};
