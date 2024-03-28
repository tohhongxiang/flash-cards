import { CardType, FeedbackType } from "@/types/cardType";
import { calculateUpdatedCard } from "./utils/calculate-updated-card";
import { cardDb } from "@/services/db/actions";

export default async function updateCardAfterReview(
    id: CardType["id"],
    feedback: FeedbackType
) {
    const card = await cardDb.getCard(id);
    if (!card) {
        throw new Error("Card not found!");
    }

    const updatedCard = calculateUpdatedCard(card)[feedback];

    return cardDb.updateCard(id, updatedCard);
}
