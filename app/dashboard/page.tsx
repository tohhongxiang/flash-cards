import { validateRequest } from "@/services/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const { user } = await validateRequest();

    if (!user) {
        redirect("/login");
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <Link href="/logout">Logout</Link>
        </div>
    );
}
