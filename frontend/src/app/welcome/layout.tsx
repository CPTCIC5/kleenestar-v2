import React from "react";
import GridBackground from "@/components/ui/background-grid";

export default function WelcomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative max-h-full h-[100vh]">
			<GridBackground />
			{children}
		</div>
	);
}
