import { Icons } from "@/assets/icons"
import { Card, CardContent } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"



const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
]
 


export default function Billings() {
	return (
		<div className="w-full max-xl:w-[90%] max-xl:mx-auto flex justify-center my-[100px]">
			<div className="flex-col max-w-[905.87px] w-full">
				<div className="text-[18px] max-xl:text-[13px] pb-[20px] flex gap-[15px] items-center font-mainhead font-bold">
					Plans and billings
					<div>
						<QuestionMarkCircledIcon />
					</div>
				</div>
				<Card className=" flex items-center mb-[25px]  h-[75px]">
					<CardContent className="pl-[24.84px] w-full flex justify-between pr-[30px] py-[15px]">
						<div className="flex-col">
							<div className="text-[15px] max-xl:text-[13px] font-medium font-mainhead">
								Scale plan
							</div>
							<div className="text-[11px]">
								Next billing: 1/4/2024, 12:12:45 PM
							</div>
						</div>
						<div>
							<Card className="px-[18px] items-center flex py-[9px] max-xl:py-[5px] max-xl:px-[10px] gap-[15px]">
								<div>
									<Icons.plan className="max-xl:w-[10px] max-xl:h-[10px]" />
								</div>
								<div className="font-mainhead text-[13px] max-xl:text-[10px] whitespace-nowrap">
									Manage plan
								</div>
							</Card>
						</div>
					</CardContent>
				</Card>
				<Table className="max-w-[905.87px] w-full ">
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Invoice</TableHead>
							<TableHead className="">Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Users</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoices.map((invoice) => (
							<TableRow key={invoice.invoice}>
								<TableCell className="font-medium w-[25%]">
									{invoice.invoice}
								</TableCell>
								<TableCell className="w-[25%]">{invoice.totalAmount}</TableCell>
								<TableCell className="w-[25%]">
									{invoice.paymentStatus}
								</TableCell>
								<TableCell className="w-[25%]">
									{invoice.paymentMethod}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Total</TableCell>
							<TableCell className="text-right">$2,500.00</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	)
}
