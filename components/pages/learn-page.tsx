
import React from 'react';

const LearnPage: React.FC = () => {
    return (
        <div className="min-h-screen p-6 mt-10 bg-[#f3eaee]">
            <h1 className="text-4xl font-bold text-center mb-6">Learn with Us</h1>
            <div className="space-y-8">
                {/* Topic 1 */}
                <div>
                    <h2 className="text-2xl font-semibold">Topic 1: Healthy Eating Tips</h2>
                    <p className="mt-2 text-lg">
                        Learn how to maintain a balanced diet with our expert tips. From understanding nutritional labels to planning your meals, we&apos;ve got you covered.
                    </p>
                </div>

                {/* Topic 2 */}
                <div>
                    <h2 className="text-2xl font-semibold">Topic 2: The Benefits of Organic Foods</h2>
                    <p className="mt-2 text-lg">
                        Discover the advantages of incorporating organic foods into your diet. Learn about their health benefits, sustainability, and why they&apos;re worth the investment.
                    </p>
                </div>

                {/* Topic 3 */}
                <div>
                    <h2 className="text-2xl font-semibold">Topic 3: Understanding Superfoods</h2>
                    <p className="mt-2 text-lg">
                        What makes a superfood super? Explore our guide to understanding the powerful nutrients packed into these foods and how they can boost your health.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LearnPage;
