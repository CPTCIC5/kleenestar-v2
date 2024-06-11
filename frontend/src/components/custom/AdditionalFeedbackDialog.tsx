import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "@/assets/icons";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useAdditionalFeedback } from "@/hooks/useAdditionalFeedback";

interface AdditionalFeedbackDialogProps {
    prompt_id: number;
}

const AdditionalFeedbackDialog: React.FC<AdditionalFeedbackDialogProps> = ({ prompt_id }) => {
    const [option, setOption] = useState<number>(0);
    const [feedbackMsg, setFeedbackMsg] = useState<string>("");
    const [errors, setErrors] = useState<string>("");

    const { mutate: mutateAdditionalFeedback } = useAdditionalFeedback();
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeedbackMsg(e.target.value);
    };

    const onSubmit = () => {
        if (option === 0) {
            setErrors("No options selected");
        } else {
            const data = { option: option, message: feedbackMsg };
            mutateAdditionalFeedback({ id: prompt_id, data: data });
            setErrors("");
            setFeedbackMsg("");
            setOption(0);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={cn(
                        buttonVariants({
                            variant: "outline",
                        }),
                        "h-fit p-1 cursor-pointer",
                    )}
                >
                    <Icons.solarDislikeLine className="w-4 h-4" />
                </div>
            </DialogTrigger>
            <DialogContent
                className="rounded-xl sm:rounded-2xl w-[calc(100%-1.25rem)] max-w-2xl  "
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="mt-4 sm:mt-0">
                    <DialogTitle className="font-mainhead text-lg ">
                        Provide additional feedback
                    </DialogTitle>
                    <DialogDescription>
                        Your feedback is gold and helps us improve.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-3 items-center justify-center ">
                        <Button
                            onClick={() => {
                                setOption(1);
                            }}
                            variant="outline"
                            className={`rounded-xl px-6 py-5 ${
                                option === 1
                                    ? "bg-foreground text-background hover:bg-foreground hover:text-background "
                                    : ""
                            }`}
                        >
                            Don&apos;t like the style
                        </Button>
                        <Button
                            onClick={() => {
                                setOption(2);
                            }}
                            variant="outline"
                            className={`rounded-xl px-6 py-5 ${
                                option === 2
                                    ? "bg-foreground text-background hover:bg-foreground hover:text-background "
                                    : ""
                            }`}
                        >
                            Not factually correct
                        </Button>
                        <Button
                            onClick={() => {
                                setOption(3);
                            }}
                            variant="outline"
                            className={`rounded-xl px-6 py-5 ${
                                option === 3
                                    ? "bg-foreground text-background hover:bg-foreground hover:text-background "
                                    : ""
                            }`}
                        >
                            Being lazy
                        </Button>
                        <Button
                            onClick={() => {
                                setOption(4);
                            }}
                            variant="outline"
                            className={`rounded-xl px-6 py-5 ${
                                option === 4
                                    ? "bg-foreground text-background hover:bg-foreground hover:text-background "
                                    : ""
                            }`}
                        >
                            Other
                        </Button>
                    </div>
                    {errors && (
                        <div className="text-[0.8rem] font-medium text-destructive w-full text-center sm:text-left">
                            {errors}
                        </div>
                    )}
                    <div className="space-y-3">
                        <Label>Comment</Label>
                        <Textarea
                            name="feedback"
                            onChange={handleChange}
                            value={feedbackMsg}
                            placeholder="Say something here (optional)..."
                            className="resize-none h-32 rounded-lg scrollbar-thin"
                            style={{ scrollMarginBlockStart: "1rem" }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit} type="submit" className="px-6 py-5 rounded-xl">
                        Send feedback
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AdditionalFeedbackDialog;
