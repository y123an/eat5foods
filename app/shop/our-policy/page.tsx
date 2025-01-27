"use client";

import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function PolicyPage() {
    const policies = [
        {
            title: "Returns and Refunds Policy",
            content: `
        <p>Purchases made from online store of www.eat5foods.com.com cannot be returned after purchase. We offer full-replacement of products that might be damaged in transit. Replacement orders are processed immediately after our customer support team validates the damage via communication over e-mail or phone.</p>
        <p>Replacement Orders and Refunds will be processed only if the query is raised within 30 days of placing the orders. Any queries or concerns beyond 30 days from order confirmation date will not be entertained.</p>
      `
        },
        {
            title: "Cancellation Policy",
            content: `
        <p>Any cancellations can be processed within 24 hours of placing the orders, by writing to us at orders@eat5foods.com.com. Refund for cancelled orders will be processed to the original mode of payment within 5-10 working days.</p>
      `
        },
        {
            title: "Merchandise Store – Return & Exchange Policy",
            content: `
        <p>Fitshit Health Solutions Private Limited's (TWT's) Merchandise Returns and Exchange policy gives you an option to return or exchange any merchandise items purchased from online store of www.eat5foods.com.com for any reason within the specified return/exchange period i.e. 7 (seven) days from the date of delivery of the product.</p>
        <p>Feel free to try on a product but all we ask is that the product remains unused and is preserved in its original condition along with the tags and packaging. In case a Seal Tag is received with the item, ensure that it remains attached and intact with the product to avoid any hassles in the event of a return/exchange.</p>
        <h3>Eligibility for Returns and Exchanges:</h3>
        <ul>
          <li>We accept returns and exchanges within 7 days from the date of delivery.</li>
          <li>To be eligible, merchandise must be in its original condition, unused, unwashed, and with all original tags and packaging intact.</li>
          <li>Certain items, such as personalized or custom-made products and clearance items, may not be eligible for returns or exchanges. Please check the product description for specific details.</li>
        </ul>
        <h3>How to Initiate a Return or Exchange:</h3>
        <p>To initiate a return or exchange, please follow these steps:</p>
        <ol>
          <li>Contact our Customer Love team at listen@eat5foods.com.com to request a Return or Exchange. Please provide your order number and a detailed reason for the return or exchange request along with the picture of the product in case of any defective or damaged or incorrect product is delivered.</li>
          <li>Once you receive a confirmation from us, securely package the merchandise, including all original packaging and documentation.</li>
          <li>The package would be collected from the address of delivery in case of return. If you choose to exchange an item, our delivery representative will deliver the new item to you and simultaneously pick up the original item from you. During pick-up, our delivery agent may do a quality check on the return.</li>
        </ol>
      `
        },
        {
            title: "Privacy Policy",
            content: `
        <h3>Overview</h3>
        <p>This domain name https://eat5foods.com.com/ and its related sub-domains, sites, services, tools (collectively, the "Website") is owned and operated by Fitshit Health Solutions Private Limited. Throughout the Website, the terms "we", "us" and "our" refer to Fitshit Health Solutions Private Limited bearing CIN No U15490MH2019PTC325879 (which expression shall, unless it be repugnant to the context or meaning thereof, be deemed to include its successors, affiliates, and permitted assigns).</p>
        <h3>Types of Information Collected</h3>
        <p><strong>Personal Information:</strong> Personal Information means any information that may be used to identify an individual, including, but not limited to, the first and last names, physical temporary and personal address, telephone number, date of birth, age, gender, e-mail address, or any other contact information.</p>
        <p><strong>Non-Personal Information:</strong> Non-personal information means information that does not specifically identify an individual, but includes information from you, such as your browser type, the URL of the previous websites you visited, your Internet Service Provider (ISP), operating system and your Internet Protocol (IP) address.</p>
        <p><strong>Usage Information:</strong> Usage Information includes without limitation all data and information collected automatically through the Website (or through the third party analytics service providers), by use and access of the Website in the nature of system administrative data, statistical and demographical data, and operational information and data generated by or characterizing use of the Website.</p>
        <h3>Use of Information</h3>
        <p>We use the Information you provide to:</p>
        <ul>
          <li>Manage your account</li>
          <li>Fulfil your requests for the products and services offered on the Website</li>
          <li>Respond to your inquiries about its offerings and the transactions carried out on the Website</li>
          <li>Provide you with information about products and services available on the Website</li>
          <li>Resolve any glitches on the Website including addressing any technical problems</li>
          <li>Improve the services and content on the Website</li>
        </ul>
        <h3>Information Sharing</h3>
        <p>We do not rent, sell, or share Information with other people or with other non-affiliated entities, except with your consent or to provide services you have requested for or under certain circumstances as outlined in our full privacy policy.</p>
        <h3>Contact Information</h3>
        <p>For any questions about this Policy, please contact us at listen@eat5foods.com.com.</p>
      `
        }
    ]

    return (
        <div className="container mx-auto flex flex-col items-center py-16">
            <h1 className="text-3xl font-bold mb-6">Our Policies</h1>
            <div className="flex w-full md:max-w-5xl items-center">
                <div className="w-full">
                    <Accordion className='w-full' type="single" collapsible defaultValue={policies[0].title}>
                        {policies.map((policy) => (
                            <AccordionItem key={policy.title} value={policy.title}>
                                <AccordionTrigger className='min-w-full'>
                                    {policy.title}
                                </AccordionTrigger>
                                <AccordionContent className="w-full">
                                    <div className="policy-content prose prose-sm max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: policy.content }} />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}