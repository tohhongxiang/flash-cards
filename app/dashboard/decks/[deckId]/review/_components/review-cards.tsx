"use client";

import { Button } from "@/components/ui/button";
import { CardType } from "@/types/cardType";
import Link from "next/link";
import { useState } from "react";

interface ReviewCardProps {
    cards: CardType[];
}

export default function ReviewCards({ cards }: ReviewCardProps) {
    const [index, setIndex] = useState(0);
    const [isShowingAnswer, setIsShowingAnswer] = useState(false);

    const handleFeedback = (feedback: "again" | "ok" | "good") => {
        if (feedback !== "again") {
            setIndex((c) => c + 1);
        }

        setIsShowingAnswer(false);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            {index < cards.length ? (
                <>
                    <button
                        onClick={() => setIsShowingAnswer((c) => !c)}
                        className="h-96 w-96 rounded-lg border border-gray-300/50 p-4 hover:shadow-md"
                    >
                        {!isShowingAnswer ? (
                            <p className="text-3xl font-bold">
                                {cards[index].front}
                            </p>
                        ) : (
                            <p className="text-3xl">{cards[index].back}</p>
                        )}
                    </button>
                    {isShowingAnswer ? (
                        <div className="flex gap-4">
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={() => handleFeedback("again")}
                            >
                                Again
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={() => handleFeedback("ok")}
                            >
                                OK
                            </Button>
                            <Button
                                size="lg"
                                onClick={() => handleFeedback("good")}
                            >
                                Good
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button onClick={() => setIsShowingAnswer(true)}>
                                Show Answer
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center">
                    <p className="mb-4 text-3xl font-bold">Complete!</p>
                    <p className="mb-8 text-xl">
                        You have reviewed {cards.length} cards
                    </p>
                    <div className="flex gap-4">
                        <Button onClick={() => setIndex(0)}>Restart</Button>
                        <Button asChild>
                            <Link href="/dashboard/decks">
                                Choose a new deck
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
