import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ForgotPasswordForm } from "@/components/custom/ForgotPasswordForm";

const ForgotPasswordPage: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center flex-1 p-2">
            <Link href="/login">
                <Button
                    variant="secondary"
                    className="absolute right-4 top-[34px] md:right-8 max-xphone:top-[30px]"
                >
                    Login
                </Button>
            </Link>
            <ForgotPasswordForm />
        </div>
    );
};

export default ForgotPasswordPage;
