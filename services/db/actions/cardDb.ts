"use server";

import db from "@/services/db/drizzle";
import { card } from "@/services/db/schema";
import { CardType, CreatedCardType } from "@/types/cardType";
import { DeckType } from "@/types/deckType";
import { eq } from "drizzle-orm";

export const createCard = async (newCard: CreatedCardType) => {
    const insertedCards = await db.insert(card).values(newCard).returning();
    return insertedCards[0];
};

export const getCard = async (id: CardType["id"]) => {
    const data = await db.query.card.findFirst({
        where: (card, { eq }) => eq(card.id, id),
    });

    return data;
};

export const getCards = async (
    deckId: DeckType["id"],
    { toReview = false }: { toReview?: boolean } = {}
) => {
    if (toReview) {
        return db.query.card.findMany({
            where: (card, { eq, lt, and }) =>
                and(eq(card.deckId, deckId), lt(card.nextReview, new Date())),
        });
    }

    return db.query.card.findMany({
        where: (card, { eq }) => eq(card.deckId, deckId),
    });
};

export const updateCard = async (
    id: CardType["id"],
    updatedCard: Partial<CardType>
) => {
    const updatedCards = await db
        .update(card)
        .set(updatedCard)
        .where(eq(card.id, id))
        .returning();
    return updatedCards[0];
};

export const deleteCard = async (id: number) => {
    const deletedCards = await db
        .delete(card)
        .where(eq(card.id, id))
        .returning();
    return deletedCards[0];
};
