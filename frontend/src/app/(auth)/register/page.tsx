import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/components/custom/RegisterForm";

const RegisterPage: React.FC = () => {
    return (
        <div className=" w-full h-full flex items-center justify-center flex-1 p-2">
            <Link href="/login">
                <Button
                    variant="secondary"
                    className="absolute right-4 top-[34px] md:right-8 max-xs:top-[30px]"
                >
                    Login
                </Button>
            </Link>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
