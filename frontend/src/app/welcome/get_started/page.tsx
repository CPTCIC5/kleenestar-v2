import { Icons } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import Link from "next/link"
export default function GetStarted() {
	return (
			<div className="flex-col   w-fit  mx-auto pt-[10%] max-xs:pt-[20%]">
				<Icons.logoDark className=" w-[150px] h-[150px] mx-auto max-xl:w-[50px] max-xl:h-[50px]" />
				<p className="text-5xl  max-xl:text-2xl  text-center font-mainhead font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-neutral-500 py-8">
					Welcome to Kleenestar
				</p>
				<div className="max-xl:text-[14px] px-[15%] font-inter text-gray-500 text-[18px] text-center">
					<p>
						Kleenestar help you get valuable insights from your marketing
						campaings and grow your marketing business
					</p>
				</div>
				<div className="flex justify-center mt-12">
					<Link href="/welcome/choose_start">
						<Button
							className={
								(buttonVariants({ variant: "secondary" }),
								cn(
									" max-xl:text-[12px] max-xl:px-[20px] max-xl:py-[5px] rounded-3xl text-[20px] px-[40px] py-[25px] bg-gray-700"
								))
							}>
							Get Started
						</Button>
					</Link>
				</div>
			</div>
	)
}
