import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    BookmarkSimple,
    ChatTeardropText,
    CircleNotch,
    MagicWand,
} from "@phosphor-icons/react/dist/ssr";
import { SearchInput } from "../inputs/SearchInput";
import React from "react";
import { CardDescription, CardTitle, Card, CardFooter } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFetchPrompts } from "@/hooks/prompt/useFetchPrompts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useFetchPromptNotes } from "@/hooks/prompt/useFetchPromptNotes";

interface ChatNotesSheetProps {
    className?: string;
    convoId: number;
}

export function ChatNotesSheet({ className, convoId }: ChatNotesSheetProps) {
    const [isChatNotesSheetOpen, setIsChatNotesSheetOpen] = React.useState<boolean>(false);

    const router = useRouter();
    const { data: promptNotes, isSuccess: fetchPromptNotesSuccess } = useFetchPromptNotes(convoId);

    return (
        <Sheet open={isChatNotesSheetOpen} onOpenChange={setIsChatNotesSheetOpen}>
            <SheetTrigger asChild>
                <Button size="icon" variant="secondary" className="size-9">
                    <BookmarkSimple weight="duotone" className="size-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                overlayClassName="backdrop-blur-sm"
                className={cn(
                    "max-w-96 md:max-w-xl w-full md:h-[calc(100vh-2rem)] md:right-4 md:top-4 rounded-xl rounded-l-none md:rounded-l-xl space-y-4 border border-border",
                    className,
                )}
            >
                <SheetTitle className="text-2xl font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-primary/60 to-primary/95">
                    Notes
                </SheetTitle>
                <Separator className="w-full" />
                <section className="h-[calc(100vh-145px)] w-full overflow-auto">
                    {fetchPromptNotesSuccess ? (
                        promptNotes?.length > 0 ? (
                            <ScrollArea className="w-full h-full max-h-[calc(100vh-145px)]">
                                <ScrollBar orientation="vertical" />
                                <div
                                    className={`h-full w-full rounded-md pr-4  space-y-3  justify-center  columns-1 md:columns-2  gap-4`}
                                >
                                    {promptNotes?.map((note: Note) => {
                                        return (
                                            <div
                                                key={note?.id}
                                                onClick={() =>
                                                    router.push(
                                                        `/dashboard/blocknotes/${note?.blocknote?.id}`,
                                                    )
                                                }
                                                className="break-inside-avoid bg-secondary/30 max-w-2xl rounded-lg p-3 text-sm text-foreground text-balance flex flex-col items-start justify-center gap-3 cursor-pointer"
                                            >
                                                <div className="rounded-full border size-9 flex items-center justify-center">
                                                    <span className="text-xl">
                                                        {note?.blocknote?.image
                                                            ? note?.blocknote?.image
                                                            : "❔"}
                                                    </span>
                                                </div>
                                                <span>{note?.note_text}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center px-10 py-20 bg-secondary rounded-md ">
                                <span className="text-sm text-muted-foreground">
                                    No notes found.
                                </span>
                            </div>
                        )
                    ) : (
                        <div className="w-full rounded-md pr-2  max-h-[calc(100vh-140px)] h-full flex flex-wrap items-center justify-center gap-3">
                            <CircleNotch
                                weight="duotone"
                                className="animate-spin size-8 text-primary"
                            />
                        </div>
                    )}
                </section>
            </SheetContent>
        </Sheet>
    );
}
