import { DeckType } from "./deckType";

export type CardType = {
    id: number;
    front: string;
    back: string;
    deckId: DeckType["id"];
    nextReview: Date;
    stage: "LEARNING" | "REVIEW";
    easeFactor: number;
    currentStep: number;
    currentIntervalSeconds: number;
};

export type CreatedCardType = Omit<CardType, "id" | "deckId">;
