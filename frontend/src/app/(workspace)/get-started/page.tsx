import { Icons } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const GetStarted: React.FC = () => {
    return (
        <div className="relative h-full flex flex-col items-center animate-fade-in-up pt-[10%] max-xl:pt-[30%] z-10">
            <Icons.logoDark className="w-[150px] h-[150px] max-xl:w-[50px] max-xl:h-[50px] transition-all hover:scale-110 dark:hidden duration-500" />
            <Icons.logoLight className="w-[150px] h-[150px] max-xl:w-[50px] max-xl:h-[50px] transition-all hidden dark:hover:scale-110 dark:block duration-500" />

            <p className="text-5xl max-xl:text-2xl text-center font-mainhead font-bold bg-clip-text text-transparent bg-gradient-to-b from-background dark:from-foreground to-neutral-800 dark:to-background-800 py-8">
                Welcome to Kleenestar
            </p>
            <div className="px-[15%] text-center">
                <p className="max-w-[800px] w-full">
                    Kleenestar collects every event from your marketing effort and provides
                    real-time decision-making insights and recommendations in natural language.
                </p>
            </div>
            <div className="mt-12">
                <Link
                    href="/workspace"
                    className={cn(
                        buttonVariants({ variant: "default" }),
                        "rounded-full px-6 py-4 sm:px-8 sm:py-6",
                    )}
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default GetStarted;
