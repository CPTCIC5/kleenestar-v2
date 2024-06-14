"use client";

import { Icons } from "@/assets/icons";
import { BlocknoteButton } from "@/components/custom/BlocknoteButton";
import CreateBlocknoteDialog from "@/components/custom/CreateBlocknoteDialog";
import { SearchBox } from "@/components/custom/SearchBox";
import { Card, CardHeader } from "@/components/ui/card";
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
        // console.log("blockNotes", blocknotesData);
        handleSearch();
    }, [debounceValue, isSuccess, blocknotesData]);

    // make this as a sheet when the size < xlg
    // add createblocknote dialog to create blocknote & attach to create blocknote button
    // edge case where isLoading is done but the blocknotes are empty them what will be done? add some svg to show that there are no blocknotes

    return (
        <div className="w-full h-screen flex-1  bg-muted/40 max-sm:pt-[56px] p-4 xlg:pl-2 flex items-center justify-center gap-5">
            <div className="max-w-md w-full h-full flex-2 hidden xlg:flex flex-col gap-4">
                <div className="w-full h-14 rounded-2xl bg-background py-4 px-5 flex items-center justify-between gap-4">
                    <span className="font-mainhead">Blocknotes</span>
                    <CreateBlocknoteDialog />
                </div>
                <Card className="w-full h-full bg-inherit">
                    <CardHeader className="w-full h-full p-3 space-y-4">
                        <SearchBox
                            type="text"
                            placeholder="Search a blocknote…"
                            className="w-full h-12 rounded-xl bg-background"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {isLoading ? (
                            <div className="w-full h-full rounded-xl bg-background p-3 space-y-3">
                                <Skeleton className="w-full h-16 rounded-xd " />
                                <Skeleton className="w-full h-16 rounded-xd " />
                                <Skeleton className="w-full h-16 rounded-xd " />
                                <Skeleton className="w-full h-16 rounded-xd " />
                                <Skeleton className="w-full h-16 rounded-xd " />
                            </div>
                        ) : (
                            <div className="w-full h-full rounded-xl bg-background p-3 space-y-3">
                                {blocknotes.map((blocknote) => {
                                    return (
                                        <BlocknoteButton key={blocknote.id} blocknote={blocknote} />
                                    );
                                })}
                            </div>
                        )}
                    </CardHeader>
                </Card>
            </div>
            <div className="w-full h-full flex-1 bg-slate-400">{children}</div>
        </div>
    );
}
