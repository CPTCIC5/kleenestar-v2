"use client";

import { usePathname } from "next/navigation";
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

export default function Sidebar() {
    const pathname = usePathname();
    const { userData, isUserSuccess } = useUserData();
    const { workspaceData, isWorkspaceSuccess } = useWorkspaceData();
    const mutation = useLogout();

    const navItems = [
        {
            href: "/chat",
            icon: Icons.solarChatRoundLine,
            label: "Chat",
            active: pathname.startsWith("/chat/"),
        },
        {
            href: "/blocknote",
            icon: Icons.solarBookmarkFolderLine,
            label: "Blocknotes",
            active: pathname.startsWith("/blocknote/"),
        },
        {
            href: "/channels",
            icon: Icons.solarBoltCircleLine,
            label: "Connect channels",
            active: pathname === "/channels/",
        },
        {
            href: "/billing",
            icon: Icons.solarAirbudsCaseChargeLine,
            label: "Plans and billing",
            active: pathname === "/billing/",
        },
        {
            href: "/team",
            icon: Icons.solarUserGroupRoundedLine,
            label: "Team members",
            active: pathname === "/team/",
        },
        {
            href: "/feedback",
            icon: Icons.solarUserSpeakRoundedLine,
            label: "Support and feedback",
            active: pathname === "/feedback/",
        },
    ];

    return (
        <TooltipProvider>
            <aside className="fixed inset-y-2  left-2 z-40 hidden w-14 flex-col bg-gradient-to-l from-muted/60 to-muted sm:flex rounded-2xl border border-border">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Link
                        href="/get-started"
                        className="group flex h-9 w-9 mt-3.5 shrink-0 gap-2 items-center justify-center rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Icons.logoDark className="h-full w-full transition-all group-hover:scale-110 dark:hidden" />
                        <Icons.logoLight className="h-full w-full transition-all hidden dark:group-hover:scale-110 dark:block" />
                        <span className="sr-only">Kleenestar</span>
                    </Link>
                    <Separator className="bg-muted-foreground/40" />
                    {navItems.map(({ href, icon: Icon, label, active }) => (
                        <Tooltip key={label}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={href}
                                    className={cn(
                                        "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-9 md:w-9",
                                        active &&
                                            "text-background primary-btn-gradient hover:text-background rounded-xl",
                                    )}
                                >
                                    <Icon className="h-6 w-6" />
                                    <span className="sr-only">{label}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">{label}</TooltipContent>
                        </Tooltip>
                    ))}
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                    <ModeToggle />
                    <Separator className="bg-muted-foreground/40" />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/settings"
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "icon" }),
                                    "rounded-full p-0 z-50 ring-1 ring-muted-foreground/30 focus-visible:ring-1 focus-visible:ring-muted-foreground/30",
                                )}
                            >
                                <Avatar className="w-9 h-9 rounded-full ">
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
            <header className="fixed top-0 inset-x-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-auto sm:border-0 justify-between sm:hidden sm:justify-end sm:px-6 sm:gap-4 sm:py-4 sm:pl-14 sm:bg-transparent">
                <SidebarSheet />
                <div className="flex flex-row gap-2 items-center sm:hidden">
                    <ModeToggle mobile={true} />
                    <Link
                        href="/settings"
                        className={cn(
                            buttonVariants({ variant: "outline", size: "icon" }),
                            "rounded-full p-0 z-50 ring-1 ring-muted-foreground/30 focus-visible:ring-1 focus-visible:ring-muted-foreground/30",
                        )}
                    >
                        <Avatar className="w-9 h-9 rounded-full ">
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
