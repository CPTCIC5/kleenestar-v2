export default function KnowledgeBasePage() {
    return (
        <div className="flex flex-col min-h-screen h-full w-full p-4">
            <nav className="w-full flex pb-4 items-center gap-2">
                <h1 className="text-2xl font-bricolage font-extrabold">Knowledge base</h1>
            </nav>
            <div className="h-full w-full flex flex-[1] items-center justify-center">
                {/* Code from here */}
                <main className="flex min-h-screen h-full w-full flex-col items-center justify-center p-24">
                    <span className="text-secondary text-5xl font-extrabold font-bricolage text-center">
                        Knowledge Base
                    </span>
                </main>
            </div>
        </div>
    );
}
