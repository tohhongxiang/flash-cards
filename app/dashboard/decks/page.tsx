import { getDecks } from "@/actions/deckActions";
import Decks from "@/components/decks";

export default async function DashboardPage() {
    const data = await getDecks();
    return <Decks decks={data} />;
}
