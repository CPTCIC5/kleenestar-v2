import * as React from "react";

import { cn } from "@/lib/utils";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <input
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 peer ",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />

                <MagnifyingGlass
                    weight="duotone"
                    className="absolute -translate-y-1/2 top-1/2 left-3 h-6 w-6 text-muted-foreground peer-focus-visible:text-primary"
                />
            </div>
        );
    },
);
SearchInput.displayName = "SearchInput";
