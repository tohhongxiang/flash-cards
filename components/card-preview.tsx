import { CardType } from "@/types/cardType";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Info, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import FormDialog from "./form-dialog";
import DeleteDialog from "./delete-dialog";

interface CardPreviewProps {
    card: CardType;
    deleteCard: (cardId: CardType["id"]) => void;
    editCard: (cardId: CardType["id"], updatedCard: Partial<CardType>) => void;
}

export default function CardPreview({
    card,
    deleteCard,
    editCard,
}: CardPreviewProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-foreground/10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    }}
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer text-red-600 hover:bg-red-600/10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsDeleting(true);
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
            <FormDialog
                title="Edit card"
                description="Change the contents of your card"
                open={isEditing}
                onOpenChange={setIsEditing}
                initialData={{ front: card.front, back: card.back }}
                onSubmit={(updatedCard) => editCard(card.id, updatedCard)}
            />
            <DeleteDialog
                open={isDeleting}
                onOpenChange={setIsDeleting}
                description="This action cannot be undone. This will permanently delete the card."
                onConfirm={() => deleteCard(card.id)}
            />
        </>
    );
}
