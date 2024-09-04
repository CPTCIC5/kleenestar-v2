import React from "react";
import { DotsThree } from "@phosphor-icons/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConvoButtonDropdownProps {
    isConvoDropdownMenuOpen: boolean;
    setIsConvoDropdownMenuOpen: (open: boolean) => void;
    setIsConvoRenameDialogOpen: (open: boolean) => void;
    setIsConvoDeleteDialogOpen: (open: boolean) => void;
}

export default function ConvoButtonDropdown({
    isConvoDropdownMenuOpen,
    setIsConvoDropdownMenuOpen,
    setIsConvoRenameDialogOpen,
    setIsConvoDeleteDialogOpen,
}: ConvoButtonDropdownProps) {
    return (
        <DropdownMenu open={isConvoDropdownMenuOpen} onOpenChange={setIsConvoDropdownMenuOpen}>
            <DropdownMenuTrigger className="h-full px-1">
                <DotsThree
                    weight="bold"
                    className="z-10 size-6 block md:hidden group-hover:block"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                side="right"
                alignOffset={20}
                sideOffset={-5}
                onClick={(e) => e.stopPropagation()}
                onCloseAutoFocus={(e) => e.preventDefault()}
                className="min-w-24"
            >
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.stopPropagation();
                        setIsConvoRenameDialogOpen(true);
                    }}
                >
                    Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.stopPropagation();
                        setIsConvoDeleteDialogOpen(true);
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
