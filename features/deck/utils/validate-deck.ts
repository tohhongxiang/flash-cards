import { CreatedDeckType } from "@/types/deckType";

export default function validateDeck(deck: CreatedDeckType) {
    if (deck.title.length === 0) {
        throw new Error("Deck title cannot be empty!");
    }

    if (deck.description.length === 0) {
        throw new Error("Deck description cannot be empty!");
    }

    return null;
}
