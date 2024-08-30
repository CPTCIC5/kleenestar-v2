import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";

interface SignupOptionCardProps {
    href: string;
    icon: React.ReactNode;
    text: string;
}

export function SignupOptionCard({ href, icon, text }: SignupOptionCardProps) {
    return (
        <Link href={href}>
            <Card className="rounded-3xl h-52 w-52 sm:h-64 sm:w-64 md:h-80 md:w-80 transition-all duration-300 hover:scale-105 bg-card/40 hover:bg-card/60">
                <CardHeader className="h-full space-y-5 flex flex-col items-center justify-between md:p-10">
                    {icon}
                    <p className="text-center font-medium text-sm sm:text-base">{text}</p>
                </CardHeader>
            </Card>
        </Link>
    );
}
