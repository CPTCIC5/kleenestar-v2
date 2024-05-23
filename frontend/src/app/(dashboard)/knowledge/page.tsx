"use client";

import { cn } from "@/lib/utils";
import { Icons } from "@/assets/icons";
import { AxiosProgressEvent } from "axios";
import { allowedFileTypes } from "@/constants/constants";
import { KnowledgeDataTypes } from "@/lib/types/interfaces";
import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";
import { useUploadKnowledgeFile } from "@/hooks/useUploadKnowledgeFile";
import { useDeleteKnowledgeFile } from "@/hooks/useDeleteKnowledgeFile";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef, useState } from "react";

const Knowledge: React.FC = () => {
    const addRef = useRef<HTMLInputElement | null>(null);
    const [progress, setProgress] = useState(0);
    const { data: knowledgeData = [], isLoading } = useKnowledgeBase();
    const uploadKnowledgeFileMutation = useUploadKnowledgeFile();
    const deleteKnowledgeFileMutation = useDeleteKnowledgeFile();

    const handleAddFile = () => {
        if (addRef.current) {
            addRef.current.click();
        }
    };

    const uploadKnowledgeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target?.files?.[0];

        if (!file) return;

        if (!allowedFileTypes.includes(file.type)) {
            toast.warning("Invalid file type. Please select a PDF, CSV, or DOC file.");
            return;
        }

        const maxSize = 25 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.warning("File is too large, please select a file smaller than 25MB.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name);

        uploadKnowledgeFileMutation.mutate(
            {
                formData,
                onUploadProgressFn: (progressEvent: AxiosProgressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 100),
                    );
                    setProgress(percentCompleted);
                },
            },
            {
                onSuccess: () => {
                    setProgress(0);
                },
            },
        );
    };

    const handleDelete = (id: number) => {
        deleteKnowledgeFileMutation.mutate(id);
    };

    return (
        <div className="flex justify-center p-3 pt-[69px]">
            <div className="max-w-[672px] w-full space-y-5 ">
                <div className="gap-2 flex items-center">
                    <p className="text-[18px] font-mainhead">Knowledge </p>
                    <QuestionMarkCircledIcon className="h-4 w-4" />
                </div>
                <div className="">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-center px-[18px] py-[9px] space-x-2">
                            <p className="text-[15px] max-xl:text-[12px] font-mainhead">
                                Drop a file:
                            </p>
                            <div className="!mt-0 flex-1">
                                {progress === 0 ? (
                                    <p className="text-[11px] max-xl:text-[10px] text-muted-foreground ">
                                        PDF, DOCX, CSV (max 25MB)
                                    </p>
                                ) : (
                                    <div className="max-w-40 w-full">
                                        <Progress value={progress} className={cn("rounded-md")} />
                                    </div>
                                )}
                            </div>
                            <Button
                                onClick={handleAddFile}
                                variant="outline"
                                className=" cursor-pointer flex items-center rounded-xl py-[9px] px-[16px] gap-[8px] !mt-0"
                            >
                                <input
                                    ref={addRef}
                                    className="hidden"
                                    type="file"
                                    name="files"
                                    accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/csv"
                                    onChange={uploadKnowledgeFile}
                                />
                                <Icons.solarGallerySendLine className="w-[20px] h-[20px]" />
                                <span className="text-[16px]">Add</span>
                            </Button>
                        </CardHeader>
                    </Card>
                </div>

                <div className="w-full h-[70vh] overflow-auto scrollbar-hide">
                    <div className="w-full flex flex-wrap justify-center gap-7 ">
                        {knowledgeData.length !== 0 ? (
                            knowledgeData.map((files: KnowledgeDataTypes, index) => {
                                return (
                                    <Card key={index} className="max-w-[200px] w-full">
                                        <CardHeader className="space-y-3 h-full p-4 ">
                                            <div>
                                                <Card>
                                                    <CardHeader className="py-2">
                                                        {files.type === "pdf" ? (
                                                            <Icons.filePdf className="h-full w-full p-3" />
                                                        ) : files.type === "csv" ? (
                                                            <Icons.fileCsv className="h-full w-full p-3" />
                                                        ) : files.type === "docx" ||
                                                          files.type === "doc" ? (
                                                            <Icons.fileDoc className="h-full w-full p-3" />
                                                        ) : (
                                                            <Icons.fileUnknown className="h-full w-full p-3" />
                                                        )}
                                                    </CardHeader>
                                                </Card>
                                            </div>

                                            <div className="space-y-2 h-full flex flex-col justify-between ">
                                                <div className="px-2 bg-muted shadow rounded-md py-1">
                                                    <CardTitle className="text-[15px] break-words">
                                                        {files.title}
                                                    </CardTitle>
                                                </div>
                                                <div className="flex justify-between items-center space-x-2 pl-2">
                                                    <CardDescription className="text-[10px] ">
                                                        {files.createdAt}
                                                    </CardDescription>

                                                    <Button
                                                        onClick={() => {
                                                            handleDelete(files.id);
                                                        }}
                                                        variant={"ghost"}
                                                        className=" h-fit p-1  rounded-full focus-visible:ring-0 ring-0 outline-none border-none"
                                                    >
                                                        <Icons.solarBinLine className="w-5 h-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                );
                            })
                        ) : isLoading ? (
                            <div className="flex w-full justify-center items-center flex-wrap gap-3 ">
                                <div className="flex-col space-y-3">
                                    <Skeleton className="h-[180px] w-[200px] rounded-xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[200px]" />
                                        <Skeleton className="h-4 w-[160px]" />
                                    </div>
                                </div>
                                <div className="flex-col space-y-3">
                                    <Skeleton className="h-[180px] w-[200px] rounded-xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[200px]" />
                                        <Skeleton className="h-4 w-[160px]" />
                                    </div>
                                </div>
                                <div className="flex-col space-y-3">
                                    <Skeleton className="h-[180px] w-[200px] rounded-xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[200px]" />
                                        <Skeleton className="h-4 w-[160px]" />
                                    </div>
                                </div>
                                <div className="flex-col space-y-3">
                                    <Skeleton className="h-[180px] w-[200px] rounded-xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[200px]" />
                                        <Skeleton className="h-4 w-[160px]" />
                                    </div>
                                </div>
                                <div className="flex-col space-y-3">
                                    <Skeleton className="h-[180px] w-[200px] rounded-xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[200px]" />
                                        <Skeleton className="h-4 w-[160px]" />
                                    </div>
                                </div>
                                <div className="flex-col space-y-3">
                                    <Skeleton className="h-[180px] w-[200px] rounded-xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[200px]" />
                                        <Skeleton className="h-4 w-[160px]" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-[300px] w-full">
                                <span className="text-[15px] flex justify-center max-w-[629px] w-full text-center text-muted-foreground">
                                    Knowledge is key, make your assistant smarter and more powerful
                                    with knowledge about your business, competitors, articles,
                                    images, and more.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Knowledge;
