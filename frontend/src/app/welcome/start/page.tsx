import { Icons } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function GetStarted() {
	return (
		<div className="flex-col animate-fade-in-up  w-fit  mx-auto pt-[10%] max-xl:pt-[30%]">
			<Icons.logoDark className=" w-[150px] h-[150px] mx-auto max-xl:w-[50px] max-xl:h-[50px]" />
			<p className="text-5xl  max-xl:text-2xl  text-center font-mainhead font-bold bg-clip-text text-transparent bg-gradient-to-b from-background dark:from-foreground to-neutral-500 dark:to-background-500 py-8">
				Welcome to Kleenestar
			</p>
			<div className="max-xl:text-[14px] px-[15%] font-inter text-background dark:text-foreground text-[18px] text-center">
				<p>
					Kleenestar help you get valuable insights from your marketing
					campaings and grow your marketing business
				</p>
			</div>
			<div className="flex justify-center mt-12">
				<Link href="/welcome/choose">
					<Button
						className={
							(buttonVariants({ variant: "secondary" }),
							cn(
								"bg-background text-foreground dark:bg-foreground dark:text-background max-xl:text-[12px] cursor-pointer max-xl:px-[20px] max-xl:py-[5px] rounded-[2.5rem] text-[20px] px-[40px] py-[25px] bg-gray-700"
							))
						}>
						Get Started
					</Button>
				</Link>
			</div>
		</div>
	)
}
