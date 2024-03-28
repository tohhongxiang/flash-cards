import { CardType } from "@/types/cardType";
import validateCard from "./utils/validate-card";
import { cardDb } from "@/services/db/actions";

export default async function updateCard(
    id: CardType["id"],
    updates: Partial<CardType>
) {
    const card = await cardDb.getCard(id);

    if (!card) {
        throw new Error("Card not found");
    }

    validateCard({ ...card, ...updates });

    const updatedCard = await cardDb.updateCard(id, updates);
    return updatedCard;
}
