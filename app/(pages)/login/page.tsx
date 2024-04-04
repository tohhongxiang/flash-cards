import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { validateRequest } from "@/services/auth";

export default async function LoginPage() {
    const { user } = await validateRequest();

    if (user) {
        return redirect("/dashboard");
    }
    return <LoginForm />;
}
