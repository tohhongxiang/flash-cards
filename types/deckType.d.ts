import { CardType } from "./cardType";

export type DeckType = {
    id: number;
    title: string;
    description: string;
    cards: CardType[];
};

export type CreatedDeckType = Omit<DeckType, "id" | "cards">;
