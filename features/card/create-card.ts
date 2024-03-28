import { CreatedCardType } from "@/types/cardType";
import validateCard from "./utils/validate-card";
import { cardDb } from "@/services/db/actions";

export default async function createCard(newCard: CreatedCardType) {
    const error = validateCard(newCard);
    if (error) {
        throw new Error(error);
    }

    const createdCard = cardDb.createCard(newCard);
    return createdCard;
}
