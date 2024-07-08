import { CreateWorkspaceForm } from "@/components/custom/CreateWorkspaceForm";

const NewWorkspacePage: React.FC = () => {
    return (
        <div className="flex items-center justify-center flex-1 p-2">
            <div className="mx-auto max-w-sm w-full outline-none z-10 rounded-3xl drop-shadow-xl border-none mt-[15px]">
                <CreateWorkspaceForm />
            </div>
        </div>
    );
};

export default NewWorkspacePage;
