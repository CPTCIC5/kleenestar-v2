import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            {/* Demo use of shadcn , acertinity ui */}
            <Link
                href="/get-started"
                className={cn(buttonVariants({ variant: "default" }), "z-50")}
            >
                Kleenestar-v2
            </Link>
            <BackgroundBeams />
        </main>
    );
}
