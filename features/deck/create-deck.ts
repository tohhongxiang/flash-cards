import { CreatedDeckType } from "@/types/deckType";
import validateDeck from "./utils/validate-deck";
import { deckDb } from "@/services/db/actions";

export default async function createDeck(newDeck: CreatedDeckType) {
    validateDeck(newDeck);

    const deck = await deckDb.createDeck(newDeck);
    return deck;
}
