"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { convertDateTime } from "@/lib/services/convertDateTime";
import { BlocknoteButtonDropmenu } from "./BlocknoteButtonDropmenu";

interface BlockNoteTypes {
    id: number;
    image: string;
    created_at: string;
    title: string;
}

interface BlocknoteButtonProps {
    blocknote: BlockNoteTypes;
    onClick?: () => void;
}

export function BlocknoteButton({ blocknote, ...otherProps }: BlocknoteButtonProps) {
    const pathname = usePathname();
    const isBlocknoteRoot = pathname === "/blocknotes/";
    const [currentBlocknoteId, setCurrentBlocknoteId] = React.useState<number | null>(null);

    console.log(blocknote, "blocknote");

    // handle the size of button when size is < xlg
    // add css for the selected currentBlocknoteId

    React.useEffect(() => {
        const blocknoteIdMatch = pathname.match(/^\/chat\/(\d+)\/?$/);
        if (!isBlocknoteRoot && blocknoteIdMatch) {
            setCurrentBlocknoteId(parseInt(blocknoteIdMatch[1]));
        }
    }, [pathname, isBlocknoteRoot]);

    return (
        <Card {...otherProps} className="rounded-xd bg-muted/40 cursor-pointer">
            <CardHeader className="p-3 flex flex-row gap-2 items-center">
                <div>
                    <Avatar className="w-10 h-10 rounded-full border-2 border-muted flex items-center justify-center">
                        <AvatarImage
                            alt="blocknote-image"
                            className="w-6 h-6"
                            src={
                                blocknote.image
                                    ? blocknote.image
                                    : "https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/26a0-fe0f.png"
                            }
                        />
                    </Avatar>
                </div>
                <div className="flex-1 !mt-0 ">
                    <div>
                        <span
                            className={`w-full pl-1 overflow-hidden whitespace-nowrap overflow-ellipsis`}
                        >
                            {blocknote.title}
                        </span>
                    </div>
                    <CardDescription className="text-[11px] px-1">
                        {`Last modified: ${convertDateTime(blocknote.created_at)}`}
                    </CardDescription>
                </div>
                <BlocknoteButtonDropmenu blocknoteId={blocknote.id} />
            </CardHeader>
        </Card>
    );
}
