import { Card, CardContent } from "@/components/ui/card";
import workspace from "../../../assets/images/workspace.jpg";
import person from "../../../assets/images/person.jpg";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/assets/icons";

const ChooseStart: React.FC = () => {
    return (
        <div className="relative animate-fade-in-up pt-[5%] max-xl:pt-10">
            <div className="animate-fade-in-up max-xl:px-5">
                <div>
                    <Icons.logoDark className="w-[50px] h-[50px] mx-auto" />
                </div>
                <div className="text-center font-bold font-mainhead text-[30px] pt-4">
                    {"Let's get started"}
                </div>
                <div className="w-[45%] mx-auto text-center text-gray-700 pt-4 max-xl:w-[100%] max-xl:text-sm">
                    Join a Workspace to collaborate with your team by entering your workspace code
                    or Create a Workspace to set up your own and begin organizing and analyzing your
                    marketing data across multiple platforms.
                </div>
                <div className="flex items-center justify-center gap-6 pt-10 pb-10 max-xl:pt-4 max-xl:flex-col max-xl:gap-4">
                    <Link href="/invited-register">
                        <Card className="h-[300px] w-[300px] hover:shadow-lg hover:scale-[1.02] max-xl:h-[200px] max-xl:w-[200px]">
                            <CardContent className="h-[90%] w-[90%] p-0 py-2 mx-auto">
                                <Image
                                    className="w-full h-full rounded-2xl"
                                    src={workspace}
                                    alt="workspace"
                                />
                                <p className="text-center max-xl:text-sm">I have a workspace</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/register">
                        <Card className="h-[300px] w-[300px] hover:shadow-lg hover:scale-[1.02] max-xl:h-[200px] max-xl:w-[200px]">
                            <CardContent className="h-[90%] w-[90%] p-0 py-2 mx-auto">
                                <Image
                                    className="w-full h-full rounded-2xl"
                                    src={person}
                                    alt="person"
                                />
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
