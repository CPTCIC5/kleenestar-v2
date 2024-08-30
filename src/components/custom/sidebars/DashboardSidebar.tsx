"use client";

import { Icons } from "@/assets/icons";
import { ThemeToggleButton } from "@/components/custom/buttons/ThemeToggleButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
    BookmarkSimple,
    ChatTeardropText,
    Invoice,
    Lightning,
    ThumbsUp,
    Users,
    Graph,
} from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import { DashboardSidebarSheet } from "../sheets/DashboardSidebarSheet";
import Link from "next/link";
import { SignOut } from "@phosphor-icons/react";
import { useLogoutUser } from "@/hooks/auth/useLogoutUser";
import { useFetchUser } from "@/hooks/user/useFetchUser";

export function DashboardSidebar() {
    const { data: user } = useFetchUser();
    const { mutate } = useLogoutUser();
    const pathname = usePathname();

    const sidebarItems = [
        {
            href: "/dashboard/chat",
            icon: ChatTeardropText,
            label: "Chat",
            active: pathname.startsWith("/dashboard/chat/"),
        },
        {
            href: "/dashboard/blocknotes",
            icon: BookmarkSimple,
            label: "Blocknotes",
            active: pathname.startsWith("/dashboard/blocknotes/"),
        },
        {
            href: "/dashboard/knowledge-base",
            icon: Graph,
            label: "Knowledge base",
            // active: true,
            active: pathname.startsWith("/dashboard/knowledge-base/"),
        },
        {
            href: "/dashboard/channels",
            icon: Lightning,
            label: "Channels",
            active: pathname === "/dashboard/channels/",
        },
        {
            href: "/dashboard/billing",
            icon: Invoice,
            label: "Billing",
            active: pathname === "/dashboard/billing/",
        },
        {
            href: "/dashboard/team",
            icon: Users,
            label: "Team members",
            active: pathname === "/dashboard/team/",
        },
        {
            href: "/dashboard/feedback",
            icon: ThumbsUp,
            label: "Support & Feedback",
            active: pathname === "/dashboard/feedback/",
        },
    ];

    return (
        <TooltipProvider>
            <aside className="fixed left-1 inset-y-1 z-50 hidden w-14 bg-background rounded-xl md:flex md:flex-col border border-border p-2 py-4">
                <nav className="flex flex-col items-center gap-4">
                    <Link href="/" className="rounded-full">
                        <Icons.logoKleenDark className="size-7 transition-all hover:scale-110 dark:hidden duration-500" />
                        <Icons.logoKleenLight className="size-7 transition-all hidden dark:hover:scale-110 dark:block duration-500" />
                        <span className="sr-only">Kleenestar</span>
                    </Link>
                    <Separator />
                    {sidebarItems.map(({ href, icon: Icon, label, active }) => (
                        <Tooltip key={label}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={href}
                                    className={cn(
                                        buttonVariants({
                                            variant: active ? "default" : "ghost",
                                            size: "icon",
                                        }),
                                        "size-9 flex items-center justify-center",
                                    )}
                                >
                                    <Icon weight="duotone" className="size-6" />
                                    <span className="sr-only">{label}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={14}>
                                {label}
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4">
                    <ThemeToggleButton />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/dashboard/settings">
                                <Avatar className="size-9 rounded-full border-2 border-muted">
                                    <AvatarImage
                                        src={user?.profile?.avatar}
                                        alt="profile-picture"
                                    />
                                    <AvatarFallback className="flex items-center justify-center">
                                        {user?.first_name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={14}>
                            Settings
                        </TooltipContent>
                    </Tooltip>
                    <Separator />
                    <Button
                        onClick={() => mutate()}
                        variant="secondary"
                        size="icon"
                        className="size-9 flex items-center justify-center text-destructive bg-destructive/10 hover:bg-destructive/20"
                    >
                        <SignOut weight="duotone" className="size-6" />
                        <span className="sr-only">sign out</span>
                    </Button>
                </nav>
            </aside>
            <header className="fixed top-0 inset-x-0 z-50 flex h-14 bg-background items-center gap-4 border-b p-2 justify-between md:hidden">
                <DashboardSidebarSheet />
                <div className="flex gap-2 items-center">
                    <Link href="/dashboard/settings">
                        <Avatar className="size-9 rounded-full border-2 border-muted">
                            <AvatarImage src={user?.profile?.avatar} alt="profile-picture" />
                            <AvatarFallback className="flex items-center justify-center">
                                {user?.first_name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Settings</span>
                    </Link>
                    <ThemeToggleButton display="mobile" />
                </div>
            </header>
        </TooltipProvider>
    );
}
