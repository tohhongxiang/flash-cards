"use client";

import { useState } from "react";
import { CreatedDeckType } from "@/types/deckType";
import { CirclePlus } from "lucide-react";
import FormDialog from "./form-dialog";

interface AddDeckProps {
    onSubmit: (deck: CreatedDeckType) => void;
}

export default function AddDeck({ onSubmit }: AddDeckProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            <FormDialog
                title="Create Deck"
                description="Give your deck a cool title and a short description"
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                initialData={{
                    title: "",
                    description: "",
                }}
                onSubmit={onSubmit}
            />
        </>
    );
}
