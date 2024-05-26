"use client";

import { ChatSidebar } from "@/components/custom/ChatSidebar";
import { useFetchConvos } from "@/hooks/useFetchConvos";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-screen flex items-start justify-center flex-1 bg-muted/40 max-sm:pt-[56px]">
            <ChatSidebar />
            <div className=" flex-1 w-full h-full ">{children}</div>
        </div>
    );
}
