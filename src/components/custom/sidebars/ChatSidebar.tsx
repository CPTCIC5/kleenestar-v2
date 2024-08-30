import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MagicWand } from "@phosphor-icons/react/dist/ssr";
import { SearchInput } from "../inputs/SearchInput";
import React from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { useFetchConvos } from "@/hooks/convo/useFetchConvos";
import { useFetchWorkspace } from "@/hooks/workspace/useFetchWorkspace";
import { useDebouncedCallback } from "use-debounce";
import { ConvoButton } from "../buttons/ConvoButton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/providers/stores/UiStoreProvider";
import { useShallow } from "zustand/react/shallow";

interface ChatSidebarProps {
    className?: string;
}

export function ChatSidebar({ className }: ChatSidebarProps) {
    const { isChatSidebarOpen, setIsChatSidebarOpen, chatSidebarType } = useUiStore(
        useShallow((state) => ({
            isChatSidebarOpen: state.isChatSidebarOpen,
            setIsChatSidebarOpen: state.setIsChatSidebarOpen,
            chatSidebarType: state.chatSidebarType,
        })),
    );

    const router = useRouter();
    const {
        data: convos = [],
        isLoading: fetchConvosLoading,
        isSuccess: fetchConvosSuccess,
        error: convoError,
        refetch: refetchConvos,
    } = useFetchConvos();
    const { data: workspace } = useFetchWorkspace();

    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [todayConvos, setTodayConvos] = React.useState<Convo[]>([]);
    const [previousConvos, setPreviousConvos] = React.useState<Convo[]>([]);

    React.useEffect(() => {
        if (convoError) {
            refetchConvos();
        }
    }, [convoError, refetchConvos]);

    React.useEffect(() => {
        if (!fetchConvosSuccess) return;
        const filteredConvos = searchConvos(convos, searchTerm);
        setTodayConvos(filteredConvos.filter(isTodayConvo));
        setPreviousConvos(filteredConvos.filter(isPreviousConvo));
    }, [convos, fetchConvosSuccess, searchTerm]);

    const handleSearchTermChange = useDebouncedCallback((newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    }, 300);

    const searchConvos = (data: Convo[] | null | undefined, searchTerm: string): Convo[] => {
        if (!data) return data || [];
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        if (!normalizedSearchTerm) return data;

        const filteredData = data.filter((convo: Convo) =>
            convo.title.toLowerCase().includes(normalizedSearchTerm),
        );

        return filteredData;
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

    return chatSidebarType === "sheet" ? (
        <Sheet open={isChatSidebarOpen} onOpenChange={setIsChatSidebarOpen}>
            <SheetContent
                side="left"
                overlayClassName="backdrop-blur-sm"
                className={cn(
                    "max-w-96 md:w-96 md:h-[calc(100vh-2rem)] md:left-4 md:top-4 rounded-xl rounded-l-none md:rounded-l-xl space-y-4 border border-border",
                    className,
                )}
            >
                <section>
                    <SheetTitle className="text-2xl font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-primary/60 to-primary/95">
                        {workspace ? workspace.business_name : "Workspace"}
                    </SheetTitle>
                    <SheetDescription className="text-muted-foreground text-xs">
                        Smart decisions start now.
                    </SheetDescription>
                </section>
                <section className="space-y-3">
                    <Button
                        onClick={() => router.push("/dashboard/chat")}
                        variant="secondary"
                        className="w-full flex items-center gap-4 px-2.5 bg-opacity-40 text-primary border border-primary bg-primary/10 hover:bg-primary/20"
                    >
                        <MagicWand weight="duotone" className="h-6 w-6" />
                        New Chat
                    </Button>
                    <Separator className="w-full" />
                    <SearchInput
                        name="chatSearch"
                        type="text"
                        placeholder="search chat"
                        onChange={(e) => handleSearchTermChange(e.target.value)}
                    />
                </section>
                <section className="h-[calc(100vh-261px)] w-full overflow-auto">
                    {fetchConvosLoading ? (
                        <div className="space-y-3">
                            <Skeleton className="w-2/4 h-9 mb-4" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-2/4 h-9 my-4" />

                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {todayConvos.length > 0 && (
                                <h3 className="text-sm text-muted-foreground font-bold">Todays</h3>
                            )}
                            {todayConvos.map((convo) => {
                                return <ConvoButton key={convo.id} convo={convo} />;
                            })}
                            {previousConvos.length > 0 && (
                                <h3 className="text-sm text-muted-foreground font-bold">
                                    Previous 7 days
                                </h3>
                            )}
                            {previousConvos.map((convo) => {
                                return <ConvoButton key={convo.id} convo={convo} />;
                            })}
                        </div>
                    )}
                </section>
            </SheetContent>
        </Sheet>
    ) : (
        <aside
            className={`max-w-80 w-full h-full p-1 ${
                isChatSidebarOpen ? "hidden md:flex" : "hidden"
            }`}
        >
            <div className="flex flex-col flex-1 w-full h-full rounded-xl space-y-4 border border-border bg-background p-4">
                <section>
                    <CardTitle className="text-2xl font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-primary/60 to-primary/95">
                        {workspace ? workspace.business_name : "Workspace"}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-xs">
                        Smart decisions start now.
                    </CardDescription>
                </section>
                <section className="space-y-3">
                    <Button
                        onClick={() => router.push("/dashboard/chat")}
                        variant="secondary"
                        className="w-full flex items-center gap-4 px-2.5 bg-opacity-40 text-primary border border-primary bg-primary/10 hover:bg-primary/20"
                    >
                        <MagicWand weight="duotone" className="h-6 w-6" />
                        New Chat
                    </Button>
                    <Separator className="w-full" />
                    <SearchInput
                        name="chatSearch"
                        type="text"
                        placeholder="search chat"
                        onChange={(e) => handleSearchTermChange(e.target.value)}
                    />
                </section>
                <section className="h-full w-full overflow-auto">
                    {fetchConvosLoading ? (
                        <div className="space-y-3">
                            <Skeleton className="w-2/4 h-9 mb-4" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-2/4 h-9 my-4" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {todayConvos.length > 0 && (
                                <h3 className="text-sm text-muted-foreground font-bold">Todays</h3>
                            )}
                            {todayConvos.map((convo) => {
                                return (
                                    <ConvoButton
                                        onClick={() => router.push(`/dashboard/chat/${convo.id}`)}
                                        key={convo.id}
                                        convo={convo}
                                    />
                                );
                            })}
                            {previousConvos.length > 0 && (
                                <h3 className="text-sm text-muted-foreground font-bold">
                                    Previous 7 days
                                </h3>
                            )}
                            {previousConvos.map((convo) => {
                                return (
                                    <ConvoButton
                                        onClick={() => router.push(`/dashboard/chat/${convo.id}`)}
                                        key={convo.id}
                                        convo={convo}
                                    />
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </aside>
    );
}
