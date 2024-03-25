"use client";

import { DeckType } from "@/types/deckType";
import { Button } from "./ui/button";
import { Ellipsis, Info, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Link from "next/link";

interface DeckProps {
    deck: DeckType;
    deleteDeck: (id: DeckType["id"]) => void;
}
export default function DeckPreview({ deck, deleteDeck }: DeckProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <Link
                href={`/dashboard/decks/${deck.id}`}
                className="h-full w-full"
            >
                <div className="h-full rounded-md border border-gray-300 p-4 transition duration-150 hover:shadow-md">
                    <div className="flex items-baseline justify-between gap-2">
                        <h2 className="mb-2 line-clamp-1 text-2xl font-bold">
                            {deck.title}
                        </h2>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                    <Ellipsis />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className="cursor-pointer hover:bg-foreground/10">
                                    <Info className="mr-2 h-4 w-4" />
                                    View
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer text-red-600 hover:bg-red-600/10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                        {deck.description}
                    </p>
                    <p>
                        <strong>{deck.cards.length}</strong>{" "}
                        {deck.cards.length === 1 ? "card" : "cards"}
                    </p>
                </div>
            </Link>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="mb-2">
                            Are you absolutely sure?
                        </DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete the following deck:{" "}
                            <span className="font-bold text-foreground">
                                {deck.title}
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={() => deleteDeck(deck.id)}
                            variant={"destructive"}
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
