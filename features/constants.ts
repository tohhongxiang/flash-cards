export const ONE_MINUTE = 60;
export const ONE_DAY = 24 * 60 * 60;

export const LEARNING_INTERVALS = [ONE_MINUTE, 10 * ONE_MINUTE, ONE_DAY];

export const MINIMUM_EASE_FACTOR = 1.3;
export const HARD_MULTIPLIER = 1.2;
export const EASY_MULTIPLIER = 1.3;

export const FEEDBACK = {
    AGAIN: "AGAIN",
    HARD: "HARD",
    GOOD: "GOOD",
    EASY: "EASY",
} as const;

export const STAGES = {
    LEARNING: "LEARNING",
    REVIEW: "REVIEW",
} as const;
