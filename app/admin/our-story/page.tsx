
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("@/components/section/why-we-exist-editor"), {
    ssr: false,
});

export default function WhyWeExistPage() {
    return (
        <main className="min-h-screen bg-background">
            <QuillEditor />
        </main>
    )
}