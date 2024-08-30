import { DashboardSidebar } from "@/components/custom/sidebars/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full min-h-screen h-full">
            <DashboardSidebar />
            <section className="flex w-full h-full min-h-screen pt-14 md:pl-16 md:pt-0">
                {children}
            </section>
        </main>
    );
}
