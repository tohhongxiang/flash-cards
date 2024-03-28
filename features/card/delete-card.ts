import { cardDb } from "@/services/db/actions";
import { CardType } from "@/types/cardType";

export default async function deleteCard(id: CardType["id"]) {
    const deletedCard = await cardDb.deleteCard(id);
    return deletedCard;
}
