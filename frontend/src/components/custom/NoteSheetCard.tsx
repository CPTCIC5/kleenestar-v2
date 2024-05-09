import { Card , CardContent, CardHeader} from "@/components/ui/card"
import { cn } from "@/lib/utils"




export default function NoteSheetCard({name, content, color}: {name: string, content: string, color: string}){
    return (
			<Card
				className={cn("h-fit")}
				style={{ backgroundColor: `#${color}` }}>
				<CardHeader className="py-[5px] mx-auto w-fit p-0 ">
					<Card className="py-[7px] max-xl:text-[12px] w-fit px-[8px] my-[10px] rounded-[10px] font-semibold whitespace-nowrap">
						{name}
					</Card>
				</CardHeader>
				<CardContent
					className={cn(
						!color ? "dark:text-foreground" : "dark:text-background",
						"text-foreground",
						"max-xl:px-[10px] max-xl:text-[13px]"
					)}>
					{content}
				</CardContent>
			</Card>
		)
}