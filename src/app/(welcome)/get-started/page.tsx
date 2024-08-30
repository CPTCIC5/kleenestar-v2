"use client";
import { KleenestarSplineLogo } from "@/components/custom/spline/KleenstarSplineLogo";
import { buttonVariants } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GetStartedPage() {
    return (
        <motion.div
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative flex flex-col items-center p-2"
        >
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="hsl(var(--foreground))"
            />
            <KleenestarSplineLogo />

            <div className="space-y-9 flex flex-col items-center">
                <h1 className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl text-center font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95 ">
                    Welcome to Kleenestar
                </h1>
                <p className="text-center text-balance md:max-w-2xl max-w-md w-full text-muted-foreground">
                    Kleenestar collects every event from your marketing effort and provides
                    real-time decision-making insights and recommendations in natural language.
                </p>
                <Link
                    href="/signup-options"
                    className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "text-lg py-7 px-10 rounded-full",
                    )}
                >
                    Get started
                </Link>
            </div>
        </motion.div>
    );
}
