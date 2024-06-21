import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Icons } from "@/assets/icons";
import { Spotlight } from "@/components/ui/spotlight";

const ChooseStart: React.FC = () => {
    return (
        <div className="relative w-full animate-fade-in-up px-5 space-y-4 flex flex-col justify-center items-center ">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20 min-[1100px]:left-1/3  min-[1100px]:-top-1/3"
                fill="hsl(var(--foreground))"
            />
            <Icons.logoDark className="w-14 h-14  transition-all hover:scale-110 dark:hidden duration-500" />
            <Icons.logoLight className="w-14 h-14  transition-all hidden dark:hover:scale-110 dark:block duration-500" />
            <span className="w-full text-center font-bold font-mainhead text-4xl">
                Let&apos;s get started
            </span>
            <span className="max-w-lg xl:max-w-2xl w-full text-center text-sm sm:text-base text-muted-foreground font-medium">
                Join a Workspace to collaborate with your team by entering your workspace code or
                Create a Workspace to set up your own and begin organizing and analyzing your
                marketing data across multiple platforms.
            </span>
            <div className="flex items-center justify-center flex-col sm:flex-row gap-5 xl:gap-6">
                <Link href="/invited-register">
                    <Card className="rounded-3xl h-52 w-52 sm:h-64 sm:w-64 xl:h-80 xl:w-80  transition-all duration-300 hover:shadow-md hover:shadow-pop-blue hover:scale-105 bg-card/40 hover:bg-card/60">
                        <CardContent className="h-full space-y-5  flex flex-col items-center justify-between  p-5  md:p-10">
                            <Icons.workspaceYes className="w-full h-full" />
                            <p className="text-center font-medium text-sm sm:text-base">
                                I have a workspace
                            </p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/register">
                    <Card className="rounded-3xl h-52 w-52 sm:h-64 sm:w-64 xl:h-80 xl:w-80 transition-all duration-300  hover:shadow-md hover:shadow-pop-blue hover:scale-105 bg-card/40 hover:bg-card/60">
                        <CardContent className="h-full space-y-5  flex flex-col items-center justify-between  p-5  md:p-10">
                            <Icons.workspaceNo className="w-full h-full" />
                            <p className="text-center font-medium text-sm sm:text-base">
                                I don&apos;t have a workspace
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
};

export default ChooseStart;
