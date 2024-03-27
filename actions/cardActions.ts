"use server";

import db from "@/db/drizzle";
import { card } from "@/db/schema";
import { CardType } from "@/types/cardType";
import { DeckType } from "@/types/deckType";
import { eq } from "drizzle-orm";

export const addCard = async (newCard: Omit<CardType, "id">) => {
    const insertedCards = await db.insert(card).values(newCard).returning();
    return insertedCards[0];
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

export const getCard = async (id: CardType["id"]) => {
    const data = await db.select().from(card).where(eq(card.id, id));
    return data[0];
};

export const editCard = async (
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
