import { AxiosError } from "axios";
import { toast } from "sonner";

interface AxiosErrorResponse {
    data?: Record<string, string[]>;
}

export function toastAxiosError(error: unknown): void {
    if (error instanceof AxiosError) {
        const err = error as AxiosError<AxiosErrorResponse>;
        if (err.response?.data) {
            const errorMessages = err.response.data;

            for (const [field, messages] of Object.entries(errorMessages)) {
                if (Array.isArray(messages)) {
                    messages.forEach((message: string) => toast.error(message));
                } else if (typeof messages === "string") {
                    toast.error(messages);
                }
            }
        } else {
            toast.error("An unexpected error occurred. Please try again.");
        }
    } else {
        console.error("An unexpected non-Axios error occurred:", error);
        toast.error("An unexpected error occurred. Please try again.");
    }
}
