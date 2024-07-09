"use client";

import { Icons } from "@/assets/icons";
import { Card, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRef, ChangeEvent, useState } from "react";
import FeedbackForm from "@/components/custom/FeedbackForm";
import { InfoCircledIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";

export default function Feedback() {
    const addRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<string>("");
    const [formData, setFormData] = useState<FormData | null>(null);

    const handleAddImage = () => {
        if (addRef.current) {
            addRef.current.click();
        }
    };

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFile(file.name);
        if (!file) return;

        const formData = new FormData();
        formData.append("attachment", file);
        setFormData(formData);
    };

    return (
        <div className="flex justify-center p-3">
            <div className="max-w-2xl w-full space-y-3">
                <div>
                    <div className="w-full flex items-center space-x-2 font-mainhead text-xl">
                        <span>Support and feedback</span>
                        <InfoCircledIcon className="h-4 w-4" />
                    </div>
                    <CardDescription>
                        fill out the form below to get in touch with our support team.
                    </CardDescription>
                </div>
                <div className="pt-2">
                    <Card className="h-14 flex items-center w-full shadow-none">
                        <div className="flex justify-between gap-5 w-full px-5 max-xl:px-2">
                            <div className="flex gap-2 items-center">
                                <Label className="font-mainhead">Attachment:</Label>
                                <p className="text-[11px] max-xl:text-[10px] text-muted-foreground">
                                    {file ? file : "A screenshot will help a lot."}
                                </p>
                            </div>
                            <Button
                                onClick={handleAddImage}
                                variant="outline"
                                className="cursor-pointer flex items-center justify-center gap-2 bg-muted/40"
                            >
                                <input
                                    ref={addRef}
                                    className="hidden"
                                    type="file"
                                    name="files"
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={handleImageUpload}
                                />
                                <Icons.solarGallerySendLine className="w-4 h-4" />
                                <span>Add</span>
                            </Button>
                        </div>
                    </Card>
                </div>
                <FeedbackForm
                    formData={formData}
                    setFormData={setFormData}
                    setFile={setFile}
                    file={file}
                />
            </div>
        </div>
    );
}
