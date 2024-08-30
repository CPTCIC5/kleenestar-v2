"use client";

import { Icons } from "@/assets/icons";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { motion } from "framer-motion";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative w-full min-h-screen h-full flex items-center justify-center">
            <BackgroundGrid />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
                className="absolute bg-primary-gradient blur-3xl -z-10 w-full h-full scale-100"
            />

            <div className="absolute top-8 left-8 flex items-center gap-3 z-10">
                <Icons.logoKleenDark className="h-9 w-9 dark:hidden" />
                <Icons.logoKleenLight className="h-9 w-9 hidden dark:block" />
                <span className="text-3xl font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95  max-xs:hidden">
                    Kleenestar
                </span>
            </div>

            <div className="w-full h-full flex items-center justify-center">{children}</div>
        </main>
    );
}
