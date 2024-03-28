import { CardType } from "@/types/cardType";
import {
    MINIMUM_EASE_FACTOR,
    ONE_DAY,
    HARD_MULTIPLIER,
    EASY_MULTIPLIER,
    LEARNING_INTERVALS,
} from "./constants";

export const calculateUpdatedCard = (card: CardType) => {
    const result = {
        AGAIN: { ...card },
        HARD: { ...card },
        GOOD: { ...card },
        EASY: { ...card },
    };

    if (card.stage === "REVIEW") {
        result["AGAIN"].stage = "LEARNING";
        result["AGAIN"].easeFactor = Math.max(
            card.easeFactor - 0.2,
            MINIMUM_EASE_FACTOR
        );
        result["AGAIN"].currentStep = 0;
        result["AGAIN"].currentIntervalSeconds = ONE_DAY;

        result["HARD"].easeFactor = Math.max(
            card.easeFactor - 0.15,
            MINIMUM_EASE_FACTOR
        );
        result["HARD"].currentIntervalSeconds *= HARD_MULTIPLIER;

        result["GOOD"].currentIntervalSeconds *= card.easeFactor;

        result["EASY"].currentIntervalSeconds *=
            card.easeFactor * EASY_MULTIPLIER;
        result["EASY"].easeFactor += 0.15;
    } else {
        result["AGAIN"].currentStep = 0;
        result["AGAIN"].currentIntervalSeconds =
            LEARNING_INTERVALS[result["AGAIN"].currentStep];

        result["HARD"].currentStep = card.currentStep;
        result["HARD"].currentIntervalSeconds =
            LEARNING_INTERVALS[result["HARD"].currentStep];

        result["GOOD"].currentStep = card.currentStep + 1;
        if (result["GOOD"].currentStep > LEARNING_INTERVALS.length - 1) {
            result["GOOD"].stage = "REVIEW";
            result["GOOD"].currentStep = 0;
            result["GOOD"].currentIntervalSeconds = ONE_DAY;
        } else {
            result["GOOD"].currentIntervalSeconds =
                LEARNING_INTERVALS[result["GOOD"].currentStep];
        }

        result["EASY"].stage = "REVIEW";
        result["EASY"].currentStep = 0;
        result["EASY"].currentIntervalSeconds = ONE_DAY;
    }

    result["AGAIN"].currentIntervalSeconds = Math.floor(
        result["AGAIN"].currentIntervalSeconds
    );
    result["HARD"].currentIntervalSeconds = Math.floor(
        result["HARD"].currentIntervalSeconds
    );
    result["GOOD"].currentIntervalSeconds = Math.floor(
        result["GOOD"].currentIntervalSeconds
    );
    result["EASY"].currentIntervalSeconds = Math.floor(
        result["EASY"].currentIntervalSeconds
    );

    result["AGAIN"].nextReview = new Date(
        Date.now() + result["AGAIN"].currentIntervalSeconds * 1000
    );

    return result;
};

export const formatSecondsToHumanReadableTime = (seconds: number) => {
    if (seconds < 60) {
        return `${seconds} seconds`;
    }

    if (seconds < 60 * 60) {
        const minutes = Math.floor(seconds / 60);
        const suffix = minutes === 1 ? "minute" : "minutes";
        return `${minutes} ${suffix}`;
    }

    if (seconds < 60 * 60 * 24) {
        const hours = Math.floor(seconds / 60 / 60);
        const suffix = hours === 1 ? "hour" : "hours";
        return `${hours} ${suffix}`;
    }

    const days = Math.floor(seconds / 60 / 60 / 24);
    const suffix = days === 1 ? "day" : "days";
    return `${days} ${suffix}`;
};
