import { relations, sql } from "drizzle-orm";
import { text, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const deck = pgTable("decks", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
});

export const card = pgTable("cards", {
    id: serial("id").primaryKey(),
    front: text("front").notNull(),
    back: text("back").notNull(),
    nextReview: timestamp("next_review_date")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    deckId: serial("deck_id")
        .notNull()
        .references(() => deck.id, { onDelete: "cascade" }),
});

export const deckRelations = relations(deck, ({ many }) => ({
    cards: many(card),
}));

export const cardRelations = relations(card, ({ one }) => ({
    deck: one(deck, { fields: [card.deckId], references: [deck.id] }),
}));
