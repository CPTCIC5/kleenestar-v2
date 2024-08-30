import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";

interface EmojiPickerProps {
    onSelect: (value: string) => void;
}

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
    const { theme } = useTheme();

    return (
        <Picker
            height={320}
            autoFocus
            data={data}
            theme={theme}
            showSkinTones={false}
            maxFrequentRows={0}
            dynamicWidth={true}
            width="100%"
            previewPosition="none"
            navPosition="bottom"
            onEmojiSelect={(emoji: any) => {
                if (!emoji?.native) return;

                onSelect(emoji.native);
            }}
        />
    );
}
