"use client";

import { updateCardAfterReview } from "@/actions/cardActions";
import { Button } from "@/components/ui/button";
import { CardType } from "@/types/cardType";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ReviewCardProps {
    cards: CardType[];
}

export default function ReviewCards({ cards }: ReviewCardProps) {
    const [index, setIndex] = useState(0);
    const [isShowingAnswer, setIsShowingAnswer] = useState(false);

    const handleFeedback = (feedback: "AGAIN" | "HARD" | "GOOD" | "EASY") => {
        updateCardAfterReview(cards[index].id, feedback);
        setIndex((c) => c + 1);
        setIsShowingAnswer(false);
    };

    const router = useRouter();
    useEffect(() => {
        return () => router.refresh(); // refresh router when leaving review
    }, [router]);

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
                                onClick={() => handleFeedback("AGAIN")}
                            >
                                Again
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={() => handleFeedback("HARD")}
                            >
                                Hard
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={() => handleFeedback("GOOD")}
                            >
                                Good
                            </Button>
                            <Button
                                size="lg"
                                onClick={() => handleFeedback("EASY")}
                            >
                                Easy
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
                        {cards.length === 0
                            ? "You have no more cards to review!"
                            : `You have reviewed ${cards.length} cards`}
                    </p>
                    <div className="flex gap-4">
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
