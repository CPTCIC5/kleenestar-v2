import React from "react"; // Add missing import
import GridBackground from "@/components/ui/background-grid";
import Image from "next/image";
import herobg from "../../assets/images/hero-bg.png";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative   max-h-full h-[100vh]">
			<GridBackground />
			{children}
		</div>
	)
}
