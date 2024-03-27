"use client";

import { CreatedDeckType, DeckType } from "@/types/deckType";
import AddDeck from "./add-deck";
import { addDeck, deleteDeck, editDeck } from "@/actions/deckActions";
import { useState } from "react";
import DeckPreview from "./deck-preview";

interface DecksProps {
    decks: DeckType[];
}

export default function Decks({ decks }: DecksProps) {
    const [deckItems, setDeckItems] = useState(decks);
    const handleAddDeck = async (deck: CreatedDeckType) => {
        const newDeck = await addDeck(deck);
        setDeckItems((c) => [{ ...newDeck, cards: [] }, ...c]);
    };

    const handleDeleteDeck = (id: DeckType["id"]) => {
        deleteDeck(id);
        setDeckItems((c) => c.filter((d) => d.id !== id));
    };

    const handleEditDeck = (
        id: DeckType["id"],
        updatedDeck: Partial<DeckType>
    ) => {
        editDeck(id, updatedDeck);
        setDeckItems((c) =>
            c.map((d) => (d.id === id ? { ...d, ...updatedDeck } : d))
        );
    };

    return (
        <div className="grid grid-cols-1 items-center justify-center gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <AddDeck onSubmit={handleAddDeck} />
            {deckItems.map((deck) => (
                <DeckPreview
                    deck={deck}
                    deleteDeck={handleDeleteDeck}
                    editDeck={handleEditDeck}
                    key={deck.id}
                />
            ))}
        </div>
    );
}
