import { cardDb } from "@/services/db/actions";
import { DeckType } from "@/types/deckType";

export default async function getPendingReviewCards(deckId: DeckType["id"]) {
    const cardsToReview = await cardDb.getCards(deckId, { toReview: true });
    return cardsToReview;
}
