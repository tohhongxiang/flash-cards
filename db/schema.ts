import { relations } from "drizzle-orm";
import { text, pgTable, serial, integer } from "drizzle-orm/pg-core";

export const deck = pgTable("decks", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
});

export const card = pgTable("cards", {
    id: serial("id").primaryKey(),
    front: text("front").notNull(),
    back: text("back").notNull(),
    deckId: integer("deck_id")
        .notNull()
        .references(() => deck.id, { onDelete: "cascade" }),
});

export const deckRelations = relations(deck, ({ many }) => ({
    cards: many(card),
}));

export const cardRelations = relations(card, ({ one }) => ({
    deck: one(deck, { fields: [card.deckId], references: [deck.id] }),
}));
