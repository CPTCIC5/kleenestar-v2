"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import workspace from "../../../assets/images/workspace.jpg";
import person from "../../../assets/images/person.jpg";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/assets/icons";
import { useRouter } from "next/navigation";

export default function ChooseStart() {
    const router = useRouter();

    return (
        <div className="relative animate-fade-in-up  max-xl:pt-10 pt-[5%]">
            <div className="animate-fade-in-up  max-xl:px-10">
                <div>
                    <Icons.logoDark className=" w-[50px] h-[50px] mx-auto max-xl:w-[50px] max-xl:h-[50px]" />
                </div>
                <div className="text-[30px] text-center font-bold font-mainhead pt-4">
                    {"Let's get started"}
                </div>
                <div className="w-[45%] max-xl:w-[90%] mx-auto pt-4  text-gray-700">
                    <div className="text-center  w-fit">
                        Join a Workspace to collaborate with your team by entering your workspace
                        code or accepting an invite, or Create a Workspace to set up your own and
                        begin organizing and analyzing your marketing data across multiple
                        platforms.
                    </div>
                </div>
                <div className="flex mx-auto gap-[5%] w-fit pt-10 max-xl:flex-col max-xl:gap-4 pb-10">
                    <Link href="/invited-register">
                        <Card
                            className={cn("h-[310px] w-[300px] hover:shadow-lg hover:scale-[1.02]")}
                        >
                            <CardContent className={cn("p-0 h-[260px] pt-4 w-[90%] mx-auto")}>
                                <Image
                                    className="w-full h-full rounded-2xl "
                                    src={workspace}
                                    alt={"workspace"}
                                ></Image>
                            </CardContent>
                            <p className="text-center w-full mt-2">I have a workspace</p>
                        </Card>
                    </Link>
                    <Link href="/register">
                        <Card
                            className={cn("h-[310px] w-[300px] hover:shadow-lg hover:scale-[1.02]")}
                        >
                            <CardContent className={cn("p-0 h-[260px] pt-4 w-[90%] mx-auto")}>
                                <Image
                                    className="w-full h-full rounded-2xl "
                                    src={person}
                                    alt={"person"}
                                ></Image>
                            </CardContent>
                            <p className="text-center w-full mt-2">I {"don't"} have a workspace</p>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
