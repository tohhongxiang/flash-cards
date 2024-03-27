"use client";

import { DeckType } from "@/types/deckType";
import AddCard from "./add-card";
import { CardType, CreatedCardType } from "@/types/cardType";
import { addCard, deleteCard, editCard } from "@/actions/cardActions";
import { useState } from "react";
import CardPreview from "./card-preview";
import { Button } from "./ui/button";
import Link from "next/link";

interface DeckProps {
    deck: DeckType;
}

export default function Deck({ deck }: DeckProps) {
    const [deckItem, setDeckItem] = useState(deck);

    const handleCreateCard = async (
        deckId: DeckType["id"],
        card: CreatedCardType
    ) => {
        const newCard = await addCard({ ...card, deckId });
        setDeckItem((previousDeck) => ({
            ...previousDeck,
            cards: [newCard, ...previousDeck.cards],
        }));
    };

    const handleDeleteCard = async (cardId: CardType["id"]) => {
        deleteCard(cardId);
        setDeckItem((previousDeck) => ({
            ...previousDeck,
            cards: previousDeck.cards.filter((card) => card.id !== cardId),
        }));
    };

    const handleEditCard = async (
        cardId: CardType["id"],
        updatedCard: Partial<CardType>
    ) => {
        editCard(cardId, updatedCard);
        setDeckItem((previousDeck) => ({
            ...previousDeck,
            cards: previousDeck.cards.map((card) =>
                card.id === cardId ? { ...card, ...updatedCard } : card
            ),
        }));
    };

    const cardsToReview = deckItem.cards.filter(
        (card) => card.nextReview.getTime() <= new Date().getTime() + 1000 // 1 second delay time for adding
    );

    console.log(
        new Date().getTime(),
        deckItem.cards.map((card) => card.nextReview.getTime())
    );

    return (
        <div className="flex flex-col items-center p-4">
            <div className="max-w-prose">
                <h1 className="text-3xl font-bold">{deckItem.title}</h1>
                <p className="text-muted-foreground">{deckItem.description}</p>
                {deckItem.cards.length > 0 ? (
                    <div className="flex items-center py-4">
                        <Button disabled={cardsToReview.length === 0}>
                            <Link href={`/dashboard/decks/${deck.id}/review`}>
                                Review ({cardsToReview.length})
                            </Link>
                        </Button>
                    </div>
                ) : null}
            </div>
            <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <li>
                    <AddCard
                        onSubmit={(card) => handleCreateCard(deckItem.id, card)}
                    />
                </li>
                {deckItem.cards.map((card) => (
                    <li key={card.id}>
                        <CardPreview
                            card={card}
                            deleteCard={handleDeleteCard}
                            editCard={handleEditCard}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
