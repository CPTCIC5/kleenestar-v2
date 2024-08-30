import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTimeFormatOptions } from "intl";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to lowercase the first letter
export const lowercaseFirstLetter = (string: string): string => {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

export const sentenceCase = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const lowerCase = (str: string): string => {
    return str.charAt(0).toLowerCase() + str.slice(1).toLowerCase();
};

export const titleCase = (str: string): string => {
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export function convertDateTime(dateTimeStr: string) {
    const date = new Date(dateTimeStr);
    const options = {
        year: "numeric" as const,
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options as DateTimeFormatOptions).format(date);
}
