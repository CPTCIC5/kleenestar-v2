"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/assets/icons";
import { useLogout } from "@/hooks/useLogout";
import { useUserData } from "@/hooks/useUserData";
import { useWorkspaceData } from "@/hooks/useWorkspaceData";

import { ModeToggle } from "./ModeToggle";
import { Separator } from "../ui/separator";
import { Button, buttonVariants } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import SidebarSheet from "./SidebarSheet";
import { ChatSidebar } from "./ChatSidebar";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    // add user image as setting icon
    const { userData, isUserSuccess } = useUserData();

    const { workspaceData, isWorkspaceSuccess } = useWorkspaceData();

    const mutation = useLogout();

    if (isUserSuccess && isWorkspaceSuccess) {
        console.log("User data: ", userData);
        console.log("Workspace data: ", workspaceData);
    }

    return (
        <TooltipProvider>
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-14 flex-col bg-muted/40 sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Link
                        href="/get-started"
                        className="group flex h-9 w-9 mt-3.5 shrink-0 gap-2 items-center justify-center rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Icons.logoDark className="h-full w-full transition-all group-hover:scale-110 dark:hidden" />
                        <Icons.logoLight className="h-full w-full transition-all hidden dark:group-hover:scale-110 dark:block" />
                        <span className="sr-only">Kleenestar</span>
                    </Link>
                    <Separator />
                    <span className="text-[7px] text-muted-foreground">MAIN</span>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/chat"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Icons.solarChatRoundLine className="h-6 w-6" />
                                <span className="sr-only">Chat</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Chat</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/blocknotes"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Icons.solarClipboardLine className="h-6 w-6" />
                                <span className="sr-only">Blocknotes</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Blocknotes</TooltipContent>
                    </Tooltip>
                    <span className="text-[7px] text-muted-foreground">SOURCE</span>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/knowledge"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Icons.solarBook2Line className="h-6 w-6" />
                                <span className="sr-only">Knowledge</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Knowledge</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/channels"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Icons.solarBoltCircleLine className="h-6 w-6" />
                                <span className="sr-only">Connect channels</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Connect channels</TooltipContent>
                    </Tooltip>
                    <span className="text-[7px] text-muted-foreground">OTHER</span>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/billing"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Icons.solarAirbudsCaseChargeLine className="h-6 w-6" />
                                <span className="sr-only">Plans and billing</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Plans and billing</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/team"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Icons.solarUserGroupRoundedLine className="h-6 w-6" />
                                <span className="sr-only">Team members</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Team members</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/feedback"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Icons.solarUserSpeakRoundedLine className="h-6 w-6" />
                                <span className="sr-only">Support and feedback</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Support and feedback</TooltipContent>
                    </Tooltip>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                    <ModeToggle />
                    <Separator />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={"/settings"}
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "icon" }),
                                    "rounded-full p-0 z-50 ring-2 ring-background",
                                )}
                            >
                                <Avatar className="w-[35px] h-[35px] rounded-full ">
                                    <AvatarImage
                                        className="rounded-full border-2 border-muted"
                                        src={userData?.profile?.avatar}
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback className="flex items-center justify-center">
                                        {userData?.first_name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </nav>
            </aside>

            <header className="fixed top-0 inset-x-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4  sm:h-auto sm:border-0 justify-between sm:hidden sm:justify-end  sm:px-6 sm:gap-4 sm:py-4 sm:pl-14 sm:bg-transparent ">
                <div className="flex items-center gap-3">
                    <SidebarSheet />

                    {pathname === "/chat" || (pathname.startsWith("/chat/") && <ChatSidebar />)}
                </div>
                <div className="flex flex-row gap-2 items-center sm:hidden">
                    <ModeToggle />
                    <Link
                        href={"/settings"}
                        className={cn(
                            buttonVariants({ variant: "outline", size: "icon" }),
                            "rounded-full p-0 z-50",
                        )}
                    >
                        <Avatar className="w-[35px] h-[35px] rounded-full ">
                            <AvatarImage
                                className="rounded-full border-2 border-muted"
                                src={userData?.profile?.avatar}
                                alt="@shadcn"
                            />
                            <AvatarFallback className="flex items-center justify-center">
                                {userData?.first_name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Settings</span>
                    </Link>
                </div>
            </header>
        </TooltipProvider>
    );
}
