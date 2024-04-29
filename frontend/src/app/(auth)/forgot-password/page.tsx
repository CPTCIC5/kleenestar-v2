import Link from "next/link";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { ForgotPasswordForm } from "@/components/custom/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <>
            <div className="relative w-full h-full flex items-center justify-center flex-1 bg-background">
                <Link
                    href="/login"
                    className={cn(
                        buttonVariants({ variant: "secondary" }),
                        "absolute right-4 top-[34px] md:right-8 max-xs:top-[30px] ",
                    )}
                >
                    Login
                </Link>
                <ForgotPasswordForm />
            </div>
        </>
    );
}
