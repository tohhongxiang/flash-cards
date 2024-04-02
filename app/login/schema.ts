import { z } from "zod";

export const loginSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(50, { message: "Username must be at most 50 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 charactesr long" }),
});
