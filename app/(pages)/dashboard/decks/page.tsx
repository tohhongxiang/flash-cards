import Decks from "@/components/decks";
import getDecks from "@/features/deck/get-decks";

export default async function DashboardPage() {
    const data = await getDecks();
    return <Decks decks={data} />;
}
