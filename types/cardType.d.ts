import { DeckType } from "./deckType";

export type CardType = {
    id: number;
    front: string;
    back: string;
    deckId: DeckType["id"];
};

export type CreatedCardType = Omit<CardType, "id" | "deckId">;
