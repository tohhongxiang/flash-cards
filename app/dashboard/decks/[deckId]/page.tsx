import Deck from "@/components/deck";
import getDeck from "@/features/deck/get-deck";

export default async function SpecificDeckPage({
    params,
}: {
    params: { deckId: string };
}) {
    const deckId = parseInt(params.deckId);

    if (!deckId || Number.isNaN(deckId)) {
        return <div>Invalid deck ID</div>;
    }

    const deck = await getDeck(deckId);

    if (!deck) {
        return <div>Not found</div>;
    }

    return <Deck deck={deck} />;
}
