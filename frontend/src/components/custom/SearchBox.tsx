"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { SearchIcon } from "lucide-react";
import { TooltipProvider } from "../ui/tooltip";
import { Icons } from "@/assets/icons";

export interface SearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <input
                    type={type}
                    className={cn(
                        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 pl-10",
                        className,
                    )}
                    ref={ref}
                    {...props}
                ></input>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer text-muted-foreground">
                    <SearchIcon className="h-5 w-5" />
                </div>
            </div>
        );
    },
);
SearchBox.displayName = "SearchBox";

export { SearchBox };
