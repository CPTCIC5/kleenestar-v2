"use client";

import { ChatSidebar } from "@/components/custom/sidebars/ChatSidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-[calc(100vh-56px)] md:h-screen">
            <div className="flex w-full h-full">
                <ChatSidebar />
                <div className="w-full h-full">{children}</div>
            </div>
        </div>
    );
}
