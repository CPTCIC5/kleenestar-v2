"use client";

import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
    BookText,
    ClipboardList,
    DatabaseZap,
    LogOut,
    MessageCircleMore,
    PanelLeft,
    Speech,
    UsersRound,
    Wallet,
} from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "@/assets/icons";
import { Separator } from "../ui/separator";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const navigate = useRouter();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState<{
        id: string;
        profile: { country: string };
    }>({
        id: "",
        profile: {
            country: "",
        },
    });
    React.useEffect(() => {
        const fetchWorkspaceDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/workspaces/`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": Cookies.get("csrftoken"),
                        },
                    },
                );
                // console.log(response);

                setIsLoggedIn(true);
                setUserDetails(response.data[0].root_user);
            } catch (err) {
                navigate.push("/");
            }
        };
        fetchWorkspaceDetails();
    }, [isLoggedIn]);

    const handleLogOut = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout/`,
                null,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                },
            );
            console.log(response);
            Cookies.remove("csrftoken");
        } catch (err) {
            console.error("Logout Failed");
            throw new Error("Logout Failed");
        }
    };

    return (
        <TooltipProvider>
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Link
                        href="/"
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
                                <MessageCircleMore className="h-5 w-5" />
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
                                <ClipboardList className="h-5 w-5" />
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
                                <BookText className="h-5 w-5" />
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
                                <DatabaseZap className="h-5 w-5" />
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
                                <Wallet className="h-5 w-5" />
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
                                <UsersRound className="h-5 w-5" />
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
                                <Speech className="h-5 w-5" />
                                <span className="sr-only">Support and feedback</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Support and feedback</TooltipContent>
                    </Tooltip>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={handleLogOut}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <LogOut className="h-5 w-5" />
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
                            <PanelLeft className="h-5 w-5" />
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
                                <MessageCircleMore className="h-5 w-5" />
                                Chat
                            </Link>
                            <Link
                                href="/blocknotes"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <ClipboardList className="h-5 w-5" />
                                Blocknotes
                            </Link>
                            <Link
                                href="/knowledge"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <BookText className="h-5 w-5" />
                                Knowledge
                            </Link>
                            <Link
                                href="/channels"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <DatabaseZap className="h-5 w-5" />
                                Connect channels
                            </Link>
                            <Link
                                href="/billing"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Wallet className="h-5 w-5" />
                                Plans and billing
                            </Link>
                            <Link
                                href="/team"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <UsersRound className="h-5 w-5" />
                                Team members
                            </Link>
                            <Link
                                href="/feedback"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Speech className="h-5 w-5" />
                                Feedback
                            </Link>
                            <div
                                onClick={handleLogOut}
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <LogOut className="h-5 w-5" />
                                Sign out
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex gap-2 items-center">
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
