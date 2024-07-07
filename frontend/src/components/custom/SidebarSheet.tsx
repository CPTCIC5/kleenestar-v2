import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Icons } from "@/assets/icons";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";

const SidebarSheet = () => {
    const mutation = useLogout();

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
                    <Link
                        href="/"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:text-base"
                    >
                        <Icons.logoDark className="transition-all group-hover:scale-110 dark:hidden" />
                        <Icons.logoLight className="transition-all hidden dark:group-hover:scale-110 dark:block" />
                        <span className="sr-only">Kleenestar</span>
                    </Link>
                    <Link
                        href="/chat"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Icons.solarChatRoundLine className="h-6 w-6" />
                        Chat
                    </Link>
                    <Link
                        href="/blocknote"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Icons.solarBookmarkFolderLine className="h-6 w-6" />
                        Blocknotes
                    </Link>
                    {/* <Link
                        href="/knowledge"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Icons.solarBook2Line className="h-6 w-6" />
                        Knowledge
                    </Link> */}
                    <Link
                        href="/channels"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Icons.solarBoltCircleLine className="h-6 w-6" />
                        Connect channels
                    </Link>
                    <Link
                        href="/billing"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Icons.solarAirbudsCaseChargeLine className="h-6 w-6" />
                        Plans and billing
                    </Link>
                    <Link
                        href="/team"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Icons.solarUserGroupRoundedLine className="h-6 w-6" />
                        Team members
                    </Link>
                    <Link
                        href="/feedback"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Icons.solarUserSpeakRoundedLine className="h-6 w-6" />
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
    );
};

export default SidebarSheet;
