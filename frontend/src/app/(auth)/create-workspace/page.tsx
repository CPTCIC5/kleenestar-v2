import CreateWorkspaceForm from "@/components/custom/CreateWorkspaceForm";
import GridBackground from "@/components/ui/background-grid";

const CreateWorkspace: React.FC = () => {
    return (
        <div className="flex items-center justify-center flex-1 p-2">
            <div className="mx-auto max-w-sm w-full outline-none z-10 rounded-3xl drop-shadow-xl border-none mt-[15px]">
                <CreateWorkspaceForm className="bg-card/90 rounded-3xl" />
            </div>
        </div>
    );
};

export default CreateWorkspace;
