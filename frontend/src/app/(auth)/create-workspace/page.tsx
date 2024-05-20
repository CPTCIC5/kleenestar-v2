import CreateWorkspace from "@/components/custom/CreateWorkspaceForm";
import GridBackground from "@/components/ui/background-grid";

export default function Create() {
    return (
        <div className="relative w-full h-full flex items-center justify-center flex-1 bg-background p-2">
            <GridBackground />
            <CreateWorkspace className=" mx-auto max-w-sm w-full outline-none z-10 rounded-3xl drop-shadow-xl border-none mt-[15px]" />
        </div>
    );
}
