import type { Metadata } from "next";
import { Inter, Montserrat, Syne } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/lib/theme-provider/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const fontInter = Inter({
    subsets: ["latin"],
    variable: "--",
});

const fontMontserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});

const fontSyne = Syne({
    subsets: ["latin"],
    weight: ["700"],
    variable: "--font-syne",
});

export const metadata: Metadata = {
    title: "Kleenestar v2",
    description: "Empower your Marketing with Cutting-edge AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={
                    (cn("min-h-screen h-full bg-background  antialiased"),
                    fontInter.variable,
                    fontMontserrat.variable,
                    fontSyne.variable)
                }
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster expand={true} position="bottom-right" richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}
