import { Icons } from "@/assets/icons";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="relative w-full h-screen flex">
                <div className="absolute top-[32px] left-[32px] flex items-center gap-[12px]  z-10 max-lg:text-foreground ">
                    <Icons.logoDark className="h-[34px] w-[34px] dark:hidden" />
                    <Icons.logoLight className="h-[34px] w-[34px] hidden dark:block" />
                    <span className=" font-mainhead text-[27px] max-xs:hidden">Kleenestar</span>
                </div>

                <div className="w-full flex h-screen items-center justify-center flex-1 ">
                    {children}
                </div>
            </div>
        </>
    );
}
