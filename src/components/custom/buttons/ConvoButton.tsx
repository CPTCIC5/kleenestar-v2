"use client";

import { buttonVariants } from "@/components/ui/button";
import React, { useState } from "react";

import { ConvoRenameDialog } from "../dialogs/ConvoRenameDialog";
import { ConvoDeleteDialog } from "../dialogs/ConvoDeleteDialog";
import { cn } from "@/lib/utils";
import ConvoButtonDropdown from "../dropdowns/ConvoButtonDropdown";

interface ConvoButtonProps {
    className?: string;
    convo: Convo;
    onClick?: () => void;
}

export function ConvoButton({ className, convo, onClick }: ConvoButtonProps) {
    const [isConvoDropdownMenuOpen, setIsConvoDropdownMenuOpen] = useState<boolean>(false);
    const [isConvoRenameDialogOpen, setIsConvoRenameDialogOpen] = useState<boolean>(false);
    const [isConvoDeleteDialogOpen, setIsConvoDeleteDialogOpen] = useState<boolean>(false);

    return (
        <React.Fragment>
            <div
                onClick={onClick}
                className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "group w-full justify-start cursor-pointer",
                )}
            >
                {/* Convo Name */}
                <span className="w-full overflow-ellipsis overflow-hidden group-hover:pr-2">
                    {convo?.title}
                </span>

                {/* Convo Dropdown menu */}
                <ConvoButtonDropdown
                    isConvoDropdownMenuOpen={isConvoDropdownMenuOpen}
                    setIsConvoDropdownMenuOpen={setIsConvoDropdownMenuOpen}
                    setIsConvoRenameDialogOpen={setIsConvoRenameDialogOpen}
                    setIsConvoDeleteDialogOpen={setIsConvoDeleteDialogOpen}
                />
            </div>

            <ConvoRenameDialog
                isConvoRenameDialogOpen={isConvoRenameDialogOpen}
                setIsConvoRenameDialogOpen={setIsConvoRenameDialogOpen}
                oldConvoName={convo.title}
                convoId={convo.id}
            />

            <ConvoDeleteDialog
                isConvoDeleteDialogOpen={isConvoDeleteDialogOpen}
                setIsConvoDeleteDialogOpen={setIsConvoDeleteDialogOpen}
                convoId={convo.id}
            />
        </React.Fragment>
    );
}
