import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icons } from "@/assets/icons";
import  CreateWorkspace  from "@/components/custom/CreateWorkspaceForm";

export default function Create(){
    return (
        <div className="flex justify-center items-center w-full h-[100vh]">   
            <CreateWorkspace className=" drop-shadow-2xl w-[34%] max-xl:w-[90%]" />
        </div>
    )
}