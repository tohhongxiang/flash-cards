import { redirect } from "next/navigation";
import { logout } from "./actions/logout";

export default function Logout() {
    logout();

    redirect("/");
}
