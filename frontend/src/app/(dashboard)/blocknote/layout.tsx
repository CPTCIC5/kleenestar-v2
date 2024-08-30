"use client";

import { Icons } from "@/assets/icons";
import { BlocknoteButton } from "@/components/custom/BlocknoteButton";
import { BlocknotesSheetSidebar } from "@/components/custom/BlocknotesSheetSidebar";
import CreateBlocknoteDialog from "@/components/custom/CreateBlocknoteDialog";
import { SearchBox } from "@/components/custom/SearchBox";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlockNotes } from "@/hooks/useBlocknotes";
import useDebounce from "@/hooks/useDebounce";
import { useDeleteBlockNote } from "@/hooks/useDeleteBlocknotes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BlockNote {
    id: number;
    image: string;
    created_at: string;
    title: string;
}

export default function BlocknotesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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

    // make this as a sheet when the size < laptop

    return (
        <div className="w-full h-screen flex-1  bg-muted/40 max-sm:pt-[72px] p-4 laptop:pl-2 flex items-center justify-center gap-5 flex-col laptop:flex-row">
            <div className="max-w-full laptop:max-w-md w-full h-fit laptop:h-full laptop:flex flex-col gap-4">
                <div className="w-full h-14 rounded-2xl bg-background py-4 px-5 flex items-center justify-between gap-4">
                    <BlocknotesSheetSidebar className="laptop:hidden" />
                    <span className="font-mainhead">Blocknotes</span>
                    <CreateBlocknoteDialog />
                </div>
                <Card className="w-full h-full bg-inherit overflow-hidden max-laptop:hidden">
                    <CardHeader className="w-full h-full p-3 space-y-4 ">
                        <SearchBox
                            type="text"
                            placeholder="Search a blocknote…"
                            className="w-full h-12 rounded-xl bg-background"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {isLoading ? (
                            <div className="w-full h-full rounded-xl bg-background p-3 space-y-3 ">
                                
                            </div>
                        ) : blocknotes.length === 0 ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <CardDescription className="text-center">
                                    There are no blocknotes to show. Create a blocknote using the
                                    button above and add notes to get started.
                                </CardDescription>
                            </div>
                        ) : (
                            <div className="w-full h-full rounded-xl bg-background p-3 space-y-3 overflow-auto scrollbar-thin">
                                {blocknotes.map((blocknote) => {
                                    return (
                                        <BlocknoteButton
                                            key={blocknote.id}
                                            onClick={() =>
                                                router.push(`/blocknote/${blocknote.id}`)
                                            }
                                            blocknote={blocknote}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </CardHeader>
                </Card>
            </div>
            <div className="w-full h-full overflow-auto scrollbar-thin border border-border rounded-2xl p-3">
                {children}
            </div>
        </div>
    );
}
