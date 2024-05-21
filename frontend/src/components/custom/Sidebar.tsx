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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function Sidebar() {
    // add user image as setting icon
    const { userData, isUserSuccess } = useUserData();

    const { workspaceData, isWorkspaceSuccess } = useWorkspaceData();

    const mutation = useLogout();

    if (isUserSuccess) {
        console.log("userData", userData);
    }

    if (isWorkspaceSuccess) {
        console.log("workspaceData", workspaceData);
    }

    return (
        <TooltipProvider>
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Link
                        href="/get-started"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Icons.logoLight className="h-4 w-4 transition-all group-hover:scale-110 dark:hidden" />
                        <Icons.logoDark className="h-4 w-4 transition-all hidden dark:group-hover:scale-110 dark:block" />
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
                                <Icons.solarChatRoundLine className="h-5 w-5" />
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
                                <Icons.solarClipboardLine className="h-5 w-5" />
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
                                <Icons.solarBook2Line className="h-5 w-5" />
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
                                <Icons.solarBoltCircleLine className="h-5 w-5" />
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
                                <Icons.solarAirbudsCaseChargeLine className="h-5 w-5" />
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
                                <Icons.solarUserGroupRoundedLine className="h-5 w-5" />
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
                                <Icons.solarUserSpeakRoundedLine className="h-5 w-5" />
                                <span className="sr-only">Support and feedback</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Support and feedback</TooltipContent>
                    </Tooltip>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Separator />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => mutation.mutate()}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Icons.solarExitLine className="h-5 w-5" />
                                <span className="sr-only">Sign out</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">Sign out</TooltipContent>
                    </Tooltip>
                </nav>
            </aside>

            <header className="fixed top-0 inset-x-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4  sm:h-auto sm:border-0 justify-between sm:justify-end  sm:px-6 sm:gap-4 sm:py-4 sm:pl-14 sm:bg-transparent ">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="sm:hidden">
                            <Icons.solarSidebarLine className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="/"
                                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                            >
                                <Icons.logoLight className="h-5 w-5 transition-all group-hover:scale-110 dark:hidden" />
                                <Icons.logoDark className="h-5 w-5 transition-all hidden dark:group-hover:scale-110 dark:block" />
                                <span className="sr-only">Kleenestar</span>
                            </Link>
                            <Link
                                href="/chat"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Icons.solarChatRoundLine className="h-5 w-5" />
                                Chat
                            </Link>
                            <Link
                                href="/blocknotes"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Icons.solarClipboardLine className="h-5 w-5" />
                                Blocknotes
                            </Link>
                            <Link
                                href="/knowledge"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Icons.solarBook2Line className="h-5 w-5" />
                                Knowledge
                            </Link>
                            <Link
                                href="/channels"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Icons.solarBoltCircleLine className="h-5 w-5" />
                                Connect channels
                            </Link>
                            <Link
                                href="/billing"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Icons.solarAirbudsCaseChargeLine className="h-5 w-5" />
                                Plans and billing
                            </Link>
                            <Link
                                href="/team"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Icons.solarUserGroupRoundedLine className="h-5 w-5" />
                                Team members
                            </Link>
                            <Link
                                href="/feedback"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Icons.solarUserSpeakRoundedLine className="h-5 w-5" />
                                Feedback
                            </Link>
                            <div
                                onClick={() => mutation.mutate()}
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Icons.solarExitLine className="h-5 w-5" />
                                Sign out
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-row gap-2 items-center">
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
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback className="flex items-center justify-center">
                                N
                            </AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Settings</span>
                    </Link>
                </div>
            </header>
        </TooltipProvider>
    );
}
