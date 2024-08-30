import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "@phosphor-icons/react/dist/ssr";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState<boolean>(false);

        const handleClick = () => setShowPassword(!showPassword);

        return (
            <div className="relative">
                <input
                    type={showPassword ? "text" : type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-9",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-muted-foreground"
                    onClick={handleClick}
                >
                    {showPassword ? (
                        <Eye weight="duotone" className="w-4 h-4" />
                    ) : (
                        <EyeClosed weight="duotone" className="w-4 h-4" />
                    )}
                </div>
            </div>
        );
    },
);
PasswordInput.displayName = "PasswordInput";
