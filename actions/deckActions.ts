"use server";

import db from "@/db/drizzle";
import { deck } from "@/db/schema";
import { CreatedDeckType, DeckType } from "@/types/deckType";
import { asc, eq } from "drizzle-orm";

export const addDeck = async (newDeck: CreatedDeckType) => {
    await db.insert(deck).values(newDeck);
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
    await db.update(deck).set(updatedDeck).where(eq(deck.id, id));
};

export const deleteDeck = async (id: number) => {
    await db.delete(deck).where(eq(deck.id, id));
};
