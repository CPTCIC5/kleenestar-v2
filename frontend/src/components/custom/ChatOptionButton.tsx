import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import {
    BackpackIcon,
    DotsHorizontalIcon,
    Pencil2Icon,
    Share2Icon,
    TrashIcon,
} from "@radix-ui/react-icons";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/custom/CustomDropdown";

interface ChatOptionButtonProps {
    chat: {
        id: number;
        title: string;
        created_at: string;
    };
    toggleOptions: number | null;
    setToggleOptions: React.Dispatch<React.SetStateAction<number | null>>;
    rename: number | null;
    setRename: React.Dispatch<React.SetStateAction<number | null>>;
}

export function ChatOptionButton({
    chat,
    toggleOptions,
    setToggleOptions,
    rename,
    setRename,
}: ChatOptionButtonProps) {
    const handleOptions = (id: number) => {
        if (toggleOptions === id) {
            setToggleOptions(null);
        } else {
            setToggleOptions(id);
        }
    };

    const handleRename = (id: number) => {
        if (rename === id) {
            setRename(null);
        } else {
            setRename(id);
        }
    };

    return (
        <div
            key={chat.id}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                `relative w-full flex justify-start items-center text=[13px] font-medium group ${
                    toggleOptions === chat.id ? "bg-accent text-accent-foreground" : ""
                }`,
            )}
        >
            {rename === chat.id ? (
                <Input
                    type="text"
                    className="w-full p-0 focus-visible:ring-0 border-none outline-none text-muted-foreground pr-5"
                    placeholder="New title"
                    defaultValue={chat.title}
                    autoFocus
                    onBlur={() => setRename(null)} // add the rename api thing also to this
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();

                            setRename(null);
                            // add the rename api thing also to this
                        }
                    }}
                />
            ) : (
                <span className="w-full pr-6 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {chat.title}
                </span>
            )}
            {/* <TryDropDown /> */}

            {/* <Card
                className={`absolute bottom-[10px] right-[10px] z-[100] translate-x-full translate-y-full ${
                    toggleOptions === chat.id ? "block" : "hidden"
                }`}
            >
                <CardContent className="flex flex-col p-0 z-[100]">
                    <Button
                        onClick={() => {
                            handleRename(chat.id);
                            setToggleOptions(null);
                        }}
                        variant="ghost"
                        className="flex justify-start gap-2"
                    >
                        <Pencil2Icon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Rename</span>
                    </Button>
                    <Button variant="ghost" className="flex justify-start gap-2">
                        <BackpackIcon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Add to folder</span>
                    </Button>
                    <Button variant="ghost" className="flex justify-start gap-2">
                        <Share2Icon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Share chat</span>
                    </Button>
                    <Button variant="ghost" className="flex justify-start gap-2">
                        <TrashIcon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Delete</span>
                    </Button>
                </CardContent>
            </Card> */}

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <DotsHorizontalIcon
                        onClick={() => handleOptions(chat.id)}
                        className={`absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 group-hover:block  ${
                            toggleOptions === chat.id ? "block" : "hidden"
                        }`}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full max-w-[166px]">
                    <Button
                        onClick={() => {
                            handleRename(chat.id);
                            setToggleOptions(null);
                        }}
                        variant="ghost"
                        className="flex justify-start gap-2 w-full"
                    >
                        <Pencil2Icon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Rename</span>
                    </Button>
                    <Button variant="ghost" className="flex justify-start gap-2 w-full">
                        <BackpackIcon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Add to folder</span>
                    </Button>
                    <Button variant="ghost" className="flex justify-start gap-2 w-full">
                        <Share2Icon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Share chat</span>
                    </Button>
                    <Button variant="ghost" className="flex justify-start gap-2 w-full">
                        <TrashIcon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Delete</span>
                    </Button>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
