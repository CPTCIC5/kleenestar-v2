import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/assets/icons";
import { useState } from "react";
import { SpinnerGap, ThumbsUp } from "@phosphor-icons/react/dist/ssr";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSendPromptFeedback } from "@/hooks/prompt/useSendPromptFeedback";

interface PromptFeedbackDialogProps {
    promptId: number;
}

export function PromptFeedbackDialog({ promptId }: PromptFeedbackDialogProps) {
    const [promptFeedbackOption, setPromptFeedbackOption] = useState<number>(-1);
    const [promptFeedbackMessage, setPromptFeedbackMessage] = useState<string>("");

    const { mutate: promptFeedbackMutate, isPending: sendPromptFeedbackPending } =
        useSendPromptFeedback();

    const handleSendPromptFeedback = () => {
        promptFeedbackMutate({ promptId: promptId, promptFeedbackOption, promptFeedbackMessage });
        setPromptFeedbackMessage("");
        setPromptFeedbackOption(-1);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline" className="size-7">
                    <ThumbsUp weight="duotone" className="size-4" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </DialogTrigger>
            <DialogContent
                className="w-[calc(100%-0.75rem)] max-w-xl rounded-xl"
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="space-y-1">
                    <DialogTitle className="font-bricolage">
                        Provide additional feedback
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Your feedback is gold and helps us improve.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col w-full h-full space-y-5">
                    <div className="flex flex-wrap gap-3 items-center justify-center">
                        {[
                            "Don't like the style",
                            "Not factually correct",
                            "Being lazy",
                            " Other",
                        ].map((option, index) => (
                            <Button
                                key={index}
                                onClick={() => {
                                    setPromptFeedbackOption(index + 1);
                                }}
                                variant={
                                    promptFeedbackOption === index + 1 ? "default" : "secondary"
                                }
                                size="sm"
                                className=""
                            >
                                {option}
                            </Button>
                        ))}

                        {promptFeedbackOption === -1 && (
                            <div className="text-[0.8rem] font-medium text-destructive w-full text-center sm:text-left">
                                Please select an option
                            </div>
                        )}
                    </div>
                    <div className="space-y-3">
                        <Label>Comment</Label>
                        <Textarea
                            name="promptFeedbackMessage"
                            value={promptFeedbackMessage}
                            maxLength={400}
                            onChange={(e) => setPromptFeedbackMessage(e.target.value)}
                            placeholder="Say something here..."
                            className="resize-none h-28 bg-secondary"
                        />
                        {!promptFeedbackMessage && (
                            <div className="text-[0.8rem] font-medium text-destructive w-full text-center sm:text-left">
                                Please provide a comment
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose
                        type="submit"
                        disabled={promptFeedbackOption === -1 || !promptFeedbackMessage}
                        className={cn(buttonVariants({ variant: "default" }))}
                        onClick={handleSendPromptFeedback}
                    >
                        {sendPromptFeedbackPending && (
                            <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Send feedback
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
