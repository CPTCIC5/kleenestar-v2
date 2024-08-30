"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { Spotlight } from "@/components/ui/spotlight";

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative min-h-screen h-full flex items-center justify-center">
            <BackgroundGrid />
            <motion.div
                initial={{ y: "-50%", opacity: 0 }}
                animate={{ y: "0%", opacity: 0.7 }}
                transition={{ duration: 1.2 }}
                className="absolute bg-primary-gradient blur-3xl -z-10 w-full h-full scale-100"
            />
            <Link
                href="/login"
                className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "absolute right-8 top-8 max-sm:right-4 max-sm:top-4 cursor-pointer",
                )}
            >
                Login
            </Link>
            {children}
        </main>
    );
}
