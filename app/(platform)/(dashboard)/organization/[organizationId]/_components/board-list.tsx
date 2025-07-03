"use client";
import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";
import { useState } from "react";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const BoardList = async () => {
    const { orgId } = await auth();
    
    if (!orgId) {
        return redirect("/select-org");
    }

    const boards = await db.board.findMany({
        where: {
            orgId,
        },
        orderBy: {
            createdAt: "desc"
        }
    });


    const [isChecked, setIsChecked] = useState(false); // Example state for checkboxes

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2" />
                Your Boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* FormPopover is likely to contain interactive form elements */}
                <FormPopover sideOffset={10} side="right">
                    <div
                        role="button"
                        className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                    >
                        <p className="text-shadow-muted">
                            Create new board
                        </p>
                        <span className="text-xs">
                            5 Remaining
                        </span>
                        <Hint
                            sideOffset={40}
                            description={`Free Workspaces can have upto 5 open boards. For unlimited boards upgrade this workspace.`}
                        >
                            <HelpCircle
                                className="absolute bottom-2 right-2 h-[14px] w-[14px]"
                            />
                        </Hint>

                        {/* Example of adding a checkbox with checked state */}
                        <input
                            type="checkbox"
                            checked={isChecked} // Ensure the `checked` prop is controlled
                            onChange={handleCheckboxChange} // Make sure you provide an `onChange` handler
                            className="absolute top-2 right-2 h-4 w-4"
                        />
                    </div>
                </FormPopover>
            </div>
        </div>
    );
};
