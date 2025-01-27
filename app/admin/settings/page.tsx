
import ProfileComponent from "@/components/pages/profile-page";
import { getCurrentUser } from "@/lib/current-user";
import { generateMetadata } from "@/lib/meta-data";
import { redirect } from "next/navigation";

export default async function AdminSettingPage() {
    const user = await getCurrentUser();
    if (!user) return redirect("/signin");
    return (
        <main>
            <ProfileComponent user={user} />
        </main>
    );
}

export const metadata = generateMetadata({
    title: "Eat5Foods | Admin Setting "
})