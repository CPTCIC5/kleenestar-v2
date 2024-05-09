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

interface FolderOptionButtonProps {
    folder: {
        id: number;
        title: string;
    };
    toggleFolderOptions: number | null;
    setToggleFolderOptions: React.Dispatch<React.SetStateAction<number | null>>;
    folderRename: number | null;
    setFolderRename: React.Dispatch<React.SetStateAction<number | null>>;
    onClick: () => void;
}

export function FolderOptionButton({
    folder,
    toggleFolderOptions,
    setToggleFolderOptions,
    folderRename,
    setFolderRename,
    ...otherProps
}: FolderOptionButtonProps) {
    const handleOptions = (id: number) => {
        if (toggleFolderOptions === id) {
            setToggleFolderOptions(null);
        } else {
            setToggleFolderOptions(id);
        }
    };

    const handleRename = (id: number) => {
        if (folderRename === id) {
            setFolderRename(null);
        } else {
            setFolderRename(id);
        }
    };

    return (
        <div
            key={folder.id}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                `relative w-full flex justify-start items-center text=[13px] font-medium group p-1 ${
                    toggleFolderOptions === folder.id ? "bg-accent text-accent-foreground" : ""
                }`,
            )}
            {...otherProps}
        >
            <BackpackIcon className="h-4 w-4 mr-2" />
            {folderRename === folder.id ? (
                <Input
                    type="text"
                    className="w-full p-0 focus-visible:ring-0 border-none outline-none text-muted-foreground pr-5"
                    placeholder="New title"
                    defaultValue={folder.title}
                    autoFocus
                    onBlur={() => setFolderRename(null)} // add the folderRename api thing also to this
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            setFolderRename(null);
                            // add the folderRename api thing also to this
                        }
                    }}
                />
            ) : (
                <span className="w-full pr-6 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {folder.title}
                </span>
            )}
            {/* <TryDropDown /> */}
            <DotsHorizontalIcon
                onClick={(event) => {
                    handleOptions(folder.id);
                    event.stopPropagation();
                }}
                className={`absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 group-hover:block  ${
                    toggleFolderOptions === folder.id ? "block" : "hidden"
                }`}
            />
            <Card
                className={`absolute bottom-[10px] right-[10px] z-50 translate-x-full translate-y-full ${
                    toggleFolderOptions === folder.id ? "block" : "hidden"
                }`}
            >
                <CardContent className="flex flex-col p-0">
                    <Button
                        onClick={() => {
                            handleRename(folder.id);
                            setToggleFolderOptions(null);
                        }}
                        variant="ghost"
                        className="flex justify-start gap-2"
                    >
                        <Pencil2Icon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Rename</span>
                    </Button>

                    <Button variant="ghost" className="flex justify-start gap-2">
                        <TrashIcon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Delete</span>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
