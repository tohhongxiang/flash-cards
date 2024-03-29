import { CreatedCardType } from "@/types/cardType";
import validateCard from "./utils/validate-card";
import { cardDb } from "@/services/db/actions";

export default async function createCard(newCard: CreatedCardType) {
    validateCard(newCard);

    const createdCard = cardDb.createCard(newCard);
    return createdCard;
}
