import React, { useState } from "react"
import { DialogContent, DialogHeader } from "@/components/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form"
import { cn } from "../../lib/utils"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

export default function ChatFeedbackForm() {

	const options = [
		"Don't Like the Style",
		 "Not factually correct",
		"Being Lazy",
		 "Other",
    ]
        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setFeedbackMsg(e.target.value)
        }
    	const onSubmit = () => {
            if(selectedOption === 0){
                setErrors("No options selected")
            }else{
                setErrors("")
                console.log({ option : options[selectedOption - 1], message: feedbackMsg})
            }
        }
        const [feedbackMsg, setFeedbackMsg] = useState("")
        const [errors, setErrors] = useState("")
	const [selectedOption, setSelectedOption] = useState(0)
	return (
		<DialogContent className="max-w-[660.61px] w-full">
			<DialogHeader>
				<div className="font-mainhead text-[18px] text-foreground">
					Provide additional feeback
				</div>
				<div className="text-[14px]  ">
					Your feedback is gold and helps us improve.
				</div>
			</DialogHeader>
			<div className="w-full flex-wrap flex-start mx-auto justify-evenly flex max-xl:gap-y-[20px] gap-[10px]">
				<div
					onClick={() => {
						setSelectedOption(1)
					}}
					className={cn(
						selectedOption === 1 ? "bg-foreground text-background" : "border-2",
						"px-[18px] py-[7px] max-xl:px-[10px] max-xl:py-[7px] max-xl:w-full max-xl:max-w-[145px]   whitespace-nowrap cursor-pointer rounded-[10px] text-[14px]"
					)}>
					Don’t like the style
				</div>
				<div
					onClick={() => {
						setSelectedOption(2)
					}}
					className={cn(
						selectedOption === 2 ? "bg-foreground text-background" : "border-2",
						"px-[18px] py-[7px] max-xl:px-[10px] max-xl:py-[7px] max-xl:w-full max-xl:max-w-[145px]   whitespace-nowrap cursor-pointer rounded-[10px] text-[14px]"
					)}>
					Not factually correct
				</div>

				<div
					onClick={() => {
						setSelectedOption(3)
					}}
					className={cn(
						selectedOption === 3 ? "bg-foreground text-background" : "border-2",
						"px-[18px] py-[7px] max-xl:px-[10px] max-xl:py-[7px] max-xl:w-full max-xl:max-w-[145px]   whitespace-nowrap cursor-pointer rounded-[10px] text-[14px]"
					)}>
					Being lazy
				</div>
				<div
					onClick={() => {
						setSelectedOption(4)
					}}
					className={cn(
						selectedOption === 4 ? "bg-foreground text-background" : "border-2",
						"px-[18px] py-[7px] max-xl:px-[10px] max-xl:py-[7px] max-xl:w-full max-xl:max-w-[145px]   whitespace-nowrap cursor-pointer rounded-[10px] text-[14px]"
					)}>
					Other
				</div>
			</div>
			<div className="text-[0.8rem] font-medium text-destructive">{errors}</div>
			<div className="tex-[15px] text-foreground font-medium">Comment</div>
			<Textarea
				name="feedback"
				onChange={handleChange}
				value={feedbackMsg}
				placeholder="Say something here (optional)..."
				className={cn("text-[14px]   resize-none h-[130px]")}
			/>

			<div className="pt-[30.54px] flex justify-end pb-[25px]">
				<Button
					onClick={() => {
						onSubmit()
					}}
					className="px-[18px] py-[11px] max-xl:px-[10px] max-xl:py-[0px] rounded-[10px]">
					Send feedback
				</Button>
			</div>
		</DialogContent>
	)
}
