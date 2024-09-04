"use client";

import { KnowledgeSourceCreateDialog } from "@/components/custom/dialogs/KnowledgeSourceCreateDialog";
import { KnowledgeSourceDeleteDialog } from "@/components/custom/dialogs/KnowledgeSourceDeleteDialog";
import { SearchInput } from "@/components/custom/inputs/SearchInput";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useFetchKnowledgeBase } from "@/hooks/knowledge-base/useFetchKnowledgeBase";
import { convertDateTime } from "@/lib/utils";
import { CircleNotch, PlusCircle } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export default function KnowledgeBasePage() {
    const router = useRouter();

    const { data: fetchedKnowledgeSources = [], isSuccess: fetchKnowledgeBaseSuccess } =
        useFetchKnowledgeBase();

    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [knowledgeSources, setKnowledgeSources] = React.useState<KnowledgeSource[]>([]);
    const [isKnowledgeSourceCreateDialogOpen, setIsKnowledgeSourceCreateDialogOpen] =
        React.useState<boolean>(false);

    React.useEffect(() => {
        if (!fetchKnowledgeBaseSuccess) return;
        const filteredKnowledgeSources = searchKnowledgeBase(fetchedKnowledgeSources, searchTerm);
        setKnowledgeSources(filteredKnowledgeSources);
    }, [fetchedKnowledgeSources, fetchKnowledgeBaseSuccess, searchTerm]);

    const handleSearchTermChange = useDebouncedCallback((newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    }, 300);

    const searchKnowledgeBase = (
        data: KnowledgeSource[] | null | undefined,
        searchTerm: string,
    ): KnowledgeSource[] => {
        if (!data) return data || [];
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        if (!normalizedSearchTerm) return data;

        const filteredData = data.filter((knowledgeSource: KnowledgeSource) =>
            knowledgeSource.text_data.toLowerCase().includes(normalizedSearchTerm),
        );

        return filteredData;
    };
    return (
        <React.Fragment>
            <div className="flex flex-col items-center min-h-screen h-full w-full p-4 space-y-4">
                <nav className="w-full flex items-center gap-2">
                    <h1 className="text-2xl font-bricolage font-extrabold">Knowledge Base</h1>
                </nav>

                <div className="flex flex-col items-center flex-[1] h-full w-full max-w-4xl space-y-5">
                    <section className="w-full flex items-center justify-between gap-3">
                        <SearchInput
                            name="knowledgeBaseSearch"
                            type="text"
                            placeholder="Search knowledge base"
                            onChange={(e) => handleSearchTermChange(e.target.value)}
                        />
                        <Button
                            className="gap-1 items-center"
                            onClick={() => setIsKnowledgeSourceCreateDialogOpen(true)}
                        >
                            <PlusCircle weight="duotone" className="size-6" />
                            Create new
                        </Button>
                    </section>
                    {fetchKnowledgeBaseSuccess ? (
                        knowledgeSources?.length > 0 ? (
                            <ScrollArea className="w-full h-full max-h-[calc(100vh-140px)]">
                                <ScrollBar orientation="vertical" />
                                <div
                                    className={`h-full w-full rounded-md pr-4  space-y-3  justify-center  columns-1 ${
                                        knowledgeSources.length > 1
                                            ? "md:columns-2"
                                            : "flex flex-col items-center"
                                    }  gap-4`}
                                >
                                    {knowledgeSources?.map((knowledgeSource: KnowledgeSource) => {
                                        return (
                                            <Card
                                                key={knowledgeSource?.id}
                                                className="break-inside-avoid bg-secondary/30 max-w-2xl"
                                            >
                                                <CardHeader className="flex-row gap-2 items-center justify-between">
                                                    <CardDescription className="text-xs">
                                                        {knowledgeSource?.created_at &&
                                                            convertDateTime(
                                                                knowledgeSource?.created_at,
                                                            )}
                                                    </CardDescription>
                                                    <KnowledgeSourceDeleteDialog
                                                        knowledgeSourceId={knowledgeSource?.id}
                                                    />
                                                </CardHeader>
                                                <CardFooter className="space-y-4">
                                                    <CardDescription>
                                                        {knowledgeSource?.text_data}
                                                    </CardDescription>
                                                </CardFooter>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        ) : (
                            <div className="w-full flex flex-col items-center justify-center px-10 py-20 bg-secondary rounded-md ">
                                <span className="text-sm text-muted-foreground">
                                    No knowledge sources found.
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
                </div>
            </div>
            <KnowledgeSourceCreateDialog
                isKnowledgeSourceCreateDialogOpen={isKnowledgeSourceCreateDialogOpen}
                setIsKnowledgeSourceCreateDialogOpen={setIsKnowledgeSourceCreateDialogOpen}
            />
        </React.Fragment>
    );
}
