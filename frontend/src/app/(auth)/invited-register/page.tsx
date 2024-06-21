import Link from "next/link";
import { Button } from "@/components/ui/button";
import GridBackground from "@/components/ui/background-grid";
import { InvitedRegisterForm } from "@/components/custom/InvitedRegisterForm";

const InvitedRegisterPage: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center flex-1 p-2">
            <Link href="/login">
                <Button
                    variant="secondary"
                    className="absolute right-4 top-[34px] md:right-8 max-xs:top-[30px]"
                >
                    Login
                </Button>
            </Link>
            <InvitedRegisterForm />
        </div>
    );
};

export default InvitedRegisterPage;
