import { CardType } from "@/types/cardType";
import {
    MINIMUM_EASE_FACTOR,
    ONE_DAY,
    HARD_MULTIPLIER,
    EASY_MULTIPLIER,
    LEARNING_INTERVALS,
    STAGES,
    FEEDBACK,
} from "../../constants";

export const calculateUpdatedCard = (card: CardType) => {
    const result = {
        AGAIN: { ...card },
        HARD: { ...card },
        GOOD: { ...card },
        EASY: { ...card },
    };

    if (card.stage === STAGES.REVIEW) {
        result[FEEDBACK.AGAIN].stage = STAGES.LEARNING;
        result[FEEDBACK.AGAIN].easeFactor = Math.max(
            card.easeFactor - 0.2,
            MINIMUM_EASE_FACTOR
        );
        result[FEEDBACK.AGAIN].currentStep = 0;
        result[FEEDBACK.AGAIN].currentIntervalSeconds = ONE_DAY;

        result[FEEDBACK.HARD].easeFactor = Math.max(
            card.easeFactor - 0.15,
            MINIMUM_EASE_FACTOR
        );
        result[FEEDBACK.HARD].currentIntervalSeconds *= HARD_MULTIPLIER;

        result[FEEDBACK.GOOD].currentIntervalSeconds *= card.easeFactor;

        result[FEEDBACK.EASY].currentIntervalSeconds *=
            card.easeFactor * EASY_MULTIPLIER;
        result[FEEDBACK.EASY].easeFactor += 0.15;
    } else {
        result[FEEDBACK.AGAIN].currentStep = 0;
        result[FEEDBACK.AGAIN].currentIntervalSeconds =
            LEARNING_INTERVALS[result[FEEDBACK.AGAIN].currentStep];

        result[FEEDBACK.HARD].currentStep = card.currentStep;
        result[FEEDBACK.HARD].currentIntervalSeconds =
            LEARNING_INTERVALS[result[FEEDBACK.HARD].currentStep];

        result[FEEDBACK.GOOD].currentStep = card.currentStep + 1;
        if (result[FEEDBACK.GOOD].currentStep > LEARNING_INTERVALS.length - 1) {
            result[FEEDBACK.GOOD].stage = STAGES.REVIEW;
            result[FEEDBACK.GOOD].currentStep = 0;
            result[FEEDBACK.GOOD].currentIntervalSeconds = ONE_DAY;
        } else {
            result[FEEDBACK.GOOD].currentIntervalSeconds =
                LEARNING_INTERVALS[result[FEEDBACK.GOOD].currentStep];
        }

        result[FEEDBACK.EASY].stage = STAGES.REVIEW;
        result[FEEDBACK.EASY].currentStep = 0;
        result[FEEDBACK.EASY].currentIntervalSeconds = ONE_DAY;
    }

    result[FEEDBACK.AGAIN].currentIntervalSeconds = Math.floor(
        result[FEEDBACK.AGAIN].currentIntervalSeconds
    );
    result[FEEDBACK.HARD].currentIntervalSeconds = Math.floor(
        result[FEEDBACK.HARD].currentIntervalSeconds
    );
    result[FEEDBACK.GOOD].currentIntervalSeconds = Math.floor(
        result[FEEDBACK.GOOD].currentIntervalSeconds
    );
    result[FEEDBACK.EASY].currentIntervalSeconds = Math.floor(
        result[FEEDBACK.EASY].currentIntervalSeconds
    );

    result[FEEDBACK.AGAIN].nextReview = new Date(
        Date.now() + result[FEEDBACK.AGAIN].currentIntervalSeconds * 1000
    );

    return result;
};
