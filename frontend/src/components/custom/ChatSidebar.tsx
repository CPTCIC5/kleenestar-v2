"use client";

import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon, MagicWandIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import { SearchBox } from "./SearchBox";
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChatOptionButton } from "./ChatOptionButton";
import { Convo } from "@/lib/types/interfaces";
import useDebounce from "@/hooks/useDebounce";
import { useFetchConvos } from "@/hooks/useFetchConvos";
import { useRouter } from "next/navigation";
import { useWorkspaceData } from "@/hooks/useWorkspaceData";
import { Skeleton } from "../ui/skeleton";
import { useAddConvo } from "@/hooks/useAddConvo";
import { Icons } from "@/assets/icons";

interface ChatSidebarProps {
    currentConvoId: number | null;
    setCurrentConvoId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function ChatSidebar({ currentConvoId, setCurrentConvoId }: ChatSidebarProps) {
    const router = useRouter();

    const {
        data: convos = [],
        isLoading: isConvoLoading,
        isSuccess: isConvoSuccess,
        error: convoError,
    } = useFetchConvos();
    const { workspaceData, isWorkspaceSuccess } = useWorkspaceData();
    const { addChat: addConvo, isPending: isAddingConvo } = useAddConvo();

    const [updatedConvos, setUpdatedConvos] = React.useState<Convo[]>(convos);
    const [todayConvos, setTodayConvos] = React.useState<Convo[]>([]);
    const [previousConvos, setPreviousConvos] = React.useState<Convo[]>([]);

    const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
    const [rename, setRename] = React.useState<number | null>(null);
    const [toggleOptions, setToggleOptions] = React.useState<number | null>(null);
    const [searchQuery, setSearchQuery] = React.useState("");
    const debounceValue = useDebounce(searchQuery, 1000);

    const handleAddChat = async () => {
        try {
            await addConvo();
        } catch (error) {
            console.error("Error adding convo:", error);
        }
    };

    const isTodayConvo = (convo: Convo) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const convoDate = new Date(convo.created_at);
        convoDate.setHours(0, 0, 0, 0);
        return convoDate.getTime() === today.getTime() && !convo.archived;
    };

    const isPreviousConvo = (convo: Convo) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const convoDate = new Date(convo.created_at);
        convoDate.setHours(0, 0, 0, 0);
        return convoDate.getTime() !== today.getTime() && !convo.archived;
    };

    React.useEffect(() => {
        if (isConvoSuccess) {
            const todayConvoList = convos.filter(isTodayConvo);
            const previousConvoList = convos.filter(isPreviousConvo);

            setTodayConvos(todayConvoList);
            setPreviousConvos(previousConvoList);
        }
    }, [convos, isConvoSuccess]);

    React.useEffect(() => {
        handleSearch();
    }, [debounceValue]);

    const handleSearch = () => {
        const filteredConvos = convos.filter((convo: Convo) =>
            convo.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setTodayConvos(filteredConvos.filter(isTodayConvo));
        setPreviousConvos(filteredConvos.filter(isPreviousConvo));
    };

    const handleConvoClick = (convoId: number) => {
        setCurrentConvoId(convoId);
        router.push(`/chat/${convoId}`);
    };

    return (
        <div
            className={`max-sm:absolute max-sm:top-0 max-sm:left-0 max-sm:z-50 max-sm:p-0 relative h-screen ${
                openSidebar ? "w-[316px] p-[10px]" : "w-0 p-5 py-[10px]"
            }`}
        >
            <div
                onClick={() => setOpenSidebar(true)}
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    `absolute  left-0 top-[110px] max-sm:left-16 max-sm:top-[11.2px] rounded-full transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary p-2 py-2 h-min  focus-visible:ring-0 cursor-pointer  ${
                        openSidebar ? "hidden" : ""
                    }`,
                )}
            >
                <DoubleArrowRightIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </div>

            <Card
                className={`relative rounded-3xl max-sm:rounded-l-none w-[292px] p-[21px] h-full transition-all duration-500 ease-in-out transform ${
                    openSidebar ? "translate-x-0 opacity-100" : "-translate-x-[200%] opacity-0"
                }`}
            >
                <div
                    onClick={() => setOpenSidebar(false)}
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        `absolute right-0 top-[110px] rounded-full transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary p-2 py-2 h-min translate-x-1/2 focus-visible:ring-0 cursor-pointer ${
                            openSidebar ? "" : "hidden"
                        } `,
                    )}
                >
                    <DoubleArrowLeftIcon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </div>

                <CardContent className="p-0">
                    <div className="space-y-1">
                        <CardTitle className="font-mainhead font-bold text-[20px] leading-none">
                            {workspaceData ? workspaceData.business_name : "Workspace"}
                        </CardTitle>
                        <CardDescription className="text-[13px] leading-none ">
                            Smart decisions start now.
                        </CardDescription>
                    </div>
                    <div className="my-4 space-y-4">
                        <Button
                            onClick={handleAddChat}
                            disabled={isAddingConvo}
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "flex justify-center items-center w-full gap-[8px] focus-visible:ring-0   border-blue-500",
                            )}
                        >
                            <Icons.solarMagicStickLine className="h-4 w-4 text-blue-500" />
                            <span className="text-[13px] text-blue-500">New chat</span>
                        </Button>
                        <Separator className="w-full" />
                        <SearchBox
                            type="text"
                            placeholder="Search a chat…"
                            className="w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="h-[503px] overflow-auto small-scrollbar ">
                        {isConvoLoading ? (
                            <>
                                <div className="space-y-2 opacity-50">
                                    <Skeleton className="w-2/4 h-7 mb-4" />
                                    <Skeleton className="w-full h-7" />
                                    <Skeleton className="w-full h-7" />
                                    <Skeleton className="w-full h-7" />
                                    <Skeleton className="w-full h-7" />
                                    <Skeleton className="w-full h-7" />
                                </div>
                                <div className="space-y-2 mt-4 opacity-50">
                                    <Skeleton className="w-2/4 h-7 mb-4" />

                                    <Skeleton className="w-full h-7" />
                                    <Skeleton className="w-full h-7" />
                                    <Skeleton className="w-full h-7" />
                                    <Skeleton className="w-full h-7" />
                                    <Skeleton className="w-full h-7" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-1">
                                    <div>
                                        <span className="text-muted-foreground text-[10px]">
                                            TODAY
                                        </span>
                                    </div>
                                    {todayConvos.map((chat) => {
                                        return (
                                            <ChatOptionButton
                                                onClick={() => handleConvoClick(chat.id)}
                                                currentConvoId={currentConvoId}
                                                setCurrentConvoId={setCurrentConvoId}
                                                key={chat.id}
                                                chat={chat}
                                                toggleOptions={toggleOptions}
                                                setToggleOptions={setToggleOptions}
                                                rename={rename}
                                                setRename={setRename}
                                            />
                                        );
                                    })}
                                </div>
                                <div>
                                    <div>
                                        <span className="text-muted-foreground text-[10px]">
                                            PREVIOUS 7 DAYS
                                        </span>
                                    </div>
                                    {previousConvos.map((chat) => {
                                        return (
                                            <ChatOptionButton
                                                onClick={() => handleConvoClick(chat.id)}
                                                currentConvoId={currentConvoId}
                                                setCurrentConvoId={setCurrentConvoId}
                                                key={chat.id}
                                                chat={chat}
                                                toggleOptions={toggleOptions}
                                                setToggleOptions={setToggleOptions}
                                                rename={rename}
                                                setRename={setRename}
                                            />
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
