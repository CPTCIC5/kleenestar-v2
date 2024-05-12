import {
    ArchiveRestore,
    CircleHelp,
    Clipboard,
    ClipboardList,
    ImageUp,
    SendHorizonal,
    SquareMenuIcon,
    ThumbsDown,
    X,
} from "lucide-react";
import { InputPrompt } from "@/constants/dummyChatData";
import * as React from "react";
import { NewChatDisplay } from "./NewChatDisplay";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icons } from "@/assets/icons";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Dialog, DialogTrigger } from "../ui/dialog";
import MakeNotes from "./MakeNotes";
import ChatFeedbackForm from "./ChatFeedbackForm";
import { dummyMarkdownNote } from "@/constants/constants";
import { Card, CardHeader } from "../ui/card";
import { CrossCircledIcon, PaperPlaneIcon, UploadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import useChatStore from "@/lib/store/ConvoStore";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

interface ChatDisplayProps {
    currentConvoId: number;
}

export function ChatDisplay({ currentConvoId }: ChatDisplayProps) {
    const convos = useChatStore((state) => state.convos);
    const inputPrompts = useChatStore((state) => state.inputPrompts);
    const updateInputPrompts = useChatStore((state) => state.updateInputPrompts);
    const setInputPrompts = useChatStore((state) => state.setInputPrompts);
    const [Data, setData] = React.useState(InputPrompt);
    const [uploadedFiles, setUploadedFiles] = React.useState<string | null>(null);
    const [text, setText] = React.useState("");
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleRemoveFile = () => {
        setUploadedFiles(null);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleUploadFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setUploadedFiles(URL.createObjectURL(event.target.files[0]));
        }
    };

    const sendMessage = async () => {
        console.log(text, uploadedFiles);
        const inputText: string = text;
        setText("");
        if (!text) {
            toast.warning("Please enter your message");
            return;
        } else {
            try {
                //creates input prompt in the backend
                inputPrompts.push({
                    id: 0,
                    convo_id: 0,
                    author: "",
                    text_query: inputText,
                    file_query: "",
                    response_text: "thinking...",
                    response_image: "",
                    created_at: "",
                });
                await axios.post(
                    `http://127.0.0.1:8000/api/channels/convos/${currentConvoId}/prompts/create/`,
                    {
                        text_query: inputText,
                        file_query: uploadedFiles,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": Cookies.get("csrftoken"),
                        },
                    },
                );
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/channels/convos/${currentConvoId}/prompts/`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": Cookies.get("csrftoken"),
                        },
                    },
                );
                console.log(response);
                inputPrompts.pop();
                updateInputPrompts(response.data.results);
            } catch (err) {
                console.error(err);
            }
        }
    };

    React.useEffect(() => {
        const updatePrompts = async () => {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/channels/convos/${currentConvoId}/prompts/`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                },
            );
            console.log(response.data.results);
            setInputPrompts(response.data.results);
        };
        updatePrompts();
    }, [currentConvoId, updateInputPrompts]);

    return (
        <div className=" w-full h-full pt-[10px] sm:pt-[69px] flex flex-col relative justify-between flex-1">
            <section className="w-full h-full flex flex-col items-center px-[8px] overflow-auto large-scrollbar">
                <div className="max-w-[670.68px] w-full h-full  ">
                    {inputPrompts.length === 0 ? (
                        <NewChatDisplay />
                    ) : (
                        <div className="w-full flex flex-col justify-center gap-[25px]">
                            {inputPrompts.map((item, index) => {
                                return (
                                    <div key={index} className="flex flex-col gap-[25px]">
                                        <div className="flex items-start gap-[23.68px] pr-[24px]">
                                            <Avatar className="w-[35px] h-[35px] rounded-full ">
                                                <AvatarImage
                                                    className="rounded-full border-2 border-muted"
                                                    src="https://github.com/shadcn.png"
                                                    alt="@shadcn"
                                                />
                                                <AvatarFallback className="flex items-center justify-center">
                                                    N
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className=" text-[16px]">{item?.text_query}</span>
                                        </div>

                                        <div className="bg-background p-[24px] w-full flex items-start gap-[23.68px] rounded-3xl ">
                                            <div>
                                                <Icons.logoDark className="w-[30px] h-[30px]" />
                                            </div>
                                            <div className="space-y-4">
                                                <span className=" text-[16px] leading-[19.5px]">
                                                    <Markdown remarkPlugins={[remarkGfm]}>
                                                        {item?.response_text}
                                                    </Markdown>
                                                </span>
                                                <div className="flex gap-[15px] justify-start items-center">
                                                    <div>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <div
                                                                    className={cn(
                                                                        buttonVariants({
                                                                            variant: "ghost",
                                                                        }),
                                                                        "h-fit p-1",
                                                                    )}
                                                                >
                                                                    <ClipboardList className="w-[18px] h-[18px]" />
                                                                </div>
                                                            </DialogTrigger>
                                                            <MakeNotes note={dummyMarkdownNote} />
                                                        </Dialog>
                                                    </div>
                                                    <div>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <div
                                                                    className={cn(
                                                                        buttonVariants({
                                                                            variant: "ghost",
                                                                        }),
                                                                        "h-fit p-1",
                                                                    )}
                                                                >
                                                                    <ThumbsDown className="w-[18px] h-[18px]" />
                                                                </div>
                                                            </DialogTrigger>
                                                            <ChatFeedbackForm />
                                                        </Dialog>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <div className="w-full flex flex-col gap-[16.39px] items-center p-[16px] pt-[6px]">
                <Card
                    className="relative flex flex-col justify-center item-center max-w-[672px] w-full h-full min-h-[52px]
                "
                >
                    <CardHeader className="p-0">
                        {uploadedFiles && (
                            <div className="px-[15.02px] py-[12.26px] w-[200px] h-[150px] overflow-hidden">
                                <div className="relative w-full h-full">
                                    <img
                                        src={uploadedFiles}
                                        alt="uploaded file"
                                        className="object-cover w-full h-full rounded-2xl"
                                    />
                                    <button
                                        className={cn(
                                            buttonVariants({ variant: "outline" }),
                                            "absolute top-2 right-2 p-0 h-fit rounded-full justify-center items-center flex",
                                        )}
                                        onClick={handleRemoveFile}
                                    >
                                        <CrossCircledIcon className=" w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                        {uploadedFiles && (
                            <div className="pb-3">
                                <Separator className="w-[95%] mx-auto" />
                            </div>
                        )}
                        <div className="flex items-center w-full py-2">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = "auto";
                                    target.style.height = target.scrollHeight + "px";
                                }}
                                rows={1}
                                className="my-0 py-0 w-full px-14  text-[16px] leading-[19.5px] resize-none outline-none overflow-y-auto max-h-[150px] text-muted-foreground bg-inherit small-scrollbar"
                                placeholder="Type here..."
                            />
                        </div>
                        <div
                            onClick={sendMessage}
                            className="absolute bottom-[6px] right-3 flex items-center  p-2 rounded-full  cursor-pointer"
                        >
                            <PaperPlaneIcon className="h-[20px] w-[20px]" />
                        </div>
                        <div className="absolute bottom-[0px] left-4 transform -translate-y-1/2 bg-inherit text-primary-300 flex items-center  cursor-pointer">
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleUploadFileChange}
                                accept="image/*"
                            />
                            <button
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "p-[2px] h-fit",
                                )}
                                onClick={handleUploadClick}
                            >
                                <UploadIcon className=" h-[20px] w-[20px]" />
                            </button>
                        </div>
                    </CardHeader>
                </Card>
                <span className="max-w-[402px] w-full text-[11px]  text-muted-foreground text-center">
                    KleeneStar can make mistakes. Consider checking important information.
                </span>
            </div>
        </div>
    );
}
