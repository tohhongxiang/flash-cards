"use client";

import { Label } from "@radix-ui/react-label";
import { Save } from "lucide-react";
import { Button } from "./ui/button";
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
import { useState } from "react";
import toTitleCase from "@/lib/to-title-case";

interface FormDialogProps<T extends { [key: string]: string }> {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData: T;
    onSubmit: (data: T) => void;
    title?: string;
    description?: string;
}

export default function FormDialog<T extends { [key: string]: string }>({
    open,
    onOpenChange,
    initialData,
    onSubmit,
    title = "",
    description = "",
}: FormDialogProps<T>) {
    const [formData, setFormData] = useState(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onOpenChange(false);
        onSubmit(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        {title.length > 0 && <DialogTitle>{title}</DialogTitle>}
                        {description.length > 0 && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {Object.entries(formData).map(([key, value]) => (
                            <div
                                className="grid grid-cols-4 items-center gap-4"
                                key={key}
                            >
                                <Label
                                    htmlFor={key}
                                    className="text-right text-sm font-semibold"
                                >
                                    {toTitleCase(key)}
                                </Label>
                                <Input
                                    id={key}
                                    value={value}
                                    className="col-span-3"
                                    onChange={(e) =>
                                        setFormData((c) => ({
                                            ...c,
                                            [key]: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        ))}
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
    );
}
