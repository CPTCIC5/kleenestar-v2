import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface RegisterOptionCardProps {
    href: string;
    icon: React.ReactNode;
    text: string;
}

const RegisterOptionCard: React.FC<RegisterOptionCardProps> = ({ href, icon, text }) => (
    <Link href={href}>
        <Card className="rounded-3xl h-52 w-52 sm:h-64 sm:w-64 xl:h-80 xl:w-80 transition-all duration-300 hover:scale-105 bg-card/40 hover:bg-card/60">
            <CardContent className="h-full space-y-5 flex flex-col items-center justify-between p-5 md:p-10">
                {icon}
                <p className="text-center font-medium text-sm sm:text-base">{text}</p>
            </CardContent>
        </Card>
    </Link>
);

export default RegisterOptionCard;
