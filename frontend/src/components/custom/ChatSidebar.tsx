import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
    BackpackIcon,
    DotsHorizontalIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    MagicWandIcon,
    Pencil2Icon,
    PlusCircledIcon,
    Share2Icon,
    TrashIcon,
} from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import { SearchBox } from "./SearchBox";
import { chatPrevious, chatToday, folders } from "@/constants/constants";
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChatOptionButton } from "./ChatOptionButton";
import { Folder } from "lucide-react";
import { FolderOptionButton } from "./FolderOptionButton";

export function ChatSidebar() {
    const [rename, setRename] = React.useState<number | null>(null);
    const [toggleOptions, setToggleOptions] = React.useState<number | null>(null);
    const [folderRename, setFolderRename] = React.useState<number | null>(null);
    const [toggleFolderOptions, setToggleFolderOptions] = React.useState<number | null>(null);
    const [openFolder, setOpenFolder] = React.useState<Array<number>>([]);

    const handleFolderOptions = (id: number) => {
        if (openFolder.includes(id)) {
            setOpenFolder(openFolder.filter((folder) => folder !== id));
        } else {
            setOpenFolder([...openFolder, id]);
        }
    };

    const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);

    return (
        <div
            className={`max-sm:absolute max-sm:top-0 max-sm:left-0 max-sm:z-50 max-sm:p-0 relative p-3 h-screen ${
                openSidebar ? "w-[316px]" : "w-0"
            }`}
        >
            <div
                onClick={() => setOpenSidebar(true)}
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    `absolute  left-0 top-[110px] max-sm:left-16 max-sm:top-[11.2px] rounded-full transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary p-2 py-2 h-min  focus-visible:ring-0 cursor-pointer  ${
                        openSidebar ? "hidden" : ""
                    }`,
                )}
            >
                <DoubleArrowRightIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </div>

            <Card
                className={`relative rounded-3xl max-sm:rounded-l-none w-[292px] p-[21px] h-full transition-all duration-500 ease-in-out transform ${
                    openSidebar ? "translate-x-0 opacity-100" : "-translate-x-[200%] opacity-0"
                }`}
            >
                <div
                    onClick={() => setOpenSidebar(false)}
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        `absolute right-0 top-[110px] rounded-full transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary p-2 py-2 h-min translate-x-1/2 focus-visible:ring-0 cursor-pointer ${
                            openSidebar ? "" : "hidden"
                        } `,
                    )}
                >
                    <DoubleArrowLeftIcon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </div>

                <CardContent className="p-0">
                    <div>
                        <CardTitle className="font-mainhead font-bold text-[20px] leading-none">
                            Workspace
                        </CardTitle>
                        <CardDescription className="text-[13px] leading-none ">
                            Smart decisions start now.
                        </CardDescription>
                    </div>
                    <div className="my-4 space-y-4">
                        <Button
                            variant="outline"
                            className="flex justify-center items-center w-full gap-[8px] focus-visible:ring-0"
                        >
                            <MagicWandIcon className="h-4 w-4" />
                            <span className="text-[13px]">New chat</span>
                        </Button>
                        <Separator className="w-full" />
                        <SearchBox type="text" placeholder="Search a chat…" className="w-full " />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground text-[10px]">FOLDERS</span>
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    `rounded-full transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary p-0 h-min  focus-visible:ring-0 ml-2 cursor-pointer`,
                                )}
                            >
                                <PlusCircledIcon className="h-4 w-4  text-muted-foreground" />
                                <span className="sr-only">Close</span>
                            </div>
                        </div>
                        <div className="max-h-[144px] overflow-auto small-scrollbar">
                            {folders.map((folder) => {
                                const chats = chatPrevious.filter(
                                    (chat) => chat.folder_id === folder.id,
                                );
                                return (
                                    <div key={folder.id}>
                                        <FolderOptionButton
                                            folder={folder}
                                            toggleFolderOptions={toggleFolderOptions}
                                            setToggleFolderOptions={setToggleFolderOptions}
                                            folderRename={folderRename}
                                            setFolderRename={setFolderRename}
                                            onClick={() => handleFolderOptions(folder.id)}
                                        />
                                        <div
                                            className={`${
                                                openFolder.includes(folder.id) ? "block" : "hidden"
                                            }`}
                                        >
                                            {chats.map((chat) => {
                                                return (
                                                    <ChatOptionButton
                                                        key={chat.id}
                                                        chat={chat}
                                                        toggleOptions={toggleOptions}
                                                        setToggleOptions={setToggleOptions}
                                                        rename={rename}
                                                        setRename={setRename}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="h-[380px] overflow-auto small-scrollbar ">
                        <div>
                            <div>
                                <span className="text-muted-foreground text-[10px]">TODAY</span>
                            </div>
                            {chatToday.map((chat) => {
                                return (
                                    <ChatOptionButton
                                        key={chat.id}
                                        chat={chat}
                                        toggleOptions={toggleOptions}
                                        setToggleOptions={setToggleOptions}
                                        rename={rename}
                                        setRename={setRename}
                                    />
                                );
                            })}
                        </div>
                        <div>
                            <div>
                                <span className="text-muted-foreground text-[10px]">
                                    PREVIOUS 7 DAYS
                                </span>
                            </div>
                            {chatPrevious.map((chat) => {
                                return (
                                    <ChatOptionButton
                                        key={chat.id}
                                        chat={chat}
                                        toggleOptions={toggleOptions}
                                        setToggleOptions={setToggleOptions}
                                        rename={rename}
                                        setRename={setRename}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
