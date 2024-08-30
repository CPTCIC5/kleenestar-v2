import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "@/assets/markdown-styles.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme/ThemeProvider";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/tanstack/QueryProvider";
import { UiStoreProvider } from "@/providers/stores/UiStoreProvider";
import { ChatStoreProvider } from "@/providers/stores/ChatStoreProvider";
import Script from "next/script";

const fontInter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const fontBricolageGrotesque = Bricolage_Grotesque({
    subsets: ["latin"],
    variable: "--font-bricolage-grotesque",
});

export const metadata: Metadata = {
    title: "Kleenestar",
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
                className={cn(
                    "min-h-screen h-full bg-background font-inter antialiased",
                    fontInter.variable,
                    fontBricolageGrotesque.variable,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryProvider>
                        <UiStoreProvider>
                            <ChatStoreProvider>
                                {children}
                                <Toaster position="bottom-right" richColors closeButton />
                            </ChatStoreProvider>
                        </UiStoreProvider>
                    </QueryProvider>
                </ThemeProvider>

                {/* Google Tag Manager script */}
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-5V1STFY91V"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-5V1STFY91V');
                    `}
                </Script>
            </body>
        </html>
    );
}
