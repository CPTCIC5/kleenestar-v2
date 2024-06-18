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
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Icons } from "@/assets/icons";
import { ChangeEvent, useEffect, useState } from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import EmojiPicker from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useCreateBlockNote } from "@/hooks/useCreateBlockNotes";
import { useEditBlockNote } from "@/hooks/useEditBlocknote";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface BlockNoteTypes {
    id: number;
    image: string;
    created_at: string;
    title: string;
}

interface EditBlocknoteDialogProps {
    blocknote: BlockNoteTypes;
}

const EditBlocknoteDialog: React.FC<EditBlocknoteDialogProps> = ({
    blocknote,
}: EditBlocknoteDialogProps) => {
    const { theme } = useTheme();
    const [icon, setIcon] = useState<string | null>(blocknote.image);
    const [blocknoteName, setBlocknoteName] = useState<string>(blocknote.title);
    const [errors, setErrors] = useState<string[]>([]);
    const { mutate: mutateEditBlocknote } = useEditBlockNote();

    const handleBlocknoteNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBlocknoteName(e.target?.value);
    };

    const onSubmit = () => {
        const newErrors = [];

        if (icon === null) newErrors.push("Blocknote icon is required");
        if (blocknoteName === "") newErrors.push("Blocknote name is required");

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        mutateEditBlocknote({ blocknoteId: blocknote.id, title: blocknoteName, image: icon });
        setIcon(null);
        setBlocknoteName("");
        setErrors([]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                    <Icons.solarPen2Line className="mr-2 h-4 w-4" />
                    <span className="">Edit</span>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent
                className="rounded-xl sm:rounded-2xl w-[calc(100%-1.25rem)] max-w-xl max-xs:p-2"
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="mt-4 sm:mt-0 text-left">
                    <DialogTitle className="font-mainhead text-lg">Create Blocknote</DialogTitle>
                    <DialogDescription className="!mt-0">
                        pick a icon and a name for the blocknote
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <div className="space-y-2">
                        <Label className="font-bold">Blocknote icon</Label>
                        <div className="flex flex-col ms:flex-row gap-3 items-start justify-between">
                            <div>
                                <Avatar className="w-16 h-16 rounded-full border-2 border-muted flex items-center justify-center bg-accent">
                                    <AvatarImage
                                        alt="blocknote-image"
                                        className="w-8 h-8"
                                        src={
                                            icon
                                                ? icon
                                                : "https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/26a0-fe0f.png"
                                        }
                                    />
                                </Avatar>
                            </div>
                            <div className="max-w-sm w-full">
                                <EmojiPicker
                                    theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                                    lazyLoadEmojis={true}
                                    style={{
                                        scrollbarWidth: "thin",
                                        width: "100%",
                                        minWidth: "100%",
                                    }}
                                    height={375}
                                    onEmojiClick={(emoji) => setIcon(emoji.imageUrl)}
                                    emojiStyle={EmojiStyle.TWITTER}
                                    previewConfig={{ showPreview: false }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold">Blocknote title</Label>
                        <Input
                            type="text"
                            placeholder="Blocknote title…"
                            name="title"
                            value={blocknoteName}
                            onChange={handleBlocknoteNameChange}
                            className="border-none bg-muted focus-visible:ring-0 "
                        />
                    </div>
                </div>
                {errors.length !== 0 && (
                    <div className="space-y-1">
                        {errors.map((error, index) => {
                            return (
                                <div
                                    key={index}
                                    className="text-[0.8rem] font-medium text-destructive w-full text-center sm:text-left"
                                >
                                    {`*${error}`}
                                </div>
                            );
                        })}
                    </div>
                )}
                <DialogFooter>
                    <DialogClose
                        onClick={onSubmit}
                        type="submit"
                        className="px-6 py-5 rounded-xl"
                        asChild
                    >
                        <Button>Edit</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditBlocknoteDialog;
