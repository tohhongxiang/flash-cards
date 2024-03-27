"use server";

import db from "@/db/drizzle";
import { card } from "@/db/schema";
import { CardType } from "@/types/cardType";
import { DeckType } from "@/types/deckType";
import { eq } from "drizzle-orm";
import {
    EASY_MULTIPLIER,
    HARD_MULTIPLIER,
    LEARNING_INTERVALS,
    MINIMUM_EASE_FACTOR,
    ONE_DAY,
} from "./constants";

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
            cardToUpdate.currentIntervalSeconds = ONE_DAY;
        } else if (feedback === "HARD") {
            cardToUpdate.easeFactor = Math.max(
                cardToUpdate.easeFactor - 0.15,
                MINIMUM_EASE_FACTOR
            );

            cardToUpdate.currentIntervalSeconds *= HARD_MULTIPLIER;
        } else if (feedback === "GOOD") {
            cardToUpdate.currentIntervalSeconds *= cardToUpdate.easeFactor;
        } else {
            cardToUpdate.currentIntervalSeconds *=
                cardToUpdate.easeFactor * EASY_MULTIPLIER;
            cardToUpdate.easeFactor += 0.15;
        }
    } else if (cardToUpdate.stage === "LEARNING") {
        if (feedback === "AGAIN") {
            cardToUpdate.currentStep = 0;
        } else if (feedback === "GOOD") {
            cardToUpdate.currentStep += 1;
        }

        cardToUpdate.currentIntervalSeconds =
            LEARNING_INTERVALS[cardToUpdate.currentStep];

        if (
            feedback === "EASY" ||
            cardToUpdate.currentStep > LEARNING_INTERVALS.length - 1
        ) {
            cardToUpdate.stage = "REVIEW";
            cardToUpdate.currentStep = 0;
            cardToUpdate.currentIntervalSeconds = ONE_DAY;
        }
    }

    cardToUpdate.currentIntervalSeconds = Math.floor(
        cardToUpdate.currentIntervalSeconds
    );
    cardToUpdate.nextReview = new Date(
        Date.now() + cardToUpdate.currentIntervalSeconds * 1000
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
