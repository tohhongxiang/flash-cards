import { deckDb } from "@/services/db/actions";
import { DeckType } from "@/types/deckType";

export default async function getDeck(deckId: DeckType["id"]) {
    const deck = await deckDb.getDeck(deckId);
    return deck;
}
