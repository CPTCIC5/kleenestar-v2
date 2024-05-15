"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CreateBlocknoteEdit from "@/components/custom/CreateBlocknoteEdit";
import { Input } from "@/components/ui/input";
// import { blocknotes } from "@/constants/constants"
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    ArrowLeftIcon,
    DotsHorizontalIcon,
    ImageIcon,
    InfoCircledIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import * as React from "react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { setErrorMap } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { DateTimeFormatOptions } from "intl";
import { Skeleton } from "@/components/ui/skeleton";

interface BlockNoteTypes {
    id: number;
    image: string;
    created_at: string;
    title: string;
}

export default function CreateBlocknotesPage() {
    const router = useRouter();
    const { theme } = useTheme();
    const [isEditing, setIsEditing] = React.useState<number>(-1);
    console.log(isEditing);
    const [openEmojiPicker, setOpenEmojiPicker] = React.useState<number>(-2);
    const [blockNotes, setBlockNotes] = useState([]);
    const [errors, setErrors] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState<{
        id: string;
        profile: { country: string };
    }>({
        id: "",
        profile: {
            country: "",
        },
    });

    const setEditing = (index: number) => {
        if (isEditing === index) {
            setIsEditing(-2);
        } else setIsEditing(index);
    };
    const [selectedEmoji, setSelectedEmoji] = React.useState(null);
    const [title, setTitle] = React.useState("");
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors("");
        setTitle(e.target?.value);
    };
    console.log(title, selectedEmoji);
    const setEmojiPicker = (index: number) => {
        if (openEmojiPicker === index) {
            setOpenEmojiPicker(-2);
        } else setOpenEmojiPicker(index);
    };
    const validateFields = () => {
        if (!title) {
            setErrors("Give a title to the block note");
            return;
        } else {
            setErrors("");
        }
        if (!selectedEmoji) {
            setErrors("Select a Emoji for the block note");
            return;
        } else {
            setErrors("");
        }
    };
    const fetchBlockNotes = async () => {
        try {
            const response = await axios.get(`/api/channels/blocknotes/`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            });
            console.log(response.data);
            setBlockNotes(response.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch block note details");
        }
        setLoading(false);
    };
    const clearFields = () => {
        setTitle("");
        setSelectedEmoji(null);
    };

    const createNewBlockNote = async () => {
        validateFields();
        if (!errors) {
            try {
                const response = await axios.post(
                    `/api/channels/blocknotes/`,
                    {
                        title: title,
                        image: selectedEmoji,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": Cookies.get("csrftoken"),
                        },
                    },
                );
                console.log(response.data);
                toast.success("Block Note Created Successfully!");
                await fetchBlockNotes();
            } catch (err) {
                console.log(err);
                toast.error("Failed to create Block Note");
            }
            clearFields();
        }
    };
    useEffect(() => {
        const fetchWorkspaceDetails = async () => {
            try {
                const response = await axios.get(`/api/workspaces/`, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                });
                console.log(response);
                setIsLoggedIn(true);
                console.log(isLoggedIn);
                setUserDetails(response.data[0].root_user);
            } catch (err) {
                console.error(err);
                router.push("/");
            }
        };
        fetchWorkspaceDetails();
    }, []);

    useEffect(() => {
        if (!isLoggedIn) return;
        fetchBlockNotes();
    }, [isLoggedIn]);

    return (
        <div className="w-full min-h-screen h-full flex items-start justify-center flex-1 bg-muted/40 pt-[65px] p-3">
            <div className="max-w-[950px] w-full flex flex-col ">
                <div className="mb-[16px]  rounded-full">
                    <div
                        onClick={() => {
                            router.back();
                        }}
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "p-0 rounded-full h-full cursor-pointer",
                        )}
                    >
                        <ArrowLeftIcon className=" p-2 rounded-full cursor-pointer h-[30px] w-[30px]" />
                    </div>
                </div>

                <Card>
                    <CardHeader className="p-3">
                        <div className="flex items-center space-x-2">
                            {selectedEmoji ? (
                                <div
                                    onClick={() => {
                                        setEmojiPicker(-1);
                                    }}
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        "relative p-0  rounded-full border border-muted ",
                                    )}
                                >
                                    <Avatar className="w-[40.44px] h-[40.44px] relative rounded-full">
                                        <AvatarImage
                                            className="rounded-full border-2 border-muted"
                                            alt="blocknote-image"
                                            src={
                                                selectedEmoji
                                                    ? `https://twemoji.maxcdn.com/v/latest/svg/${selectedEmoji}.svg`
                                                    : "https://github.com/shadcn.png"
                                            }
                                        />
                                    </Avatar>
                                    {openEmojiPicker === -1 && (
                                        <div className="absolute left-[32px] top-[35px] z-10">
                                            <Picker
                                                theme={theme === "dark" ? "light" : "dark"}
                                                navPosition={"none"}
                                                previewPosition={"none"}
                                                dynamicWidth={true}
                                                data={data}
                                                onEmojiSelect={(emoji: any) => {
                                                    setErrors("");
                                                    setSelectedEmoji(emoji.unified);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        setEmojiPicker(-1);
                                    }}
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        "relative w-[38px] h-[38px] rounded-full border border-muted p-2",
                                    )}
                                >
                                    <ImageIcon className="h-[20px] w-[20px]" />
                                    {openEmojiPicker === -1 && (
                                        <div className="absolute left-[32px] top-[35px] z-10">
                                            <Picker
                                                theme={theme === "dark" ? "light" : "dark"}
                                                navPosition={"none"}
                                                previewPosition={"none"}
                                                dynamicWidth={true}
                                                data={data}
                                                onEmojiSelect={(emoji: any) => {
                                                    setErrors("");
                                                    setSelectedEmoji(emoji.unified);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <Input
                                type="text"
                                placeholder="Blocknote title…"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                                className="border-none bg-muted focus-visible:ring-0"
                            />
                            <Button
                                disabled={!errors ? false : true}
                                onClick={() => createNewBlockNote()}
                                variant={"ghost"}
                            >
                                Save
                            </Button>
                            {/* <Link
								href="/access"
								className={cn(buttonVariants({ variant: "outline" }))}>
								Give access
							</Link> */}
                        </div>
                    </CardHeader>
                </Card>
                <div>
                    {errors && (
                        <span className=" text-destructive text-[13px] m-4 pl-2"> {errors}</span>
                    )}
                </div>
                {/* <div className="space-y-4 pt-10">
					{loading ? (
						<div className="flex-col mx-auto gap-12  justify-between">
							<div className="flex-col space-y-3">
								<Skeleton className="h-[55px] w-full rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[150px]" />
								</div>
							</div>
							
							<div className="flex-col space-y-3 pt-8">
								<Skeleton className="h-[55px] w-full rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[150px]" />
								</div>
							</div>
						</div>
					) : (
						blockNotes.map((note: BlockNoteTypes) => {
							return (
								<CreateBlocknoteEdit
									fetchBlockNotes={fetchBlockNotes}
									isEditing={isEditing}
									setEditing={setEditing}
									openEmojiPicker={openEmojiPicker}
									setEmojiPicker={setEmojiPicker}
									key={note.id}
									note={note}
								/>
							)
						})
					)}
				</div> */}

                <div className="flex items-center justify-center h-[360px]">
                    <span className="text-[15px] flex justify-center max-w-[629px] w-full text-center text-muted-foreground">
                        Create notes from your chat with AI and share them with your team members to
                        promote productivity and collaboration.
                    </span>
                </div>
            </div>
        </div>
    );
}
