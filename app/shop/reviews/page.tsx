import ProfileSection from "@/components/section/profile-section";
import ReviewSection from "@/components/section/review-section";
import TestimonialSection from "@/components/section/testimonial-section";
import { prisma } from "@/lib/prisma-client";

export default async function Page() {
    const PlatformReviews = await prisma.platformRating.findMany({
        include: {
            User: true
        }
    })
    return (
        <main>
            <ProfileSection users={PlatformReviews.slice(0, 10)} />
            <ReviewSection />
            <TestimonialSection reviews={PlatformReviews} />
        </main>
    );
}