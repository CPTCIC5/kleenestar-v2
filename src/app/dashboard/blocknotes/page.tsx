"use client";

import { BlocknoteCreateDialog } from "@/components/custom/dialogs/BlocknoteCreateDialog";
import { BlocknoteDeleteDialog } from "@/components/custom/dialogs/BlocknoteDeleteDialog";
import { BlocknoteEditDialog } from "@/components/custom/dialogs/BLocknoteEditDialog";
import { SearchInput } from "@/components/custom/inputs/SearchInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchBlocknotes } from "@/hooks/blocknotes/useFetchBlocknotes";
import { convertDateTime } from "@/lib/utils";
import {
    Pause,
    PencilSimple,
    Plus,
    PlusCircle,
    PlusSquare,
    Trash,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export default function BlocknotesPage() {
    const router = useRouter();

    const { data: fetchedBlocknotes = [], isSuccess: fetchBlocknotesSuccess } =
        useFetchBlocknotes();

    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [blocknotes, setBlocknotes] = React.useState<Blocknote[]>([]);
    const [isBlocknoteCreateDialogOpen, setIsBlocknoteCreateDialogOpen] =
        React.useState<boolean>(false);

    React.useEffect(() => {
        if (!fetchBlocknotesSuccess) return;
        const filteredBlocknotes = searchBlocknotes(fetchedBlocknotes, searchTerm);
        setBlocknotes(filteredBlocknotes);
    }, [fetchedBlocknotes, fetchBlocknotesSuccess, searchTerm]);

    const handleSearchTermChange = useDebouncedCallback((newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    }, 300);

    const searchBlocknotes = (
        data: Blocknote[] | null | undefined,
        searchTerm: string,
    ): Blocknote[] => {
        if (!data) return data || [];
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        if (!normalizedSearchTerm) return data;

        const filteredData = data.filter((blocknote: Blocknote) =>
            blocknote.title.toLowerCase().includes(normalizedSearchTerm),
        );

        return filteredData;
    };
    return (
        <React.Fragment>
            <div className="flex flex-col items-center min-h-screen h-full w-full p-4 space-y-4">
                <nav className="w-full flex items-center gap-2">
                    <h1 className="text-2xl font-bricolage font-extrabold">Blocknotes</h1>
                </nav>

                <div className="flex flex-col items-center flex-[1] h-full w-full max-w-4xl space-y-5">
                    <section className="w-full flex items-center justify-between gap-3">
                        <SearchInput
                            name="blocknoteSearch"
                            type="text"
                            placeholder="Search blocknote"
                            onChange={(e) => handleSearchTermChange(e.target.value)}
                        />
                        <Button
                            className="gap-1 items-center"
                            onClick={() => setIsBlocknoteCreateDialogOpen(true)}
                        >
                            <PlusCircle weight="duotone" className="size-6" />
                            Create new
                        </Button>
                    </section>
                    {fetchBlocknotesSuccess ? (
                        blocknotes?.length > 0 ? (
                            <ScrollArea className="w-full h-full">
                                <ScrollBar orientation="vertical" />
                                <div className="w-full rounded-md pr-2  max-h-[calc(100vh-246px)] h-full flex flex-wrap items-center justify-center gap-3">
                                    {blocknotes?.map((blocknote: Blocknote) => {
                                        return (
                                            <Card
                                                key={blocknote.id}
                                                className="w-64 h-fit bg-secondary/40"
                                            >
                                                <CardHeader className="w-full h-full space-y-6 p-4 items-start">
                                                    <div className="w-full flex items-start justify-between">
                                                        <div className="rounded-full border size-16 flex items-center justify-center">
                                                            <span className="text-4xl">
                                                                {blocknote.image
                                                                    ? blocknote.image
                                                                    : "❔"}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-start justify-center space-x-3">
                                                            <BlocknoteEditDialog
                                                                blocknote={blocknote}
                                                            />

                                                            <BlocknoteDeleteDialog
                                                                blocknoteId={blocknote.id}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1 w-full">
                                                        <CardTitle className="w-full text-base font-bricolage font-semibold text-ellipsis overflow-hidden whitespace-wrap">
                                                            {blocknote.title}
                                                        </CardTitle>

                                                        <CardDescription className="w-full text-xs text-muted-foreground  font-bricolage font-thin text-ellipsis overflow-hidden whitespace-nowrap">
                                                            {`Last modified: ${convertDateTime(
                                                                blocknote.created_at,
                                                            )}`}
                                                        </CardDescription>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        ) : (
                            <div className="w-full flex flex-col items-center justify-center px-10 py-20 bg-secondary rounded-md ">
                                <span className="text-sm text-muted-foreground">
                                    No blocknotes found. Click the button above to add a new
                                    blocknote
                                </span>
                            </div>
                        )
                    ) : (
                        <div className="w-full rounded-md pr-2  max-h-[calc(100vh-246px)] h-full flex flex-wrap items-center justify-center gap-3">
                            <Skeleton className="w-52 h-40 rounded-xd " />
                            <Skeleton className="w-52 h-40 rounded-xd " />
                            <Skeleton className="w-52 h-40 rounded-xd " />
                            <Skeleton className="w-52 h-40 rounded-xd " />
                            <Skeleton className="w-52 h-40 rounded-xd " />
                            <Skeleton className="w-52 h-40 rounded-xd " />
                            <Skeleton className="w-52 h-40 rounded-xd " />
                            <Skeleton className="w-52 h-40 rounded-xd " />
                        </div>
                    )}
                </div>
            </div>
            <BlocknoteCreateDialog
                isBlocknoteCreateDialogOpen={isBlocknoteCreateDialogOpen}
                setIsBlocknoteCreateDialogOpen={setIsBlocknoteCreateDialogOpen}
            />
        </React.Fragment>
    );
}
