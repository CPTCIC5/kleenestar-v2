import { FeedbackForm } from "@/components/custom/forms/feedback/FeedbackForm";

export default function FeedbackPage() {
    return (
        <div className="flex flex-col min-h-screen h-full w-full p-4">
            <nav className="w-full flex pb-4 items-center gap-2">
                <h1 className="text-2xl font-bricolage font-extrabold">Support & Feedback</h1>
            </nav>
            <div className="h-full w-full flex flex-[1] justify-center">
                <FeedbackForm className="w-full h-fit max-w-4xl" />
            </div>
        </div>
    );
}
