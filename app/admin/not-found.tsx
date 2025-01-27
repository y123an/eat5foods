import { TriangleAlertIcon } from "lucide-react";
import Link from "next/link";

export default function AccessDeniedPage() {
    return (
        <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-background px-4 md:px-6">
            <div className="mx-auto max-w-md space-y-4 text-center">
                <TriangleAlertIcon className="mx-auto h-12 w-12 text-destructive" />
                <h1 className="text-3xl font-bold">Page not found!</h1>
                <p className="text-muted-foreground">
                    The page you&apos;re looking for doesn&apos;t exist. Check the URL or go back to the homepage.
                </p>
                <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                >
                    Go to safety
                </Link>
            </div>
        </div>
    );
}
