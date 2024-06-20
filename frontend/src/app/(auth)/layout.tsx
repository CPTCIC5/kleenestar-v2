import { Icons } from "@/assets/icons";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative w-full h-screen flex">
            <div className="absolute top-8 left-8 flex items-center gap-3  z-10 max-lg:text-foreground">
                <Icons.logoDark className="h-9 w-9 dark:hidden" />
                <Icons.logoLight className="h-9 w-9 hidden dark:block" />
                <span className=" font-mainhead text-3xl max-xs:hidden">Kleenestar</span>
            </div>

            <div className="w-full h-full flex items-center justify-center">{children}</div>
        </div>
    );
}
