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
} from "@/components/ui/dropdown-menu";
import { BackpackIcon, Share2Icon, TrashIcon } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useWorkspaceData } from "@/hooks/useWorkspaceData";
import { useSendInviteCode } from "@/hooks/useSendInviteCode";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Icons } from "@/assets/icons";
import { capitalizeFirstLetter } from "../../../lib/utils";

type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile: {
        avatar: string;
    };
};

export default function TeamMembersPage() {
    const { workspaceData } = useWorkspaceData();
    const [emailInput, setEmailInput] = React.useState<string>("");

    console.log(workspaceData, "workspaceData");

    const mutation = useSendInviteCode();

    const onSubmit = async () => {
        mutation.mutate({ id: workspaceData?.id, emailInput: emailInput });
    };

    return (
        <div className="w-full h-full flex justify-center p-3">
            <div className="max-w-2xl w-full h-full">
                <div>
                    <div className="w-full flex items-center space-x-2 font-mainhead text-xl">
                        <span>Team members</span>
                        <InfoCircledIcon className="h-4 w-4" />
                    </div>
                    <CardDescription>Invite your team members to collaborate.</CardDescription>
                </div>

                <div className="w-full space-y-5 my-5">
                    <Card className="rounded-3xl">
                        <CardHeader className="flex flex-row items-center justify-center px-4 py-2 space-x-2">
                            <Input
                                type="email"
                                value={emailInput}
                                disabled={mutation.isPending}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="Enter email address of the user you want to invite"
                                className="w-full border-none bg-muted h-9 focus-visible:ring-pop-blue focus-visible:ring-2"
                            />
                            <Button
                                variant={"outline"}
                                disabled={mutation.isPending || emailInput === ""}
                                onClick={onSubmit}
                                className="flex gap-1 items-center justify-center !mt-0 group primary-btn-gradient"
                            >
                                <Share1Icon className="h-3 w-3 bg-transparent" />
                                <span>Invite</span>
                            </Button>
                        </CardHeader>
                    </Card>
                </div>

                <Label className="text-muted-foreground ">Team members</Label>

                <div className="w-full space-y-2 mt-3">
                    {workspaceData?.users.map((user: User) => {
                        return (
                            <div
                                key={user.id}
                                className="flex flex-row items-center justify-center py-3 space-x-2"
                            >
                                <Avatar className="w-9 h-9 rounded-full border-2 border-muted ">
                                    <AvatarImage
                                        className="rounded-full "
                                        src={user?.profile?.avatar}
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback className="flex items-center justify-center">
                                        {user?.first_name?.charAt(0).toUpperCase() || "K"}
                                    </AvatarFallback>
                                </Avatar>

                                <span className=" flex-1 !mt-0 ml-2 text-sm overflow-ellipsis">
                                    {user.first_name === "" && user.last_name === ""
                                        ? capitalizeFirstLetter(user.email)
                                        : user.first_name + " " + user.last_name}
                                </span>

                                <Select>
                                    <SelectTrigger className="w-24 !mt-0 max-xs:hidden">
                                        <SelectValue placeholder={"member"} />
                                    </SelectTrigger>
                                    <SelectContent className="min-w-24">
                                        <SelectItem value="editor">editor</SelectItem>
                                        <SelectItem value="member">member</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="space-x-1 min-w-20">
                                    <Button variant="outline" size="icon">
                                        <Icons.solarSuspendLine className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Icons.solarBinLine className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
