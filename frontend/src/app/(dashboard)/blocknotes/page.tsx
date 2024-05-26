"use client";

import { SearchBox } from "@/components/custom/SearchBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { InfoCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/assets/icons";
import useDebounce from "@/hooks/useDebounce";
import { useBlockNotes } from "@/hooks/useBlocknotes";
import { useDeleteBlockNote } from "@/hooks/useDeleteBlocknotes";
import { convertDateTime } from "@/lib/services/convertDateTime";

interface BlockNoteTypes {
    id: number;
    image: string;
    created_at: string;
    title: string;
}

function BlockNotesPage() {
    const router = useRouter();

    const { data: blockNotes = [], isLoading, isSuccess } = useBlockNotes();
    const { mutate: deleteBlockNote } = useDeleteBlockNote();
    const [currentBlockNotes, setCurrentBlockNotes] = React.useState<BlockNoteTypes[]>(blockNotes);

    const [searchQuery, setSearchQuery] = useState("");
    const debounceValue = useDebounce(searchQuery, 1000);

    React.useEffect(() => {
        handleSearch();
    }, [debounceValue, isSuccess, blockNotes]);

    const handleSearch = async () => {
        if (searchQuery === "") {
            setCurrentBlockNotes(blockNotes);
        } else {
            const filteredBlockNotes = blockNotes.filter((blocknotes: { title: string }) =>
                blocknotes.title.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setCurrentBlockNotes(filteredBlockNotes);
        }
    };

    return (
        <div className="w-full h-screen flex items-start justify-center flex-1 bg-muted/40 max-sm:pt-[65px] pt-[99.5px] p-3">
            <div className="max-w-[912px] w-full flex flex-col">
                <div className="flex gap-2 items-center mb-[16px]">
                    <span className="font-mainhead font-bold text-[18px]">BlockNotes</span>
                    <InfoCircledIcon className="h-[15px] w-[15px]" />
                </div>
                <div className="flex items-center  max-xl:gap-8 justify-between pr-3">
                    <SearchBox
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="Search notebook, or note…"
                        className="max-w-[420px] w-full bg-muted/60"
                    />
                    <Link href={"/create-blocknotes"}>
                        <Button>
                            <div className="flex items-center justify-center gap-[6px]">
                                <PlusCircledIcon className="h-[17px] w-[17px]" />
                                <span className="text-[15px]">Create new</span>
                            </div>
                        </Button>
                    </Link>
                </div>
                <div className="w-full flex max-xl:justify-center justify-center pt-10">
                    {currentBlockNotes?.length === 0 && !isLoading ? (
                        <div className="flex items-center justify-center h-[150px]">
                            <span className="text-[15px] flex justify-center max-w-[629px] w-full text-center text-muted-foreground">
                                Create notes from your chat with AI and share them with your team
                                members to promote productivity and collaboration.
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-[27px] mt-[27px]">
                            {isLoading ? (
                                <div className="flex mx-auto gap-12 flex-wrap max-xl:pl-10  justify-between">
                                    <div className="flex-col space-y-3">
                                        <Skeleton className="h-[150px] w-[150px] rounded-xl" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[250px]" />
                                            <Skeleton className="h-4 w-[150px]" />
                                        </div>
                                    </div>
                                    <div className="flex-col space-y-3">
                                        <Skeleton className="h-[150px] w-[150px] rounded-xl" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[250px]" />
                                            <Skeleton className="h-4 w-[150px]" />
                                        </div>
                                    </div>
                                    <div className="flex-col space-y-3">
                                        <Skeleton className="h-[150px] w-[150px] rounded-xl" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[250px]" />
                                            <Skeleton className="h-4 w-[150px]" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                currentBlockNotes?.map((note: BlockNoteTypes) => {
                                    return (
                                        <Card key={note.id} className="max-w-[206px] w-full">
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center justify-between ">
                                                    <Avatar className="w-[40.44px] h-[40.44px] relative rounded-full">
                                                        <AvatarImage
                                                            className="rounded-full border-2 border-muted"
                                                            alt="blocknote-image"
                                                            src={
                                                                note.image
                                                                    ? `https://twemoji.maxcdn.com/v/latest/svg/${note.image}.svg`
                                                                    : "https://github.com/shadcn.png"
                                                            }
                                                        />
                                                    </Avatar>

                                                    <Button
                                                        onClick={() => deleteBlockNote(note.id)}
                                                        variant={"ghost"}
                                                        className="p-1 rounded-full h-full"
                                                    >
                                                        <Icons.bin className="w-[20px] h-[20px]" />
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-5">
                                                <CardTitle className="text-[15px]">
                                                    {note.title}
                                                </CardTitle>
                                                <CardDescription className="text-[11px]">
                                                    {`Last modified: ${convertDateTime(
                                                        note.created_at,
                                                    )}`}
                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlockNotesPage;
