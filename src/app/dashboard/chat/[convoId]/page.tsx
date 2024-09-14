"use client";

import React from "react";
import { useShallow } from "zustand/react/shallow";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PromptInput from "@/components/custom/inputs/PromptInput";
import ChatNavbar from "@/components/custom/navbars/ChatNavbar";
import RotatingDotsLoader from "@/components/ui/rotating-dot-loader";

import { useChatStore } from "@/providers/stores/ChatStoreProvider";
import { useFetchPrompts } from "@/hooks/prompt/useFetchPrompts";
import { useCreatePrompt } from "@/hooks/prompt/useCreatePrompt";
import { useWebSocket } from "@/hooks/socket/useWebSocket";
import { NoteCreateDialog } from "@/components/custom/dialogs/NoteCreateDialog";
import { PromptFeedbackDialog } from "@/components/custom/dialogs/PromptFeedbackDialog";
import { Component as LineCharts } from "@/components/ui/line-charts";
import { Component as BarCharts } from "@/components/ui/bar-charts";
import { Component as PieCharts } from "@/components/ui/pie-charts";
import { PromptChartsDialog } from "@/components/custom/dialogs/ChartnoteCreateDialog";
import { SelectDemo } from "@/components/ui/select-chartType";
import { SpinnerGap, Chat } from "@phosphor-icons/react/dist/ssr"; 
interface ChatPageProps {
    params: {
        convoId: string;
    };
}

