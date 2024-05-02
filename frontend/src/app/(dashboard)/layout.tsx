import { Icons } from "@/assets/icons";
import Sidebar from "@/components/custom/Sidebar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex min-h-screen w-full flex-col ">
                <TooltipProvider>
                    <Sidebar />
                </TooltipProvider>
                <div className="w-full h-full  sm:pl-[55.2px]">{children}</div>
            </div>
        </>
    );
}
