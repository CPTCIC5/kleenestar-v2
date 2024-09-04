import { Icons } from "@/assets/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLogoutUser } from "@/hooks/auth/useLogoutUser";
import { cn } from "@/lib/utils";
import { Graph } from "@phosphor-icons/react";
import {
    BookmarkSimple,
    ChatTeardropText,
    Invoice,
    Lightning,
    Sidebar,
    SignOut,
    ThumbsUp,
    Users,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebarSheet() {
    const pathname = usePathname();
    const { mutate } = useLogoutUser();

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
        // {
        //     href: "/dashboard/billing",
        //     icon: Invoice,
        //     label: "Billing",
        //     active: pathname === "/dashboard/billing/",
        // },
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
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="secondary" className="md:hidden size-9">
                    <Sidebar weight="duotone" className="size-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className="md:max-w-xs justify-between flex flex-col"
                overlayClassName="backdrop-blur-sm"
            >
                <nav className="grid gap-6 text-lg font-medium font-bricolage">
                    <Link href="/">
                        <Icons.logoKleenDark className="transition-all group-hover:scale-110 dark:hidden size-10" />
                        <Icons.logoKleenLight className="transition-all hidden dark:group-hover:scale-110 dark:block size-10" />
                    </Link>

                    {sidebarItems.map(({ href, icon: Icon, label, active }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                `flex items-center gap-4 px-2.5`,
                                active ? "text-primary" : "text-muted-foreground",
                            )}
                        >
                            <Icon weight="duotone" className="h-6 w-6" />
                            {label}
                        </Link>
                    ))}
                </nav>
                <Button
                    onClick={() => mutate()}
                    variant="destructive"
                    className={cn(
                        buttonVariants({ variant: "secondary" }),
                        "flex items-center gap-4 px-2.5 bg-opacity-40 text-destructive border border-destructive bg-destructive/10 hover:bg-destructive/20",
                    )}
                >
                    <SignOut weight="duotone" className="h-6 w-6" />
                    Sign out
                </Button>
            </SheetContent>
        </Sheet>
    );
}
