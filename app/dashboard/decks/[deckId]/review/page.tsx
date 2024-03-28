import ReviewCards from "./_components/review-cards";
import { getCards } from "@/actions/cardActions";

export default async function ReviewPage({
    params,
}: {
    params: { deckId: string };
}) {
    const cards = await getCards(parseInt(params.deckId), { toReview: false });

    if (!cards) {
        return <p>Deck not found</p>;
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
            <ReviewCards cards={cards} />
        </div>
    );
}
