"use client";

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
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

type User = {
    id: string;
    first_name: string;
    last_name: string;
};

export default function TeamMembersPage() {
    const navigate = useRouter();

    const [users, setUsers] = React.useState<User[]>([]); // [ { id: string, name: string }
    const [emailInput, setEmailInput] = React.useState("");
    const [workspaceId, setWorkspaceId] = React.useState<number | null>(null);

    React.useEffect(() => {
        const fetchWorkspaceDetails = async () => {
            try {
                const response = await axios.get(`/api/workspaces/`, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                });
                console.log(response);
                setWorkspaceId(response.data[0].id);
                setUsers(response.data[0].users);
            } catch (err) {
                console.error(err);
            }
        };
        fetchWorkspaceDetails();
    }, []);

    async function sendInviteCode() {
        try {
            const response = await axios.post(
                `/api/workspaces/${workspaceId}/create-invite/`,
                {
                    email: emailInput,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                },
            );
            toast.success("Invite link sent");
        } catch (err) {
            console.error(err);
            toast.error("Oops! something went wrong");
        }
    }

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
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="Add email separate by comma…"
                                className="w-full border-none bg-muted focus-visible:ring-0"
                            />
                            <Button
                                variant={"outline"}
                                onClick={sendInviteCode}
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
                <div className="w-full space-y-2">
                    {users.map((user) => {
                        return (
                            <Card key={user.id}>
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

                                    <div className="flex-1 !mt-0 ">
                                        <CardTitle className="text-[15px]">
                                            {user.first_name + " " + user.last_name}
                                        </CardTitle>
                                    </div>

                                    <Select>
                                        <SelectTrigger disabled={true} className="w-[8rem] !mt-0">
                                            <SelectValue placeholder={"member"} />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="editor">editor</SelectItem>
                                            <SelectItem value="member">member</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="!mt-0 ml-2">
                                            <Button
                                                variant={"ghost"}
                                                className=" h-fit p-2  rounded-full focus-visible:ring-0 ring-0 outline-none border-none"
                                            >
                                                <DotsHorizontalIcon className={`h-4 w-4`} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full max-w-[166px]">
                                            <Button
                                                variant="ghost"
                                                disabled={true}
                                                className="flex justify-start gap-2 w-full"
                                            >
                                                <PauseIcon className="h-4 w-4" />
                                                <span className="text-[14px] font-normal">
                                                    Suspend
                                                </span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                disabled={true}
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
