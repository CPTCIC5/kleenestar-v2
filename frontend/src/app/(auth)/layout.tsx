import { Icons } from "@/assets/icons";
import GridBackground from "@/components/ui/background-grid";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative w-full min-h-screen flex justify-center items-center">
            <div className="absolute bg-custom-radial-gradient blur-3xl z-[-1] w-full h-full scale-100"></div>
            <div className="absolute top-8 left-8 flex items-center gap-3  z-10 max-lg:text-foreground">
                <Icons.logoDark className="h-9 w-9 dark:hidden" />
                <Icons.logoLight className="h-9 w-9 hidden dark:block" />
                <span className=" font-mainhead text-3xl max-xphone:hidden">Kleenestar</span>
            </div>
            <GridBackground />

            <div className="w-full h-full flex items-center justify-center">{children}</div>
        </div>
    );
}
