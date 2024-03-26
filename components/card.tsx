"use client";

import { CardType } from "@/types/cardType";
import { useState } from "react";

interface CardProps {
    card: CardType;
}

export default function Card({ card }: CardProps) {
    const [isFront, setIsFront] = useState(true);
    return (
        <button
            onClick={() => setIsFront((c) => !c)}
            className="h-96 w-96 rounded-lg border border-gray-300/50 p-4 hover:shadow-md"
        >
            {isFront ? (
                <p className="text-3xl font-bold">{card.front}</p>
            ) : (
                <p className="text-3xl">{card.back}</p>
            )}
        </button>
    );
}
