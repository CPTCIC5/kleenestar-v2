import {Card, CardContent} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import Image from 'next/image'
import add_image from '../../../assets/images/add_image.png'
import { cn } from '@/lib/utils'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from '@/assets/icons'
import NoteSheet from '@/components/custom/NoteSheet'


export default function ChatLayout({
    children,
}: {
    children: React.ReactNode
}){
    return (
			<div className="w-full h-[100vh] flex items-center justify-center">
				<Sheet>
					<SheetTrigger asChild>
						<div className="absolute z-10 rounded-ss-[25px] border-2 border-foreground pl-1 py-1 hover:pr-4 transform duration-200 rounded-bl-[25px] bg-background text-foreground  dark:text-foreground   w-fit right-0 top-[45%]">
							<Icons.drag_out className="h-[15px] w-[15px]" />
						</div>
					</SheetTrigger>
					<NoteSheet />
				</Sheet>
				{children}
				<div className="w-[100vw] absolute bottom-[5px] max-xl:bottom-[10px] flex-col justify-center">
					<Card className="w-full max-xl:w-[90%] flex items-center mx-auto max-w-[672.08px] rounded-[10px] h-[52px]">
						<div className="flex justify-center items-center w-full px-[23px] gap-4">
							<div className="flex items-center gap-2">
								<Image
									className="w-[20px] dark:filter dark:brightness-0 dark:invert h-[20px] max-xl:w-[15px] max-xl:h-[15px]"
									src={add_image}
									alt={"add_image"}
								/>
								<Input
									className="w-[35rem] max-xl:w-[13rem]  shadow-none  border-none outline-none  focus-visible:ring-0"
									type="text"
									placeholder="Ask anything..."
								/>
							</div>
							<span className="cursor-pointer flex items-center gap-1 text-[12px] dark:text-foreground font-inter">
								<Icons.send className="w-[20px] h-[20px]" />
								SEND
							</span>
						</div>
					</Card>
					<p className="pb-[36px] mx-auto w-[90%]  max-xl:pb-[0px] pt-[16.65px]  text-center text-[11px] text-foreground">
						KleeneStar can make mistakes. Consider checking important
						information.
					</p>
				</div>
			</div>
		)
}