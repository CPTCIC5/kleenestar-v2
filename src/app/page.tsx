import { BackgroundBeams } from "@/components/ui/background-beams";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <Link
                href="/get-started"
                className={cn(buttonVariants({ variant: "default" }), "z-50")}
            >
                kleenestar-v2
            </Link>
            <BackgroundBeams />
        </main>
    );
}
