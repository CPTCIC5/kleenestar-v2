import { Button } from "@/components/ui/button";
import { useUiStore } from "@/providers/stores/UiStoreProvider";
import { BookmarkSimple, List } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import { ChatNotesSheet } from "../sheets/ChatNotesSheet";

interface ChatNavbarProps {
    chatName: string;
    convoId?: number;
}

export default function ChatNavbar({ chatName, convoId }: ChatNavbarProps) {
    const { isChatSidebarOpen, setIsChatSidebarOpen, setChatSidebarType } = useUiStore(
        useShallow((state) => ({
            isChatSidebarOpen: state.isChatSidebarOpen,
            setIsChatSidebarOpen: state.setIsChatSidebarOpen,
            setChatSidebarType: state.setChatSidebarType,
        })),
    );

    return (
        <React.Fragment>
            <div className="flex md:hidden fixed top-2.5 left-14 z-50 items-center gap-3">
                <Button
                    onClick={() => {
                        setIsChatSidebarOpen(!isChatSidebarOpen);
                        setChatSidebarType("sheet");
                    }}
                    size="icon"
                    variant="secondary"
                    className="size-9"
                >
                    <List weight="duotone" className="size-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                {convoId && <ChatNotesSheet convoId={convoId} />}
            </div>
            <div className="w-full h-10 hidden md:flex items-center justify-between space-x-2">
                <Button
                    onClick={() => {
                        setIsChatSidebarOpen(!isChatSidebarOpen);
                        setChatSidebarType("sidebar");
                    }}
                    size="icon"
                    variant="secondary"
                    className="size-9 hidden md:flex"
                >
                    <List weight="duotone" className="size-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                <span className="w-full text-2xl font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95">
                    {chatName ? chatName : "Chat"}
                </span>
                {convoId && <ChatNotesSheet convoId={convoId} />}
            </div>
        </React.Fragment>
    );
}
