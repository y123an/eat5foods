import { FAQSubmissionForm } from "@/components/forms/faq-form";

export default function Page({ params }: {
    params: { id: string };
}) {
    const id = params.id;
    return (
        <main className="min-h-screen">
            <FAQSubmissionForm productId={id} />
        </main>
    );
}