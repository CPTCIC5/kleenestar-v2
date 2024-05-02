import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
    BookText,
    ClipboardList,
    DatabaseZap,
    MessageCircleMore,
    PanelLeft,
    Speech,
    UsersRound,
    Wallet,
} from "lucide-react";
import { Button } from "../ui/button";
import { Icons } from "@/assets/icons";
import { Separator } from "../ui/separator";

export default function Sidebar() {
    return (
        <div className="w-full h-full">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Link
                        href="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Icons.logoLight className="h-4 w-4 transition-all group-hover:scale-110" />
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
                                href="/teams"
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
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:bg-muted/40">
                <header className="fixed top-0 inset-x-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
                                    <Icons.logoLight className="h-5 w-5 transition-all group-hover:scale-110" />
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
                                    href="/teams"
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
                                    Support and feedback
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>
            </div>
        </div>
    );
}
