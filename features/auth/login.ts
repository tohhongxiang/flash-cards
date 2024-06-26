"use server";

import { z } from "zod";
import db from "../../services/db/drizzle";
import { Argon2id } from "oslo/password";
import { lucia } from "@/services/auth";
import { cookies } from "next/headers";

export const loginSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(50, { message: "Username must be at most 50 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 charactesr long" }),
});

export const login = async (values: z.infer<typeof loginSchema>) => {
    const existingUser = await db.query.userTable.findFirst({
        where: (table, { eq }) => eq(table.username, values.username),
    });

    if (!existingUser || !existingUser.hashedPassword) {
        return {
            error: "Incorrect username or password",
        };
    }

    const isValidPassword = await new Argon2id().verify(
        existingUser.hashedPassword,
        values.password
    );

    if (!isValidPassword) {
        return {
            error: "Incorrect username or password",
        };
    }

    const session = await lucia.createSession(existingUser.id, {
        expiresIn: 60 * 60 * 24 * 30,
    });
    const sessionCookie = await lucia.createSessionCookie(session.id);

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return {
        success: "Logged in successfully",
    };
};
