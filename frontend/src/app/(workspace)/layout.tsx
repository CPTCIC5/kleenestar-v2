import React from "react";
import GridBackground from "@/components/ui/background-grid";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function WelcomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative max-h-full h-screen flex items-center justify-center ">
            <div className="absolute bg-custom-radial-gradient blur-3xl z-[-1] w-full h-full scale-100 animate-fade-in-up"></div>
            <Link
                href="/login"
                className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "absolute z-20 right-8 top-8 max-sm:right-4 max-sm:top-4 cursor-pointer",
                )}
            >
                Login
            </Link>

            <GridBackground />
            {children}
        </div>
    );
}
