import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
            <h1 className="text-3xl font-bold">Flash Cards</h1>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href="/dashboard/decks">Dashboard</Link>
                </Button>
                <Button variant="secondary" asChild>
                    <Link href="/sign-up">Signup</Link>
                </Button>
            </div>
        </main>
    );
}
