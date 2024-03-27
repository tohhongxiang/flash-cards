"use server";

import db from "@/db/drizzle";
import { deck } from "@/db/schema";
import { CreatedDeckType, DeckType } from "@/types/deckType";
import { asc, eq } from "drizzle-orm";

export const addDeck = async (newDeck: CreatedDeckType) => {
    const insertedDecks = await db.insert(deck).values(newDeck).returning();
    return insertedDecks[0];
};

export const getDecks = async () => {
    const data = await db.query.deck.findMany({
        orderBy: [asc(deck.id)],
        with: { cards: true },
    });

    return data;
};

export const getDeck = async (id: DeckType["id"]) => {
    const data = await db.query.deck.findFirst({
        where: eq(deck.id, id),
        with: { cards: { orderBy: (card, { desc }) => [desc(card.id)] } },
    });
    return data;
};

export const editDeck = async (id: number, updatedDeck: Partial<DeckType>) => {
    const updatedDecks = await db
        .update(deck)
        .set(updatedDeck)
        .where(eq(deck.id, id))
        .returning();
    return updatedDecks[0];
};

export const deleteDeck = async (id: number) => {
    const deletedDecks = await db
        .delete(deck)
        .where(eq(deck.id, id))
        .returning();
    return deletedDecks[0];
};
