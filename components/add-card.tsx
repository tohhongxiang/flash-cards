"use client";

import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { CirclePlus, Save } from "lucide-react";
import { CreatedCardType } from "@/types/cardType";
import { DeckType } from "@/types/deckType";

interface AddCardProps {
    deckId: DeckType["id"];
    onSubmit: (card: CreatedCardType) => void;
}

export default function AddCard({ onSubmit, deckId }: AddCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ front, back, deckId });
        setFront("");
        setBack("");
        setIsDialogOpen(false);
    };

    return (
        <>
            <button
                className="h-full w-full"
                onClick={() => setIsDialogOpen(true)}
            >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-md border border-gray-300 p-4 transition duration-150 hover:shadow-md">
                    <CirclePlus className="h-16 w-16" />
                    <p className="font-semibold">Create new card...</p>
                </div>
            </button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Create Card</DialogTitle>
                            <DialogDescription>
                                Give your card a cool front and back
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Front
                                </Label>
                                <Input
                                    value={front}
                                    className="col-span-3"
                                    onChange={(e) => setFront(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="username"
                                    className="text-right"
                                >
                                    Back
                                </Label>
                                <Input
                                    value={back}
                                    onChange={(e) => setBack(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                <Save className="mr-2 h-4 w-4" />
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
