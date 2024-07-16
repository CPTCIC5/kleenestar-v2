import React, { useRef, useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/assets/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";

interface PromptInputProps {
    onSendMessage: (text: string, file: File | null, fileLink: string | null) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSendMessage }) => {
    const [text, setText] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadedFileLink, setUploadedFileLink] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setUploadedFile(event.target.files[0]);
            setUploadedFileLink(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setUploadedFileLink(null);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (!text) {
            toast.warning("Please enter your message");
            return;
        }
        onSendMessage(text, uploadedFile, uploadedFileLink);
        setText("");
        handleRemoveFile();
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    return (
        <div className="w-full text-base m-auto">
            <div className="mx-auto flex flex-1 gap-3 text-base w-full">
                <div className="w-full">
                    <div className="relative flex h-full max-w-full flex-1 flex-col">
                        <div className="flex w-full items-center">
                            <div className="overflow-hidden flex flex-col w-full flex-grow relative border-2 border-border bg-background text-primary rounded-2xl border-token-border-medium [&:has(textarea:focus)]:border-pop-blue/50 [&:has(textarea:focus)]:shadow-pop-blue">
                                {uploadedFileLink && (
                                    <div className="px-2 md:px-4 pt-2.5 w-full h-full overflow-hidden">
                                        <div className="relative w-14 h-14">
                                            <Image
                                                height={1}
                                                width={1}
                                                src={uploadedFileLink}
                                                alt="uploaded file"
                                                className="object-cover w-14 h-14 rounded-lg"
                                            />
                                            <button
                                                className={cn(
                                                    buttonVariants({ variant: "secondary" }),
                                                    "absolute top-1 right-1 p-0 h-fit rounded-full justify-center items-center flex",
                                                )}
                                                onClick={handleRemoveFile}
                                            >
                                                <Icons.solarCrossLine className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <textarea
                                    id="prompt-textarea"
                                    tabIndex={0}
                                    dir="auto"
                                    rows={1}
                                    placeholder="Ask Kleenestar"
                                    className="m-0 w-full resize-none border-0 h-fit bg-transparent dark:bg-transparent focus-visible:border-none focus-visible:outline-none py-3.5 pr-10 md:py-3.5 md:pr-12 max-h-[25dvh] pl-10 md:pl-[55px] overflow-auto scrollbar-none"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    ref={textareaRef}
                                ></textarea>
                                <div className="absolute bottom-2.5 left-2 md:bottom-2.5 md:left-4">
                                    <div className="flex flex-col">
                                        <input
                                            type="file"
                                            tabIndex={-1}
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleUploadFileChange}
                                            accept="image/*"
                                        />
                                        <Button
                                            onClick={handleUploadClick}
                                            variant="secondary"
                                            type="button"
                                            aria-haspopup="menu"
                                            aria-expanded="false"
                                            data-state="closed"
                                            className="inline-flex items-center justify-center gap-1 text-sm cursor-pointer m-0 h-8 w-8 rounded-sm p-1"
                                        >
                                            <Icons.solarGallerySendLine className="h-6 w-6" />
                                        </Button>
                                    </div>
                                </div>
                                <Button
                                    onClick={sendMessage}
                                    variant="secondary"
                                    className="absolute bottom-2.5 right-2 md:bottom-2.5 md:right-3 h-8 w-8 primary-btn-gradient text-background rounded-sm p-1"
                                >
                                    <span data-state="closed">
                                        <Icons.solarArrowRightLine className="h-6 w-6" />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromptInput;
