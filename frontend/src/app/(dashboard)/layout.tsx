"use client";

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
            <div className="flex min-h-screen bg-muted/40 h-full w-full flex-col ">
                <Sidebar />

                <div className="w-full h-full  sm:pl-[55.2px]">{children}</div>
            </div>
        </>
    );
}
