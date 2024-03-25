"use client";

import { DeckType } from "@/types/deckType";
import AddCard from "./add-card";
import { CardType, CreatedCardType } from "@/types/cardType";
import { addCard, deleteCard } from "@/actions/cardActions";
import { useState } from "react";
import CardPreview from "./card-preview";

interface DeckProps {
    deck: DeckType;
}

export default function Deck({ deck }: DeckProps) {
    const [deckItem, setDeckItem] = useState(deck);

    const handleCreateCard = (
        deckId: DeckType["id"],
        card: CreatedCardType
    ) => {
        const newCard = { ...card, deckId };
        const newCardId = (deckItem.cards.at(-1)?.id || 0) + 1;
        addCard(newCard);
        setDeckItem((previousDeck) => ({
            ...previousDeck,
            cards: [{ ...newCard, id: newCardId }, ...previousDeck.cards],
        }));
    };

    const handleDeleteCard = (cardId: CardType["id"]) => {
        deleteCard(cardId);
        setDeckItem((previousDeck) => ({
            ...previousDeck,
            cards: previousDeck.cards.filter((card) => card.id !== cardId),
        }));
    };

    return (
        <div className="flex flex-col items-center p-4">
            <div className="max-w-prose">
                <h1 className="text-3xl font-bold">{deckItem.title}</h1>
                <p className="mb-8 text-muted-foreground">
                    {deckItem.description}
                </p>
                <ul className="flex flex-col gap-4">
                    <li>
                        <AddCard
                            onSubmit={(card) =>
                                handleCreateCard(deckItem.id, card)
                            }
                        />
                    </li>
                    {deckItem.cards.map((card) => (
                        <li key={card.id}>
                            <CardPreview
                                card={card}
                                deleteCard={handleDeleteCard}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
