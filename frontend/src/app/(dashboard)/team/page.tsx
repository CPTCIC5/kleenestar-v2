import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { dummySheetNotesData } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon, InfoCircledIcon, PauseIcon, Share1Icon } from "@radix-ui/react-icons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/custom/CustomDropdown";
import { BackpackIcon, Share2Icon, TrashIcon } from "lucide-react";

export default function TeamMembersPage() {
    return (
        <div className="w-full h-full flex items-center justify-center p-3">
            <div className="max-w-[672.02px] w-full h-full">
                <div className="w-full mt-[99.5px] max-sm:mt-[60px] flex items-center space-x-2">
                    <span className="font-mainhead text-[18px]">Team members</span>
                    <InfoCircledIcon className="h-[16px] w-[16px]" />
                </div>

                <div className="w-full mt-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-center px-[18px] py-[9px] space-x-2">
                            <Input
                                type="text"
                                placeholder="Add email separate by comma…"
                                className="w-full border-none bg-muted focus-visible:ring-0"
                            />
                            <Button
                                variant={"outline"}
                                className="py-[9px] px-[18px] flex gap-[11px] items-center justify-center !mt-0 group"
                            >
                                <div
                                    className={cn(
                                        buttonVariants({ variant: "outline" }),
                                        "h-5 w-5 p-[4px] flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground",
                                    )}
                                >
                                    <Share1Icon />
                                </div>
                                <span className="text-[13px]">Send Invite</span>
                            </Button>
                        </CardHeader>
                    </Card>
                </div>
                <div className="w-full mt-[31.38px] mb-[20.5px]">
                    <span className="text-[14px]">Invited users</span>
                </div>
                <div className="w-full">
                    {dummySheetNotesData.map((note) => {
                        return (
                            <Card key={note.id}>
                                <CardHeader className="flex flex-row items-center justify-center px-[20px] py-[15px] space-x-2">
                                    <Avatar className="w-[30px] h-[30px]  rounded-full ">
                                        <AvatarImage
                                            className="rounded-full border-2 border-muted"
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback className="flex items-center justify-center">
                                            N
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <CardTitle className="text-[15px]">{note.name}</CardTitle>
                                    </div>

                                    <Select>
                                        <SelectTrigger className="w-[8rem]">
                                            <SelectValue placeholder={"member"} />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="editor">editor</SelectItem>
                                            <SelectItem value="member">member</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button
                                                variant={"ghost"}
                                                className="ml-2 h-fit p-2  rounded-full"
                                            >
                                                <DotsHorizontalIcon className={`h-4 w-4`} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full max-w-[166px]">
                                            <Button
                                                variant="ghost"
                                                className="flex justify-start gap-2 w-full"
                                            >
                                                <PauseIcon className="h-4 w-4" />
                                                <span className="text-[14px] font-normal">
                                                    Suspend
                                                </span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="flex justify-start gap-2 w-full"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                <span className="text-[14px] font-normal">
                                                    Delete
                                                </span>
                                            </Button>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
