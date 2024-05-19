import { Icons } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function GetStarted() {
    return (
        <div>
            <Link
                href="/login"
                className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "absolute z-20 right-8 top-8 max-sm:right-4 max-sm:top-4 cursor-pointer",
                )}
            >
                Login
            </Link>
            <div className="relative h-full flex flex-col animate-fade-in-up  w-fit  mx-auto pt-[10%] max-xl:pt-[30%] z-10">
                <Icons.logoDark className=" w-[150px] h-[150px] mx-auto max-xl:w-[50px] max-xl:h-[50px]" />
                <p className="text-5xl  max-xl:text-2xl  text-center font-mainhead font-bold bg-clip-text text-transparent bg-gradient-to-b from-background dark:from-foreground to-neutral-500 dark:to-background-500 py-8">
                    Welcome to Kleenestar
                </p>
                <div className=" px-[15%] text-center">
                    <p>
                        Kleenestar collects every event from your marketing effort and provides
                        real-time decision-making insights and recommendations in natural language
                    </p>
                </div>
                <div className="flex justify-center mt-12">
                    <Link
                        href="/workspace"
                        className={cn(
                            buttonVariants({ variant: "default" }),
                            "rounded-full px-6 py-4 sm:px-8 sm:py-6 ",
                        )}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}
