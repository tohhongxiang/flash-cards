import { getDeck } from "@/actions/deckActions";
import ReviewCards from "./_components/review-cards";

export default async function ReviewPage({
    params,
}: {
    params: { deckId: string };
}) {
    const deck = await getDeck(parseInt(params.deckId));

    if (!deck) {
        return <p>Deck not found</p>;
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
            <ReviewCards cards={deck.cards} />
        </div>
    );
}
