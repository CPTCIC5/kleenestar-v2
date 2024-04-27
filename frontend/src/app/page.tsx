import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            {/* Demo use of shadcn , acertinity ui */}
            <Button>Kleenestar v2</Button>
            <BackgroundBeams />
        </main>
    );
}
