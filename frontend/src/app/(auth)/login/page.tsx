import Link from "next/link";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { LoginForm } from "@/components/custom/LoginForm";
import GridBackground from "@/components/ui/background-grid";

export default function LoginPage() {
    return (
        <>
            <div className="relative w-full h-full flex items-center justify-center flex-1 bg-background p-2">
                <GridBackground />
                <Link
                    href="/register"
                    className={cn(
                        buttonVariants({ variant: "secondary" }),
                        "absolute right-4 top-[34px] md:right-8 max-xs:top-[30px] ",
                    )}
                >
                    Register
                </Link>
                <LoginForm />
            </div>
        </>
    );
}
