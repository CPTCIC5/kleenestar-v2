import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Icons } from "@/assets/icons";

const ChooseStart: React.FC = () => {
    return (
        <div className="relative animate-fade-in-up pt-[5%] max-xl:pt-10">
            <div className="animate-fade-in-up max-xl:px-5">
                <div>
                    <Icons.logoDark className="w-[50px] h-[50px] mx-auto transition-all hover:scale-110 dark:hidden duration-500" />
                    <Icons.logoLight className="w-[50px] h-[50px] mx-auto transition-all hidden dark:hover:scale-110 dark:block duration-500" />
                </div>
                <div className="text-center font-bold font-mainhead text-[30px] pt-4">
                    {"Let's get started"}
                </div>
                <div className="w-[45%] mx-auto text-center pt-4 max-xl:w-[100%] max-xl:text-sm">
                    Join a Workspace to collaborate with your team by entering your workspace code
                    or Create a Workspace to set up your own and begin organizing and analyzing your
                    marketing data across multiple platforms.
                </div>
                <div className="flex items-center justify-center gap-6 pt-10 pb-10 max-xl:pt-4 max-xl:flex-col max-xl:gap-4">
                    <Link href="/invited-register">
                        <Card className="h-[250px] w-[250px] transition-all duration-300 hover:shadow-lg  hover:scale-[1.02] max-xl:h-[200px] max-xl:w-[200px] bg-card">
                            <CardContent className="h-full p-6 flex flex-col items-center justify-between">
                                <Icons.workspaceYes className="w-[80%] h-[80%]" />
                                <p className="text-center max-xl:text-sm">I have a workspace</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/register">
                        <Card className="h-[250px] w-[250px] transition-all duration-300 hover:shadow-lg  hover:scale-[1.02] max-xl:h-[200px] max-xl:w-[200px] bg-card">
                            <CardContent className="h-full p-6 flex flex-col items-center justify-between">
                                <Icons.workspaceNo className="w-[80%] h-[80%] " />
                                <p className="text-center max-xl:text-sm">
                                    I {"don't"} have a workspace
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChooseStart;
