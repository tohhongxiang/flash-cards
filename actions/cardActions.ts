"use server";

import db from "@/db/drizzle";
import { card, learningIntervals } from "@/db/schema";
import { CardType } from "@/types/cardType";
import { DeckType } from "@/types/deckType";
import { eq } from "drizzle-orm";
import { intervalToMilliseconds } from "./utils";

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

const MINIMUM_EASE_FACTOR = 1.3;
// const HARD_MULTIPLIER = 1.2;
export const updateCardAfterReview = async (
    id: CardType["id"],
    feedback: "AGAIN" | "HARD" | "GOOD" | "EASY"
) => {
    const cardToUpdate = await db.query.card.findFirst({
        where: (card, { eq }) => eq(card.id, id),
    });

    if (!cardToUpdate) {
        throw new Error("Card not found");
    }

    if (cardToUpdate.stage === "REVIEW") {
        if (feedback === "AGAIN") {
            cardToUpdate.stage = "LEARNING";
            cardToUpdate.easeFactor = Math.max(
                cardToUpdate.easeFactor - 0.2,
                MINIMUM_EASE_FACTOR
            );
            cardToUpdate.currentStep = 0;
            cardToUpdate.currentInterval = "24:00:00";
        } else if (feedback === "HARD") {
            cardToUpdate.easeFactor = Math.max(
                cardToUpdate.easeFactor - 0.15,
                MINIMUM_EASE_FACTOR
            );
            // todo: Figure out how to increase interval
            // cardToUpdate.currentInterval *= intervalToMilliseconds(cardToUpdate.currentInterval) * HARD_MULTIPLIER
        }
    } else if (cardToUpdate.stage === "LEARNING") {
        if (feedback === "AGAIN") {
            cardToUpdate.currentStep = 0;
        } else if (feedback === "GOOD") {
            cardToUpdate.currentStep += 1;
        }

        cardToUpdate.currentInterval =
            learningIntervals.enumValues[cardToUpdate.currentStep];

        if (
            feedback === "EASY" ||
            cardToUpdate.currentStep > learningIntervals.enumValues.length - 1
        ) {
            cardToUpdate.stage = "REVIEW";
            cardToUpdate.currentStep = 0;
            cardToUpdate.currentInterval = "1 day";
        }
    }

    cardToUpdate.nextReview = new Date(
        Date.now() + intervalToMilliseconds(cardToUpdate.currentInterval)
    );

    const updatedCard = await db
        .update(card)
        .set(cardToUpdate)
        .where(eq(card.id, id))
        .returning();
    return updatedCard[0];
};

export const deleteCard = async (id: number) => {
    const deletedCards = await db
        .delete(card)
        .where(eq(card.id, id))
        .returning();
    return deletedCards[0];
};
