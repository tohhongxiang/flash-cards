import { CreatedCardType } from "@/types/cardType";

export default function validateCard(card: CreatedCardType) {
    if (card.front.length === 0) {
        throw new Error("Card Front must not be empty!");
    }

    if (card.back.length === 0) {
        throw new Error("Card Back must not be empty!");
    }

    return null;
}
