import { DeckType } from "@/types/deckType";
import validateDeck from "./utils/validate-deck";
import { deckDb } from "@/services/db/actions";

export default async function updateDeck(
    id: DeckType["id"],
    updates: Partial<DeckType>
) {
    const deck = await deckDb.getDeck(id);

    if (!deck) {
        throw new Error("Deck not found!");
    }

    const updatedDeck = { ...deck, ...updates };
    validateDeck(updatedDeck);

    return deckDb.updateDeck(id, updatedDeck);
}
