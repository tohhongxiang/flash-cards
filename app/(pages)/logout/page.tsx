import { logout } from "@/features/auth/log-out";
import { redirect } from "next/navigation";

export default function Logout() {
    logout();

    redirect("/");
}
