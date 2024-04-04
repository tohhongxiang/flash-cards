import getPendingReviewCards from "@/features/card/get-pending-review-cards";
import ReviewCards from "./_components/review-cards";

export default async function ReviewPage({
    params,
}: {
    params: { deckId: string };
}) {
    const cards = await getPendingReviewCards(parseInt(params.deckId));

    if (!cards) {
        return <p>Deck not found</p>;
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
            <ReviewCards cards={cards} />
        </div>
    );
}
