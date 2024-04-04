"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { login, loginSchema } from "@/features/auth/login";
import { createGoogleAuthorisationURL } from "@/features/auth/create-google-authorisation-url";

export default function LoginForm() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const router = useRouter();
    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        const result = await login(values);

        if (result.error) {
            toast({ variant: "destructive", description: result.error });
        } else if (result.success) {
            toast({
                variant: "default",
                description: "Logged in successfully!",
            });

            router.push("/dashboard");
        }
    };

    const onGoogleSignInClicked = async () => {
        const result = await createGoogleAuthorisationURL();
        if (result.error) {
            toast({
                variant: "destructive",
                description: result.error,
            });
        } else if (result.success) {
            window.location.href = result.data.toString();
        }
    };

    return (
        <div className="mx-auto max-w-md p-8">
            <h1 className="mb-8 text-2xl font-bold">Login</h1>
            <div className="flex w-full items-center justify-center">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={onGoogleSignInClicked}
                >
                    Sign in with Google
                </Button>
            </div>
            <Separator className="my-4" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="really-cool-username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="********"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}
