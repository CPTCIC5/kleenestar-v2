"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);

        const handleClick = () => setShowPassword(!showPassword);

        return (
            <div className="relative">
                <input
                    type={showPassword ? "text" : type}
                    className={cn(
                        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-9",
                        className,
                    )}
                    ref={ref}
                    {...props}
                ></input>
                <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-muted-foreground"
                    onClick={handleClick}
                >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </div>
            </div>
        );
    },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
