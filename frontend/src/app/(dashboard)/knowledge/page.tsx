"use client";
import { Icons } from "@/assets/icons";
import { Card } from "@/components/ui/card";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ChangeEvent, DragEventHandler, useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import add_image from "../../../assets/images/add_image.png";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import pdf from "@/assets/images/pdf.png";
import csv from "@/assets/images/csv.png";
import doc from "@/assets/images/docx.png";
import unknown from "@/assets/images/unknown.png";
import { allowedFileTypes } from "@/constants/constants";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DateTimeFormatOptions } from "intl";
interface KnowledgeDataTypes {
    title: string;
    createdAt: string;
    type: string;
    id: number;
}

function Knowledge() {
    const router = useRouter();
    const addRef = useRef<HTMLInputElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [knowledgeData, setKnowledgeData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleAddFile = () => {
        if (addRef.current) {
            addRef.current.click();
        }
    };
    function convertDateTime(dateTimeStr: string) {
        const date = new Date(dateTimeStr);
        const options = {
            year: "numeric" as const,
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        };
        return new Intl.DateTimeFormat("en-US", options as DateTimeFormatOptions).format(date);
    }
    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`/api/channels/knowledgebase/${id}/`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            });
            toast.success("Knowledge file deleted successfully!");
            setLoading(true);
            fetchKnowledgeBase();
        } catch (err) {
            console.log(err);
            toast.error("Unable to delete the knowledge base file");
        }
    };

    const fetchKnowledgeBase = async () => {
        try {
            const response = await axios.get(`/api/channels/knowledgebase/`, {
                withCredentials: true,
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            });
            console.log(response.data);
            const renderedList = response.data.map(
                (files: { title: string; created_at: string; id: number }) => {
                    const fileSplit = files.title.split(".");
                    const type = fileSplit[fileSplit.length - 1];
                    return {
                        title: files.title,
                        type: type,
                        createdAt: convertDateTime(files.created_at),
                        id: files.id,
                    };
                },
            );
            setKnowledgeData(renderedList);
        } catch (err) {
            console.log(err);
            toast.error("Unable to fetch the knowledge base details");
        }
        setLoading(false);
    };

    const uploadKnowledgeFile = async (
        e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
    ) => {
        e.preventDefault();
        const file =
            (e as React.DragEvent<HTMLDivElement>).dataTransfer?.files?.[0] ||
            (e as React.ChangeEvent<HTMLInputElement>).target?.files?.[0];

        //check if file exist
        if (!file) {
            return;
        }
        // check for valid file type
        if (!allowedFileTypes.includes(file.type)) {
            toast.warning("Invalid file type. Please select a PDF, CSV, or DOC file.");
            return;
        }

        // check for valid file size
        const maxSize = 25 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.warning("File is too large, please select a file smaller than 25MB.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name);

        try {
            const response = await axios.post(`/api/channels/knowledgebase/`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 100),
                    );
                    setProgress(percentCompleted);
                },
            });
            setProgress(0);
            fetchKnowledgeBase();
            toast.success("Knowledge added successfully!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to add upload file");
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    useEffect(() => {
        fetchKnowledgeBase();
    }, []);

    return (
        <div className="mx-auto pt-[70.5px] max-w-[692px] max-xl:px-[40px] max-xl:pb-20">
            <div className="gap-[15px] flex items-center">
                <p className="text-[18px] font-mainhead">Knowledge </p>
                <QuestionMarkCircledIcon />
            </div>
            <div className="pt-[20px]">
                <Card className="h-[53.74px] flex items-center w-full">
                    <div className="flex justify-between gap-[20px] w-full mx-auto px-[20px] max-xl:px-[10px]">
                        <div className="flex gap-2 items-center">
                            <p className="text-[15px] whitespace-nowrap  max-xl:text-[12px] font-mainhead">
                                Drop a file:
                            </p>
                            <p className="text-[11px] max-xl:text-[10px] font-normal ">
                                PDF, DOCX, CSV (max 25MB)
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Card
                                onClick={handleAddFile}
                                className="text-[16px] cursor-pointer max-xl:text-[14px] max-xl:px-[12px] max-xl:ml-2 h-[33.56px] px-[18px] gap-[12px] flex items-center"
                            >
                                <input
                                    ref={addRef}
                                    className="hidden"
                                    type="file"
                                    name="files"
                                    accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/csv"
                                    onChange={uploadKnowledgeFile}
                                />
                                <Image
                                    className="w-[20px] dark:filter dark:brightness-0 dark:invert h-[20px] max-xl:w-[15px] max-xl:h-[15px]"
                                    src={add_image}
                                    alt={"add_image"}
                                />
                                <span className="pr-4">Add</span>
                            </Card>
                        </div>
                    </div>
                </Card>
            </div>
            <div>
                {progress !== 0 && (
                    <Progress value={progress} className={cn("h-4 rounded-md my-4")} />
                )}
            </div>
            <div className="pt-[20px] flex flex-wrap gap-[45px] h-full max-h-[70vh] overflow-auto scrollbar-hide">
                {knowledgeData.length !== 0 ? (
                    knowledgeData.map((files: KnowledgeDataTypes, index) => {
                        return (
                            <Card key={index} className="max-w-[320.78px] w-full ">
                                <div className=" px-[24.77px] pb-[18.96px] pt-[22.87px]">
                                    <div className="w-full h-full ">
                                        <AspectRatio className="flex">
                                            <Image
                                                className="rounded-md flex-1 justify-center object-cover p-4"
                                                src={
                                                    files.type === "pdf"
                                                        ? doc
                                                        : files.type === "csv"
                                                        ? csv
                                                        : files.type === "docx" ||
                                                          files.type === "doc"
                                                        ? doc
                                                        : unknown
                                                }
                                                alt="thumbnail"
                                            />
                                        </AspectRatio>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex-col w-[90%]">
                                            <p className="text-[15px] break-words w-[90%] flex-1 font-medium pt-[16px]">
                                                {files.title}
                                            </p>
                                            <p className="pt-[7px] flex-1 text-[12px]">
                                                {files.createdAt || ""}
                                            </p>
                                        </div>
                                        <div
                                            onClick={() => {
                                                handleDelete(files.id);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <Icons.bin />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                ) : loading ? (
                    <div className="flex w-full  justify-between flex-wrap ">
                        <div className="flex-col space-y-3">
                            <Skeleton className="h-[300px] w-[300px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                        <div className="flex-col space-y-3">
                            <Skeleton className="h-[300px] w-[300px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[150px] w-full">
                        <span className="text-[15px] flex justify-center max-w-[629px] w-full text-center text-muted-foreground">
                            Knowledge is key, make your assistant smarter and more powerful with
                            knowledge about your business, competitors, articles, images, and more.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Knowledge;
