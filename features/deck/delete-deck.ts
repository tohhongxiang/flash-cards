import { deckDb } from "@/services/db/actions";
import { DeckType } from "@/types/deckType";

export default async function deleteDeck(deckId: DeckType["id"]) {
    const deletedDeck = await deckDb.deleteDeck(deckId);
    return deletedDeck;
}
