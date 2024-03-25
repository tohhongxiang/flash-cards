"use server";

import db from "@/db/drizzle";
import { card } from "@/db/schema";
import { CardType } from "@/types/cardType";
import { DeckType } from "@/types/deckType";
import { asc, eq } from "drizzle-orm";

export const addCard = async (newCard: Omit<CardType, "id">) => {
    await db.insert(card).values(newCard);
};

export const getCards = async (deckId: DeckType["id"]) => {
    const data = await db
        .select()
        .from(card)
        .where(eq(card.deckId, deckId))
        .orderBy(asc(card.id));

    return data;
};

export const getCard = async (id: CardType["id"]) => {
    const data = await db.select().from(card).where(eq(card.id, id));
    return data[0];
};

export const editCard = async (
    id: CardType["id"],
    updatedCard: Partial<CardType>
) => {
    await db.update(card).set(updatedCard).where(eq(card.id, id));
};

export const deleteCard = async (id: number) => {
    await db.delete(card).where(eq(card.id, id));
};
