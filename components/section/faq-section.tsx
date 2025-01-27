import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSection() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-dark-green">FAQs</h1>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="bg-[#009fa9] text-white p-4 rounded-t-md hover:bg-[#009fa9] transition-colors">
                        What are the different bars you have?
                    </AccordionTrigger>
                    <AccordionContent className="bg-[#009fa9] text-white p-4 rounded-b-md">
                        We have multigrain energy bars, breakfast protein bars, 10g daily protein bars, and 20g protein
                        bars - there&apos;s one for every mood. Looking for a midnight munch? Grab a multigrain energy bar.
                        Skipped breakfast? Our breakfast protein bar&apos;s got your back. 4pm hunger driving you nuts? Have
                        a protein rich snack with our 10g daily protein bar. Looking for a post workout meal? The 20g
                        protein bar will be your bff. They&apos;re available in suuuper yum flavors. Try them all!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="bg-[#009fa9] text-white p-4  rounded-t-md hover:bg-[#009fa9] transition-colors mt-4">
                        Are protein bars for me?
                    </AccordionTrigger>
                    <AccordionContent className="bg-[#009fa9] text-white p-4 rounded-b-md">
                        Protein bars are for everyone :) An average person needs about 54g of protein in a day. Our 10g
                        Protein Bar is the yummiest and easiest way to catch up with your daily protein needs.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="bg-[#009fa9] text-white p-4  rounded-t-md hover:bg-[#009fa9] transition-colors mt-4">
                        Are the bars Gluten Free?
                    </AccordionTrigger>
                    <AccordionContent className="bg-[#009fa9] text-white p-4 rounded-b-md">
                        Our Bars are Gluten-Free, but is made in a shared facility that also processes products that
                        contain gluten. We advice you always read the allergen advice if you&apos;re gluten intolerant.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}