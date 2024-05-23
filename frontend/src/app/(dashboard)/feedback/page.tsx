"use client";

import { useRef, ChangeEvent, useState } from "react";
import { Icons } from "@/assets/icons";

import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";
import FeedbackForm from "@/components/custom/FeedbackForm";
import { Button } from "@/components/ui/button";

export default function Feedback() {
    const addRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState("");
    const [formData, setFormData] = useState<FormData | null>(null);
    const handleAddImage = () => {
        if (addRef.current) {
            addRef.current.click();
        }
    };
    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFile(file.name);
        if (!file) {
            return;
        } else {
            const formData = new FormData();
            formData.append("attachment", file);
            setFormData(formData);
        }
    };
    return (
        <div className="flex justify-center p-3 pt-[69px]">
            <div className="max-w-[672px] w-full space-y-5">
                <div className="gap-2 flex items-center">
                    <p className="text-[18px] font-mainhead">Support and feedback </p>
                    <QuestionMarkCircledIcon className="h-4 w-4" />
                </div>
                <div>
                    <Card className="h-[53.74px] flex items-center w-full">
                        <div className="flex justify-between gap-[20px] w-full px-[20px] max-xl:px-[10px]">
                            <div className="flex gap-2 items-center">
                                <p className="text-[15px]  max-xl:text-[12px] font-mainhead">
                                    Attachment:
                                </p>
                                <p className="text-[11px] max-xl:text-[10px] text-muted-foreground ">
                                    {file ? file : "A screenshot will help a lot."}
                                </p>
                            </div>
                            <Button
                                onClick={handleAddImage}
                                variant="outline"
                                className=" cursor-pointer flex items-center rounded-xl py-[9px] px-[16px] gap-[8px]"
                            >
                                <input
                                    ref={addRef}
                                    className="hidden"
                                    type="file"
                                    name="files"
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={handleImageUpload}
                                />
                                <Icons.solarGallerySendLine className="w-[20px] h-[20px]" />
                                <span className="text-[16px]">Add</span>
                            </Button>
                        </div>
                    </Card>
                </div>
                <FeedbackForm formData={formData as FormData} />
            </div>
        </div>
    );
}
