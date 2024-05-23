import { DateTimeFormatOptions } from "intl";

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
