"use client";

import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { Plus, X } from "lucide-react";
import { useState, useRef, ElementRef } from "react";
import { ListWrapper } from "./list-wrapper";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const ListForm = () => {
    const params = useParams();
    const router = useRouter();
    
    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef<ElementRef<"form">>(null) ;
    const inputRef = useRef<ElementRef<"input">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        });
    };

    const disabledEditing = () => {
        setIsEditing(false);
    };

    const { execute, fieldErrors } = useAction(createList, {
        onSuccess: (data) => {
            toast.success(`List"${data.title}" created`)
            disabledEditing();
            router.refresh();
        },
        onError:(error) => {
            toast.error(error);
        },
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disabledEditing();
        };
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disabledEditing);

    const onSubmit = (formdata: FormData) => {
        const title = formdata.get("title") as string;
        const boardId = formdata.get("boardId") as string;

        execute({
            title,
            boardId
        });
    }

    if (isEditing) {
        return (
            <ListWrapper>
                <form
                    action={onSubmit}
                    ref={formRef}
                    className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
                >
                    <FormInput 
                        ref={inputRef}
                        /*errors={fieldErrors}*/
                        id="title"
                        className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
                        placeholder="Enter list Title..."
                    />
                    <input
                        hidden
                        value={params.boardId}
                        name="boardId"
                    />
                    <div
                        className="flex items-center gap-x-1"
                    >
                        <FormSubmit>
                            Add list
                        </FormSubmit>
                        <Button 
                            onClick={disabledEditing}
                            size="sm"
                            variant="ghost"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
                <button
                    onClick={enableEditing}
                    className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add a List
                </button>
        </ListWrapper>
    );
};