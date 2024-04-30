import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icons } from "@/assets/icons";
import { Input } from "@/components/ui/input";

export default function Create(){
    return (
        <div className="flex justify-center items-center w-full h-[100vh]">   
            <Card>
                <CardHeader>
                    <div className="mx-auto">
                    <Icons.logoDark className="h-[30px] w-[30px]" />
                    <p className="text-xl text-black font-bold font-mainhead">Create a new workspace</p>
                    <p className="text-gray-400 underline">What is a workspace?</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="w-[90%] mx-auto">
                        <p>Business Name</p>
                        <Input/>
                        <p>Webiste Url</p>
                        <Input/>
                        <p>Industry</p>
                        <Input/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}