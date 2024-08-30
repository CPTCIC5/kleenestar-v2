"use client";

import { Icons } from "@/assets/icons";
import { SignupOptionCard } from "@/components/custom/cards/SignupOptionCard";
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";

export default function SignupOptionsPage() {
    return (
        <motion.div
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative flex flex-col items-center p-5 space-y-6 "
        >
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20 min-lg:left-1/3 min-lg:-top-1/3"
                fill="hsl(var(--foreground))"
            />
            <div>
                <Icons.logoKleenDark className="w-14 h-14 transition-all hover:scale-110 dark:hidden duration-500" />
                <Icons.logoKleenLight className="w-14 h-14 transition-all hidden dark:hover:scale-110 dark:block duration-500" />
            </div>
            <h2 className="text-4xl text-center font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95">
                Let&apos;s get started
            </h2>
            <p className="max-w-lg md:max-w-2xl w-full text-center text-muted-foreground">
                Join a Workspace to collaborate with your team by entering your workspace code or
                Create a Workspace to set up your own and begin organizing and analyzing your
                marketing data across multiple platforms.
            </p>
            <div className="flex items-center justify-center flex-col sm:flex-row gap-5 md:gap-6">
                <SignupOptionCard
                    href="/invited-signup"
                    icon={<Icons.workspaceYes className="w-full h-full" />}
                    text="I have a workspace"
                />
                <SignupOptionCard
                    href="/signup"
                    icon={<Icons.workspaceNo className="w-full h-full" />}
                    text="I don't have a workspace"
                />
            </div>
        </motion.div>
    );
}
