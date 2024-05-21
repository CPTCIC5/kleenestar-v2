import CreateWorkspaceForm from "@/components/custom/CreateWorkspaceForm";
import GridBackground from "@/components/ui/background-grid";

const CreateWorkspace: React.FC = () => {
    return (
        <div className="relative flex items-center justify-center flex-1 bg-background p-2">
            <GridBackground />
            <div className="mx-auto max-w-sm w-full outline-none z-10 rounded-3xl drop-shadow-xl border-none mt-[15px]">
                <CreateWorkspaceForm />
            </div>
        </div>
    );
};

export default CreateWorkspace;
