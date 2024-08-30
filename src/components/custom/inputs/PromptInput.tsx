import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageSquare, PaperPlaneTilt, XCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";

interface PromptInputProps {
    promptInputText: string;
    promptInputFileUrl: string;
    setPromptInputText: (text: string) => void;
    setPromptInputFile: (file: File | null) => void;
    setPromptInputFileUrl: (url: string) => void;
    handlePromptInputFunction: () => void;
    isDisabled: boolean;
}

export default function PromptInput({
    promptInputText,
    promptInputFileUrl,
    setPromptInputText,
    setPromptInputFile,
    setPromptInputFileUrl,
    handlePromptInputFunction,
    isDisabled,
}: PromptInputProps) {
    const promptInputFileRef = useRef<HTMLInputElement>(null);
    const promptInputTextareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (promptInputTextareaRef.current) {
            promptInputTextareaRef.current.style.height = "auto";
            promptInputTextareaRef.current.style.height = `${promptInputTextareaRef.current.scrollHeight}px`;
        }
    }, [promptInputText]);

    const handlePromptInputFileUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files) {
                const file = event.target.files[0];
                setPromptInputFile(file);
                setPromptInputFileUrl(URL.createObjectURL(file));
            }
        },
        [setPromptInputFile, setPromptInputFileUrl],
    );

    const handlePromptInputFileRemove = useCallback(() => {
        setPromptInputFile(null);
        setPromptInputFileUrl("");

        if (promptInputFileRef.current) {
            promptInputFileRef.current.value = "";
        }
    }, [setPromptInputFile, setPromptInputFileUrl]);

    const onTextareaKeyPress = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handlePromptInputFunction();
            }
        },
        [handlePromptInputFunction],
    );

    return (
        <section className="w-full flex items-center justify-center max-w-7xl">
            <div className="w-full text-base m-auto">
                <div className="mx-auto flex flex-1 gap-3 text-base w-full">
                    <div className="w-full">
                        <div className="relative flex h-full max-w-full flex-1 flex-col">
                            <div className="flex w-full items-center">
                                <div className="overflow-hidden flex flex-col w-full flex-grow relative border-2 border-border bg-background text-muted-foreground rounded-2xl border-token-border-medium [&:has(textarea:focus)]:border-pop-blue/50 [&:has(textarea:focus)]:shadow-pop-blue">
                                    {promptInputFileUrl && (
                                        <div className="px-2 md:px-4 pt-2.5 w-full h-full overflow-hidden">
                                            <div className="relative w-14 h-14">
                                                <Image
                                                    height={1}
                                                    width={1}
                                                    src={promptInputFileUrl}
                                                    alt="uploaded file"
                                                    className="object-cover w-14 h-14 rounded-lg"
                                                />
                                                <button
                                                    className={cn(
                                                        buttonVariants({
                                                            variant: "secondary",
                                                        }),
                                                        "absolute top-1 right-1 p-0 h-fit rounded-full justify-center items-center flex",
                                                    )}
                                                    onClick={handlePromptInputFileRemove}
                                                    disabled={isDisabled}
                                                >
                                                    <XCircle weight="duotone" className="w-4 h-4" />
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
                                        className="m-0 w-full resize-none border-0 h-fit bg-transparent dark:bg-transparent focus-visible:border-none focus-visible:outline-none py-3.5  px-12 md:px-14 max-h-[25dvh]  overflow-auto scrollbar-none"
                                        value={promptInputText}
                                        onChange={(e) => setPromptInputText(e.target.value)}
                                        disabled={isDisabled}
                                        onKeyPress={onTextareaKeyPress}
                                        ref={promptInputTextareaRef}
                                    ></textarea>
                                    <div className="absolute bottom-2.5 left-2 md:bottom-2.5 md:left-4">
                                        <div className="flex flex-col">
                                            <input
                                                type="file"
                                                tabIndex={-1}
                                                ref={promptInputFileRef}
                                                className="hidden"
                                                onChange={handlePromptInputFileUpload}
                                                accept="image/*"
                                            />
                                            <Button
                                                onClick={() => promptInputFileRef.current?.click()}
                                                variant="secondary"
                                                type="button"
                                                disabled={isDisabled}
                                                className="inline-flex items-center justify-center size-8 rounded-sm p-1"
                                            >
                                                <ImageSquare weight="duotone" className="h-6 w-6" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handlePromptInputFunction}
                                        variant="default"
                                        size="icon"
                                        disabled={isDisabled || !promptInputText}
                                        className="absolute bottom-2.5 right-2 md:bottom-2.5 md:right-3 size-8 text-background rounded-sm p-1"
                                    >
                                        <span data-state="closed">
                                            <PaperPlaneTilt weight="duotone" className="h-6 w-6" />
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
