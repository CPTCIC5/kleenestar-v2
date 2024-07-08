import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Icons } from "@/assets/icons";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SidebarSheet = () => {
    const pathname = usePathname();
    const mutation = useLogout();

    const navItems = [
        { href: "/", icon: Icons.logoDark, label: "Kleenestar", darkIcon: Icons.logoLight },
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
            label: "Feedback",
            active: pathname === "/feedback/",
        },
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <Icons.solarSidebarLine className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    {navItems.map(({ href, icon: Icon, label, darkIcon: DarkIcon, active }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                `flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground ${
                                    label === "Kleenestar" &&
                                    "group h-14 w-14 shrink-0 rounded-full"
                                }`,
                                active
                                    ? "text-pop-blue/80 hover:text-pop-blue"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            <Icon
                                className={` ${
                                    label === "Kleenestar"
                                        ? "transition-all group-hover:scale-110 dark:hidden h-14 w-14"
                                        : "h-6 w-6"
                                }`}
                            />
                            {DarkIcon && (
                                <DarkIcon className="transition-all hidden dark:group-hover:scale-110 dark:block h-14 w-14" />
                            )}
                            <span className="sr-only">{label}</span>
                            {label !== "Kleenestar" && label}
                        </Link>
                    ))}
                    <div
                        onClick={() => mutation.mutate()}
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                        <Icons.solarExitLine className="h-5 w-5" />
                        Sign out
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default SidebarSheet;
