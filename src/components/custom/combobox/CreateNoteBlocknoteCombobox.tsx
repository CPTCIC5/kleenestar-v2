"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface BlocknotesComboboxProps {
    blocknotes: Blocknote[];
    blocknotesComboboOpen: boolean;
    setBlocknotesComboboOpen: React.Dispatch<React.SetStateAction<boolean>>;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function BlocknotesCombobox({
    blocknotes,
    blocknotesComboboOpen,
    setBlocknotesComboboOpen,
    value,
    setValue,
}: BlocknotesComboboxProps) {
    const note = blocknotes.find((blocknote) => String(blocknote.id) === value);

    return (
        <Popover open={blocknotesComboboOpen} onOpenChange={setBlocknotesComboboOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={blocknotesComboboOpen}
                    className="w-44 xs:w-48 justify-between"
                >
                    <div className="flex w-28 xs:w-32">
                        {value ? <span className="mr-2 size-4">{note?.image}</span> : null}
                        {value ? (
                            <span className="text-ellipsis overflow-hidden whitespace-wrap text-xs">
                                {note?.title}
                            </span>
                        ) : (
                            <span className="text-xs">Select blocknote</span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-44 xs:w-48 p-0">
                <Command>
                    <CommandInput className="text-xs" placeholder="Search blocknote" />
                    <CommandList>
                        <CommandEmpty>No blocknote found.</CommandEmpty>
                        <CommandGroup>
                            {blocknotes.map((blocknote) => (
                                <CommandItem
                                    key={blocknote.id}
                                    value={blocknote.title}
                                    onSelect={() => {
                                        setValue(String(blocknote.id));
                                        setBlocknotesComboboOpen(false);
                                    }}
                                >
                                    <span className="mr-2 size-4">{blocknote.image}</span>
                                    <span className="text-ellipsis overflow-hidden whitespace-wrap text-xs">
                                        {blocknote.title}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
