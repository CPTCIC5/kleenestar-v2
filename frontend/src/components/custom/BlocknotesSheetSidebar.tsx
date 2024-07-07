"use client";

// Don't commit this file needed fixes

import { cn } from "@/lib/utils";
import { Icons } from "@/assets/icons";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

import { SearchBox } from "./SearchBox";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { Convo } from "@/lib/types/interfaces";
import { ChatOptionButton } from "./ChatOptionButton";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import CreateBlocknoteDialog from "./CreateBlocknoteDialog";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { BlocknoteButton } from "./BlocknoteButton";
import { useEffect, useState } from "react";
import { useBlockNotes } from "@/hooks/useBlocknotes";

interface BlockNote {
    id: number;
    image: string;
    created_at: string;
    title: string;
}

export function BlocknotesSheetSidebar({ className }: { className?: string }) {
    const router = useRouter();
    const { data: blocknotesData = [], isLoading, isSuccess } = useBlockNotes();

    const [blocknotes, setBlocknotes] = useState<BlockNote[]>([]);

    const [searchQuery, setSearchQuery] = useState("");
    const debounceValue = useDebounce(searchQuery, 1000);

    const handleSearch = () => {
        const filteredBlocknotes = blocknotesData?.filter((blocknotes: { title: string }) =>
            blocknotes.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setBlocknotes(filteredBlocknotes || []);
    };

    useEffect(() => {
        handleSearch();
    }, [debounceValue, isSuccess, blocknotesData]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div
                    className={cn(
                        buttonVariants({ variant: "secondary" }),
                        `h-fit p-1 cursor-pointer hover:bg-muted-foreground/10`,
                        className,
                    )}
                >
                    <Icons.solarBookmarkFolderLine className="h-7 w-7 bg-transparent" />
                    <span className="sr-only">Close</span>
                </div>
            </SheetTrigger>

            <SheetContent
                side={"left"}
                className={cn(
                    "rounded-xl max-sm:rounded-l-none sm:w-96 max-w-96  sm:h-[calc(100%-2rem)] sm:left-16 sm:top-4 ",
                )}
                overlayClassName="bg-black/50 backdrop-blur-sm"
            >
                <div className="space-y-1">
                    <SheetTitle className="font-mainhead font-bold text-2xl leading-none">
                        Blocknotes
                    </SheetTitle>
                </div>
                <div className="my-4 space-y-4">
                    <SearchBox
                        type="text"
                        placeholder="Search a chat…"
                        className="w-full h-10 rounded-xl bg-background "
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="h-[calc(100vh-176px)] overflow-auto small-scrollbar ">
                    {isLoading ? (
                        <div className="w-full h-full rounded-xl bg-background p-3 space-y-3 ">
                            <Skeleton className="w-full h-16 rounded-xd " />
                            <Skeleton className="w-full h-16 rounded-xd " />
                            <Skeleton className="w-full h-16 rounded-xd " />
                            <Skeleton className="w-full h-16 rounded-xd " />
                            <Skeleton className="w-full h-16 rounded-xd " />
                        </div>
                    ) : blocknotes.length === 0 ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <CardDescription className="text-center">
                                There are no blocknotes to show. Create a blocknote using the button
                                above and add notes to get started.
                            </CardDescription>
                        </div>
                    ) : (
                        <div className="w-full h-full rounded-xl bg-background p-3 space-y-3 overflow-auto scrollbar-thin">
                            {blocknotes.map((blocknote) => {
                                return (
                                    <BlocknoteButton
                                        key={blocknote.id}
                                        onClick={() => router.push(`/blocknote/${blocknote.id}`)}
                                        blocknote={blocknote}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
