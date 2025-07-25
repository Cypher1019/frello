"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const ProModal = () =>{
    const ProModal = useProModal();

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = String(data);
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onClick = () => {
        execute({});
    };

    return(
        <Dialog
            open={ProModal.isOpen}
            onOpenChange={ProModal.onClose}
        >
            <DialogContent
                className="max-w-md p-0 overflow-hidden"
            >
                <div className="aspect-video relative flex items-center justify-center">
                    <Image 
                        src="/hero.svg"
                        alt="Hero"
                        className="object-cover"
                        fill
                    />
                </div>
                <div className="text-neutral-700 mx-auto space-y-6 p-6">
                    <h2 className="font-semibold text-xl">
                        Upgrade to Frello Pro Today!
                    </h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        Explore the best of Frello
                    </p>
                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Unlimited Boards</li>
                            <li>Adanced Checklist</li>
                            <li>And More!</li>
                        </ul>
                    </div>
                    <Button
                        disabled={isLoading}
                        onClick={onClick}
                        className="w-full"
                        variant="primary"
                    >
                        Upgrade
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}