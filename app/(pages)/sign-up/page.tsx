import { validateRequest } from "@/services/auth";
import SignUpForm from "./SignUpForm";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignUpPage() {
    const { user } = await validateRequest();

    if (user) {
        return redirect("/dashboard");
    }
    return (
        <>
            <div>
                <p>
                    Have an account? <Link href="/login">Log in</Link>
                </p>
            </div>
            <SignUpForm />
        </>
    );
}
