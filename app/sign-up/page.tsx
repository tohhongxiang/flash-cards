import { validateRequest } from "@/services/auth";
import SignUpForm from "./SignUpForm";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
    const { user } = await validateRequest();

    if (user) {
        return redirect("/dashboard");
    }
    return <SignUpForm />;
}
