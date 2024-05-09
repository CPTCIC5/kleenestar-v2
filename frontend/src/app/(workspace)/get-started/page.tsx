"use client";

import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function GetStarted() {
    return (
        <div className="h-full flex-col animate-fade-in-up  w-fit  mx-auto pt-[10%] max-xl:pt-[30%]">
            <Icons.logoDark className=" w-[150px] h-[150px] mx-auto max-xl:w-[50px] max-xl:h-[50px]" />
            <p className="text-5xl  max-xl:text-2xl  text-center font-mainhead font-bold bg-clip-text text-transparent bg-gradient-to-b from-background dark:from-foreground to-neutral-500 dark:to-background-500 py-8">
                Welcome to Kleenestar
            </p>
            <div className="max-xl:text-[14px] px-[15%] font-inter  text-[18px] text-center">
                <p>
                    Kleenestar help you get valuable insights from your marketing campaings and grow
                    your marketing business
                </p>
            </div>
            <div className="flex justify-center mt-12">
                <Link
                    href="/welcome/choose"
                    className={cn(
                        buttonVariants({ variant: "default" }),
                        "rounded-full px-6 py-4 sm:px-8 sm:py-6 ",
                    )}
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
}
