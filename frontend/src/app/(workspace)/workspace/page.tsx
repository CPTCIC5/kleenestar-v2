import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import workspace from "../../../assets/images/workspace.jpg";
import person from "../../../assets/images/person.jpg";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/assets/icons";

export default function ChooseStart() {
    return (
        <div className="relative animate-fade-in-up  max-xl:pt-10 pt-[5%]">
            <div className="animate-fade-in-up  max-xl:px-5">
                <div>
                    <Icons.logoDark className=" w-[50px] h-[50px] mx-auto max-xl:w-[50px] max-xl:h-[50px]" />
                </div>
                <div className="text-[30px] text-center font-bold font-mainhead pt-4">
                    {"Let's get started"}
                </div>
                <div className="w-[45%] max-xl:w-[100%] mx-auto pt-4  text-gray-700">
                    <div className="text-center w-full max-xl:text-sm">
                        Join a Workspace to collaborate with your team by entering your workspace
                        code or Create a Workspace to set up your own and begin organizing and
                        analyzing your marketing data across multiple platforms.
                    </div>
                </div>
                <div className="flex items-center justify-center gap-6 w-full pt-10 max-xl:pt-4 max-xl:flex-col max-xl:gap-4 pb-10">
                    <Link href="/invited-register">
                        <Card
                            className={cn(
                                "h-[300px] w-[300px] max-xl:h-[200px] max-xl:w-[200px] hover:shadow-lg hover:scale-[1.02]",
                            )}
                        >
                            <CardContent className={cn("p-0 h-[90%] py-2 w-[90%] mx-auto")}>
                                <Image
                                    className="w-full h-full rounded-2xl "
                                    src={workspace}
                                    alt={"workspace"}
                                ></Image>
                                <p className="text-center w-full max-xl:text-sm">
                                    I have a workspace
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/register">
                        <Card
                            className={cn(
                                "h-[300px] w-[300px] max-xl:h-[200px] max-xl:w-[200px] hover:shadow-lg hover:scale-[1.02]",
                            )}
                        >
                            <CardContent className={cn("p-0 h-[90%] py-2  w-[90%] mx-auto")}>
                                <Image
                                    className="w-full h-full rounded-2xl "
                                    src={person}
                                    alt={"person"}
                                ></Image>
                                <p className="text-center w-full max-xl:text-sm">
                                    I {"don't"} have a workspace
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
