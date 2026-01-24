import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";

interface SaveConfirmationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (assignNow: boolean) => void;
    title?: string;
    description?: string;
    clientName?: string;
}

const SaveConfirmationModal: React.FC<SaveConfirmationModalProps> = ({
    open,
    onOpenChange,
    onConfirm,
    title = "Save Plan",
    description = "Do you want to assign this plan to the client immediately?",
    clientName = "the client",
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Info className="w-6 h-6 text-primary" />
                    </div>
                    <DialogTitle className="text-center text-xl font-bold">{title}</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        {description}
                        <br />
                        <span className="font-semibold text-foreground mt-1 inline-block">
                            Client: {clientName}
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
                    <Button
                        variant="outline"
                        className="flex-1 h-12 rounded-xl font-semibold order-2 sm:order-1"
                        onClick={() => {
                            onConfirm(false);
                            onOpenChange(false);
                        }}
                    >
                        No, Just Save
                    </Button>
                    <Button
                        className="flex-1 h-12 rounded-xl font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 order-1 sm:order-2"
                        onClick={() => {
                            onConfirm(true);
                            onOpenChange(false);
                        }}
                    >
                        <Check className="w-4 h-4 mr-2" /> Yes, Assign Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SaveConfirmationModal;
