import Link from "next/link";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { buttonVariants } from "@/components/ui/button";
import SplineComponent from "@/components/custom/SplineComponent";

const GetStartedPage: React.FC = () => {
    return (
        <div className="relative flex flex-col items-center animate-fade-in-up">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="hsl(var(--foreground))"
            />
            <div className="h-72 w-full flex justify-center items-center">
                <SplineComponent
                    className="dark:hidden"
                    sceneUrl="https://prod.spline.design/ecypVgD7JeyQUdGF/scene.splinecode"
                />
                <SplineComponent
                    className="dark:block hidden"
                    sceneUrl="https://prod.spline.design/yeoLHMuzkpljmaA0/scene.splinecode"
                />
            </div>

            <p className="text-2xl sm:text-3xl xl:text-5xl min-[1240px]:text-6xl 2xl:text-7xl text-center font-mainhead font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 dark:from-neutral-400 to-neutral-700 dark:to-neutral-600">
                Welcome to Kleenestar
            </p>
            <div className="px-9 my-12 text-center">
                <p className="xl:max-w-2xl max-w-md w-full text-muted-foreground font-medium">
                    Kleenestar collects every event from your marketing effort and provides
                    real-time decision-making insights and recommendations in natural language.
                </p>
            </div>
            <Link
                href="/register-option"
                className={cn(
                    buttonVariants({ variant: "default" }),
                    "text-lg py-7 px-11 rounded-full primary-btn-gradient transition-all duration-300 ease-in-out hover:scale-105",
                )}
            >
                Get Started
            </Link>
        </div>
    );
};

export default GetStartedPage;
