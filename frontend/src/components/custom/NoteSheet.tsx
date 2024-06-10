import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { Icons } from "@/assets/icons";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

export default function NotesSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div
                    className={cn(
                        buttonVariants({
                            variant: "ghost",
                        }),
                        "h-fit p-1 cursor-pointer",
                    )}
                >
                    <Icons.solarClipboardLine className="w-6 h-6" />
                </div>
            </SheetTrigger>
            <SheetContent
                side={"right"}
                className="rounded-xl max-sm:rounded-r-none sm:w-[395px] max-w-[395px]  sm:h-[calc(100%-2rem)] sm:right-4 sm:top-4 flex flex-col gap-4 "
                overlayClassName="bg-black/50 backdrop-blur-sm"
            >
                <div className="flex gap-3 item">
                    <SheetTitle className="font-mainhead font-bold text-2xl leading-none">
                        Notes
                    </SheetTitle>
                    <Icons.solarQuestionCircleLine className="w-4 h-4" />
                </div>
                <Separator className="w-full" />

                <div className="columns-1 sm:columns-2 gap-4 space-y-4 overflow-auto scrollbar-thin">
                    <div className="rounded-xl p-4 break-inside-avoid   bg-green-100">
                        <div>
                            I got this insight today concerning our active campaigns, the pattern is
                            ok! We should consider moving forward with A/B testing.
                        </div>
                    </div>
                    <div className="rounded-xl p-4 break-inside-avoid bg-blue-100">
                        <div>
                            I got this insight today concerning our active campaigns, the pattern is
                            ok!
                        </div>
                    </div>
                    <div className="rounded-xl p-4 break-inside-avoid bg-red-100">
                        <div>I got this insight today concerning our active campaigns</div>
                    </div>
                    <div className="rounded-xl p-4 break-inside-avoid bg-green-100">
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
                            repellendus itaque commodi enim officiis vitae nostrum qui quaerat vel
                            magnam maxime, officia dignissimos illo voluptatibus culpa harum
                            accusantium quia, dicta modi pariatur.
                        </div>
                    </div>

                    <div className="rounded-xl p-4 break-inside-avoid bg-yellow-100">
                        <div>
                            I got this insight today concerning our active campaigns, the pattern is
                            ok! We should consider moving forward with A/B testing.
                        </div>
                    </div>
                    <div className="rounded-xl p-4 break-inside-avoid bg-pink-100">
                        <div>
                            I got this insight today concerning our active campaigns, the pattern is
                            ok!
                        </div>
                    </div>
                    <div className="rounded-xl p-4 break-inside-avoid bg-green-100">
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
                            repellendus itaque commodi enim officiis vitae nostrum qui quaerat vel
                            magnam maxime, officia dignissimos illo voluptatibus culpa harum
                            accusantium quia, dicta modi pariatur.
                        </div>
                    </div>
                    <div className="rounded-xl p-4 break-inside-avoid  bg-green-100">
                        <div>
                            I got this insight today concerning our active campaigns, the pattern is
                            ok! We should consider moving forward with A/B testing.
                        </div>
                    </div>
                    <div className="rounded-xl p-4 break-inside-avoid bg-blue-100">
                        <div>
                            I got this insight today concerning our active campaigns, the pattern is
                            ok!
                        </div>
                    </div>
                    <div className="rounded-xl p-4 break-inside-avoid bg-red-100">
                        <div>I got this insight today concerning our active campaigns</div>
                    </div>
                    <div className="rounded-xl p-4 break-inside-avoid bg-green-100">
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
                            repellendus itaque commodi enim officiis vitae nostrum qui quaerat vel
                            magnam maxime, officia dignissimos illo voluptatibus culpa harum
                            accusantium quia, dicta modi pariatur.
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
