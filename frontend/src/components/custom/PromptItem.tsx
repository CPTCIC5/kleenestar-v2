import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prompt } from "@/lib/types/interfaces";
import CreateNoteDialog from "@/components/custom/CreateNoteDialog";
import AdditionalFeedbackDialog from "@/components/custom/AdditionalFeedbackDialog";
import PulsatingDots from "@/components/ui/pulsating-dots";
import { Icons } from "@/assets/icons";

interface PromptItemProps {
    prompt: Prompt;
    userData: any;
}

const PromptItem: React.FC<PromptItemProps> = ({ prompt, userData }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="p-6 py-2 max-w-[95%] sm:max-w-[80%] w-fit rounded-2xl font-inter bg-pop-blue/70 bg-opacity-70 self-end">
                <span className="text-sm">{prompt?.text_query}</span>
            </div>

            <div className="space-y-2">
                <div className="markdown-body max-w-[95%] sm:max-w-[80%] w-fit p-6 rounded-2xl ">
                    {prompt?.response_text === "..." ? (
                        <div className="flex gap-4 items-center">
                            <PulsatingDots />
                        </div>
                    ) : (
                        <div>
                            <div className="w-full overflow-auto scrollbar-hide !text-sm">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {prompt?.response_text}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
                {prompt?.response_text !== "..." && (
                    <div className="flex pl-2 gap-2 w-fit justify-start items-center">
                        <CreateNoteDialog
                            prompt_id={prompt?.id}
                            response_text={prompt?.response_text}
                        />
                        <AdditionalFeedbackDialog prompt_id={prompt?.id} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromptItem;
