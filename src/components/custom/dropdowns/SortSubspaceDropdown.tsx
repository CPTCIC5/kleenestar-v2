import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SortAscending } from "@phosphor-icons/react";

interface SortSubspaceDropdownProps {
    setSortKey: (sortKey: "id" | "name" | null) => void;
}

export function SortSubspaceDropdown({ setSortKey }: SortSubspaceDropdownProps) {
    const [sortDropdownTitle, setSortDropdownTitle] = useState<string>("Sort");
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                    <span>{sortDropdownTitle}</span>
                    <SortAscending weight="duotone" className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-24">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => {
                            setSortKey("id");
                            setSortDropdownTitle("Id");
                        }}
                    >
                        <span>Id</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setSortKey("name");
                            setSortDropdownTitle("Name");
                        }}
                    >
                        <span>Name</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
