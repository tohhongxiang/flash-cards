import { CardType } from "@/types/cardType";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Info, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface CardPreviewProps {
    card: CardType;
    deleteCard: (cardId: CardType["id"]) => void;
}

export default function CardPreview({ card, deleteCard }: CardPreviewProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <Link
                href={`/dashboard/decks/${card.deckId}/cards/${card.id}`}
                className="h-full w-full"
            >
                <div className="h-full rounded-md border border-gray-300 p-4 transition duration-150 hover:shadow-md">
                    <div className="flex items-baseline justify-between gap-2">
                        <h2 className="mb-2 line-clamp-1 text-2xl font-bold">
                            {card.front}
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
                        {card.back}
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
                            delete this card.
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
                            onClick={() => deleteCard(card.id)}
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
