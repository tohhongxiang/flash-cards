import { cardDb } from "@/services/db/actions";
import { DeckType } from "@/types/deckType";

export default async function getCards(deckId: DeckType["id"]) {
    const cards = await cardDb.getCards(deckId);
    return cards;
}
