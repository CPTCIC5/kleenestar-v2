import { SignupForm } from "@/components/custom/forms/auth/SignupForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="w-full h-full p-2 flex flex-1 items-center justify-center">
            <Link
                href="/login"
                className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "absolute right-4 top-8 md:right-8",
                )}
            >
                Login
            </Link>
            <SignupForm />
        </div>
    );
}
