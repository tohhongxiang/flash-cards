import { deckDb } from "@/services/db/actions";

export default async function getDecks() {
    return deckDb.getDecks();
}
