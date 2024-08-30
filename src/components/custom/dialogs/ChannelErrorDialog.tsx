import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { SealWarning } from "@phosphor-icons/react/dist/ssr";
import { useSearchParams } from "next/navigation";
import React from "react";

export interface ChannelErrorDialogProps {}

export function ChannelErrorDialog({}: ChannelErrorDialogProps) {
    const searchParams = useSearchParams();
    const channelError = searchParams.get("error");
    const [channelErrorDialogOpen, setChannelErrorDialogOpen] = React.useState<boolean>(
        !!channelError,
    );
    return (
        <Dialog open={channelErrorDialogOpen} onOpenChange={setChannelErrorDialogOpen}>
            <DialogContent
                className="max-w-96 w-[calc(100%-1.25rem)] p-4 rounded-xl"
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-base font-bricolage">Channel Error</DialogTitle>
                    <DialogDescription className="text-xs"></DialogDescription>
                    <div className="flex flex-col items-center justify-center p-10 bg-destructive/20 text-destructive rounded-md gap-5">
                        <SealWarning weight="duotone" className="size-14 text-destructive" />
                        <span className="text-center text-balance">{channelError}</span>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