export default function ChatPage({ params }: ChatPageProps) {
    const convoId = Number(params.convoId);
    const [showPieChart, setShowPieChart] = useState(false);
    const [showLineChart, setShowLineChart] = useState(false);
    const hasRunOnce = React.useRef(false);

    const {
        setCurrentConvoId,
        initialPromptInputText,
        initialPromptInputFile,
        clearInitialPromptInput,
        promptInputText,
        promptInputFile,
        promptInputFileUrl,
        setPromptInputText,
        setPromptInputFile,
        setPromptInputFileUrl,
        clearPromptInput,
        wordQueue,
        pushInWordQueue,
        clearWordQueue,
    } = useChatStore(
        useShallow((state) => ({
            promptInputText: state.promptInputText,
            promptInputFile: state.promptInputFile,
            promptInputFileUrl: state.promptInputFileUrl,
            setPromptInputText: state.setPromptInputText,
            setPromptInputFile: state.setPromptInputFile,
            setPromptInputFileUrl: state.setPromptInputFileUrl,
            initialPromptInputText: state.initialPromptInputText,
            initialPromptInputFile: state.initialPromptInputFile,
            initialPromptInputFileUrl: state.initialPromptInputFileUrl,
            setInitialPromptInputText: state.setInitialPromptInputText,
            setInitialPromptInputFile: state.setInitialPromptInputFile,
            setInitialPromptInputFileUrl: state.setInitialPromptInputFileUrl,
            clearPromptInput: state.clearPromptInput,
            clearInitialPromptInput: state.clearInitialPromptInput,
            pushInWordQueue: state.pushInWordQueue,
            clearWordQueue: state.clearWordQueue,
            wordQueue: state.wordQueue,
            setCurrentConvoId: state.setCurrentConvoId,
        })),
    );

    const { wsRef, ensureWebSocketConnected } = useWebSocket();

    const { data: prompts } = useFetchPrompts(convoId);
    const {
        mutateAsync: createPromptMutateAsync,
        isSuccess: createPromptSuccess,
        isPending: createPromptPending,
        variables: createPromptVariables,
    } = useCreatePrompt();

    React.useEffect(() => {
        if (hasRunOnce.current && initialPromptInputText) {
            handleCreatePrompt(initialPromptInputText, initialPromptInputFile);
            clearInitialPromptInput();
        } else {
            hasRunOnce.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialPromptInputText]);

    React.useEffect(() => {
        setCurrentConvoId(convoId);
    }, [convoId, setCurrentConvoId]);

    const handleCreatePrompt = async (promptTextQuery: string, promptFileQuery: File | null) => {
        try {
            await ensureWebSocketConnected();
            await createPromptMutateAsync({
                convoId,
                promptTextQuery: promptTextQuery,
                promptFileQuery: promptFileQuery,
            });
            clearWordQueue();
        } catch (error) {
            console.error("create-prompt error:", error);
            clearWordQueue();
            wsRef.current?.close();
        }
    };

    const handleSendChatMessage = async () => {
        if (!promptInputText) {
            toast.error("Please enter your message");
            return;
        }
        handleCreatePrompt(promptInputText, promptInputFile);
        clearPromptInput();
    };

    const togglePieChart = () => {
      setShowPieChart(!showPieChart); // Toggle PieCharts visibility
    };
  
    const toggleLineChart = () => {
      setShowLineChart(!showLineChart); // Toggle LineCharts visibility
    };
    return (
        <div className="flex flex-col items-center w-full h-full p-3">
            <ChatNavbar chatName={prompts?.[0]?.convo?.title} convoId={convoId} />
            <div className="w-full h-full overflow-hidden">
                {/* ENTER THE FURTHER LOGIC HERE */}
                <div className="w-full h-full flex flex-col items-center space-y-1.5 py-4 px-2">
                    <ScrollArea className="flex flex-col w-full h-full">
                        <ScrollBar orientation="vertical" />
                        <div className="w-full flex flex-col items-center justify-center gap-6 p-4">
                            <div className="max-w-7xl w-full flex flex-col justify-center gap-6 p-4">
                                {prompts?.map((prompt: Prompt) => (
                                    <div key={prompt.id} className="flex flex-col gap-6">
                                        <div className="w-fit bg-primary text-primary-foreground self-end text-sm max-w-[90%] xs:max-w-[70%] rounded-3xl px-5 py-2.5 ">
                                            {prompt?.text_query}
                                        </div>

                                        <div className=" w-fit h-fit px-5 py-4 max-w-[90%] xs:max-w-[70%] rounded-3xl bg-secondary/50 space-y-3">
                                            <div className="w-full markdown-styles !text-sm">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {prompt?.response_text}
                                                </ReactMarkdown>
                                            </div>
                                            <div className="flex items-center justify-start gap-2">
                                                <NoteCreateDialog
                                                    promptId={prompt.id}
                                                    responseTextQuery={prompt?.response_text}
                                                />
                                                <PromptFeedbackDialog promptId={prompt.id} />
                                                <div onClick={togglePieChart}>
                                                <Chat weight="duotone" className="size-4" /> 
                                                </div>
                                                {/* {showPieChart && (
                                                  <div className="flex flex-col">
                                                    <div className="flex">
                                                      <PieCharts chart_data={prompt.chart_data} />
                                                    </div>
                                                    <div className="flex">
                                                      <BarCharts chart_data={prompt.chart_data} />
                                                    </div>
                                                    <div className="flex">
                                                    <LineCharts chart_data={prompt.chart_data} />
                                                    </div>
                                                  </div>
                                                )} */}
                                                <SelectDemo chart_data={prompt.chart_data} />
                                            </div>
                                            {prompt?.similar_questions?.length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="text-sm font-medium mb-2">Similar Questions:</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {prompt.similar_questions.map((question, index) => (
                                                            <button
                                                                key={index}
                                                                className="text-sm px-3 py-1 bg-secondary/50 hover:bg-secondary/70 rounded-full transition-colors"
                                                                onClick={() => {
                                                                    setPromptInputText(question);
                                                                    setTimeout(() => {
                                                                        handleSendChatMessage();
                                                                    }, 100);
                                                                }}
                                                            >
                                                                {question}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {createPromptPending && !createPromptSuccess && (
                                    <div className="flex flex-col gap-6">
                                        <div className="w-fit bg-primary text-primary-foreground self-end text-sm max-w-[90%] xs:max-w-[70%] rounded-3xl px-5 py-2.5 ">
                                            {createPromptVariables?.promptTextQuery}
                                        </div>

                                        {wordQueue.length <= 0 ? (
                                            <RotatingDotsLoader />
                                        ) : (
                                            <div className=" w-fit h-fit px-5 py-6 max-w-[90%] xs:max-w-[70%] rounded-3xl bg-secondary/50  ">
                                                <div className="w-full markdown-styles !text-sm">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {wordQueue.join("")}
                                                    </ReactMarkdown>
                                                </div>
                                                <RotatingDotsLoader />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollArea>

                    <PromptInput
                        promptInputText={promptInputText}
                        promptInputFileUrl={promptInputFileUrl}
                        setPromptInputText={setPromptInputText}
                        setPromptInputFile={setPromptInputFile}
                        setPromptInputFileUrl={setPromptInputFileUrl}
                        handlePromptInputFunction={handleSendChatMessage}
                        isDisabled={createPromptPending}
                    />
                </div>
            </div>
        </div>
    );
}
