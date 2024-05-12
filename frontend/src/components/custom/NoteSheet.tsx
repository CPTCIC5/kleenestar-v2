import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import NoteSheetCard from "./NoteSheetCard";
import { dummySheetNotesData } from "@/constants/constants";
import { Icons } from "@/assets/icons";

export default function NoteSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="absolute z-10 rounded-ss-[25px] border-2 border-foreground pl-1 py-1 hover:pr-4 transform duration-200 rounded-bl-[25px] w-fit right-0 top-[45%]">
                    <Icons.drag_out className="h-[15px] w-[15px]" />
                </div>
            </SheetTrigger>
            <SheetContent className="px-[15px] h-[100vh]">
                <SheetHeader>
                    <div className="flex gap-[15px] items-center">
                        <div className="text-[16px] text-bold font-mainhead">Notes</div>
                        <QuestionMarkCircledIcon />
                    </div>
                    <hr className="w-2 mt-[17px] mb-[13px]" />
                    <div className=" h-[90vh] pb-10 overflow-auto scrollbar-hide">
                        <div
                            style={{
                                columnCount: 2,
                                columnGap: "1em",
                            }}
                        >
                            {dummySheetNotesData.map((sheetData, index) => {
                                return (
                                    <div
                                        style={{ breakInside: "avoid", marginBottom: "1em" }}
                                        key={index}
                                    >
                                        <NoteSheetCard
                                            name={sheetData.name}
                                            content={sheetData.content}
                                            color={sheetData.color}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* <div className="flex flex-wrap h-[90vh] pb-10 scrollbar-hide gap-4 overflow-auto">
						{dummySheetNotesData.map((sheetData) => {
							return (
								<NoteSheetCard
									name={sheetData.name}
									content={sheetData.content}
									color={sheetData.color}
								/>
							)
						})}
					</div> */}
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
