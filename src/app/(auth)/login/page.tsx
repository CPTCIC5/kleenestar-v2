import { LoginForm } from "@/components/custom/forms/auth/LoginForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="w-full h-full p-2 flex flex-1 items-center justify-center">
            <Link
                href="/signup-options"
                className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "absolute right-4 top-8 md:right-8",
                )}
            >
                Signup
            </Link>
            <LoginForm />
        </div>
    );
}
