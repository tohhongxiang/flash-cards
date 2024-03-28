import { ONE_MINUTE } from "@/features/constants";
import { relations, sql } from "drizzle-orm";
import {
    text,
    pgTable,
    serial,
    timestamp,
    pgEnum,
    integer,
    real,
} from "drizzle-orm/pg-core";

export const stageEnum = pgEnum("stage", ["LEARNING", "REVIEW"]);

export const deck = pgTable("decks", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
});

export const card = pgTable("cards", {
    id: serial("id").primaryKey(),
    front: text("front").notNull(),
    back: text("back").notNull(),
    deckId: serial("deck_id")
        .notNull()
        .references(() => deck.id, { onDelete: "cascade" }),
    stage: stageEnum("stage").notNull().default("LEARNING"),
    easeFactor: real("ease_factor").notNull().default(2.5),
    currentStep: integer("current_step").notNull().default(0),
    currentIntervalSeconds: integer("current_interval_seconds")
        .notNull()
        .default(ONE_MINUTE),
    nextReview: timestamp("next_review_date", { mode: "date" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export const deckRelations = relations(deck, ({ many }) => ({
    cards: many(card),
}));

export const cardRelations = relations(card, ({ one }) => ({
    deck: one(deck, { fields: [card.deckId], references: [deck.id] }),
}));
