import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/custom/LoginForm";
import GridBackground from "@/components/ui/background-grid";

const LoginPage: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center flex-1 p-2">
            <Link href="/workspace">
                <Button
                    variant="secondary"
                    className="absolute right-4 top-[34px] md:right-8 max-xs:top-[30px]"
                >
                    Register
                </Button>
            </Link>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
