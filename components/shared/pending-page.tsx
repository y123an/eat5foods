
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiGearFine } from "react-icons/pi";

export default function UnderDevelopmentPage() {

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-center">
            <PiGearFine className="w-24 h-24 text-gray-600 mb-4 animate-spin" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Under Development</h1>
            <p className="text-lg text-gray-600 mb-6">This page is currently under development. Please check back later.</p>
            <Link
                href={'/'}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Go back
            </Link>
        </main>
    );
}
