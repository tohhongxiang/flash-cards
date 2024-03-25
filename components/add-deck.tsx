"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { CreatedDeckType } from "@/types/deckType";
import { CirclePlus, Save } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface AddDeckProps {
    onSubmit: (deck: CreatedDeckType) => void;
}

export default function AddDeck({ onSubmit }: AddDeckProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description });
        setTitle("");
        setDescription("");
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
                    <p className="font-semibold">Create new deck...</p>
                </div>
            </button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Create Deck</DialogTitle>
                            <DialogDescription>
                                Give your deck a cool title and a short
                                description
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    value={title}
                                    className="col-span-3"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="username"
                                    className="text-right"
                                >
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </Button>
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
