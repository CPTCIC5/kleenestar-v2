import { Icons } from "@/assets/icons";
import { Spotlight } from "@/components/ui/spotlight";
import WorkspaceCard from "@/components/custom/RegisterOptionCard";

const RegisterOptionPage: React.FC = () => {
    return (
        <div className="relative w-full animate-fade-in-up px-5 space-y-4 flex flex-col justify-center items-center pt-14 sm:pt-0">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20 min-[1100px]:left-1/3 min-[1100px]:-top-1/3"
                fill="hsl(var(--foreground))"
            />
            <Icons.logoDark className="w-14 h-14 transition-all hover:scale-110 dark:hidden duration-500" />
            <Icons.logoLight className="w-14 h-14 transition-all hidden dark:hover:scale-110 dark:block duration-500" />
            <span className="w-full text-center font-bold font-mainhead text-4xl">
                Let&apos;s get started
            </span>
            <span className="max-w-lg tablet:max-w-2xl w-full text-center text-sm sm:text-base text-muted-foreground font-medium">
                Join a Workspace to collaborate with your team by entering your workspace code or
                Create a Workspace to set up your own and begin organizing and analyzing your
                marketing data across multiple platforms.
            </span>
            <div className="flex items-center justify-center flex-col sm:flex-row gap-5 tablet:gap-6">
                <WorkspaceCard
                    href="/invited-register"
                    icon={<Icons.workspaceYes className="w-full h-full" />}
                    text="I have a workspace"
                />
                <WorkspaceCard
                    href="/register"
                    icon={<Icons.workspaceNo className="w-full h-full" />}
                    text="I don't have a workspace"
                />
            </div>
        </div>
    );
};

export default RegisterOptionPage;
