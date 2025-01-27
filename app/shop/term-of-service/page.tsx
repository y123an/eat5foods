"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";





export default function TermsOfService() {

  const sections = [
    {
      title: "Overview",
      content: `
        <p>The domain name https://eat5foods.com/ and its related sub-domains, sites, services, tools (collectively, the "Website") is owned and operated by Fitshit Health Solutions Private Limited. Throughout the Website, the terms "we", "us" and "our" refer to Fitshit Health Solutions Private Limited, bearing CIN No U15490MH2019PTC325879 (which expression shall, unless it be repugnant to the context or meaning thereof, be deemed to include its successors, affiliates, and permitted assigns).</p>
        <p>By visiting our Website and/or purchasing any product listed on the Website, through the Website, you engage in our services provided via the Website ("Service") and agree to be bound by the following terms and conditions ("Terms of Service" or "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink.</p>
      `
    },
    {
      title: "Eligibility",
      content: `
        <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this Website.</p>
        <p>We reserve the right to terminate any person's membership and/or refuse to provide such person with access to the Website if it is brought to our notice or if we discover that you are not eligible to use the Website.</p>
      `
    },
    {
      title: "General Conditions",
      content: `
        <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
        <p>You understand that your content (not including credit/debit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit/Debit card information is always encrypted during transfer over networks.</p>
        <p>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the Website through which the Service is provided, without express written permission by us.</p>
      `
    },
    {
      title: "Products or Service",
      content: `
        <p>Certain products or services may be available exclusively online through the Website. These products or services may have limited quantities and are subject to return or exchange only according to our Returns and Refunds Policy.</p>
        <p>We have made every effort to display as accurately as possible the colours and images of our products that appear on the Website. We cannot guarantee that your computer monitor's display of any colour will be accurate.</p>
        <p>We reserve the right but are not obligated, to limit the sales of our products or Service to any person, geographic region or jurisdiction. We may also discontinue any or all of the products and Service provided on the Website, as we may deem fit.</p>
      `
    },
    {
      title: "Subscription Plan and Payment Terms",
      content: `
        <p>In addition to being able to purchase products from the Website, you may also purchase Products on a subscription plan. The users shall have the ability to purchase the Products on a monthly or fortnightly subscription or in such other manner as may be decided by us and notified to you from time to time ("Subscription").</p>
        <p>All amounts are payable and charged for monthly or fortnightly Subscriptions or as per our payment cycle, at the beginning of the Subscription. Each such Subscription renews automatically for an additional period equal in length to the expiring Subscription term until you cancel it, using the Payment Information you have provided.</p>
      `
    },
    {
      title: "User Comments, Feedback and Other Submissions",
      content: `
        <p>If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, "Comments"), you agree that we may, at any time, without restriction, edit, copy, publish, share, distribute, translate and otherwise use in any medium any Comments that you forward to us.</p>
        <p>You hereby grant us a perpetual, non-revocable, worldwide, royalty-free and sub-licensable right and license to use, copy, share, distribute, display, publish, transmit, make available, reproduce, modify, adapt the Comments and create derivate works of the Comments.</p>
      `
    },
    {
      title: "Personal Information",
      content: `
        <p>Your submission of personal information through the Website is governed by our Privacy Policy. Please review the Privacy Policy to understand our privacy practices.</p>
      `
    },
    {
      title: "Errors, Inaccuracies and Omissions",
      content: `
        <p>Occasionally there may be information on our Website or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability or even general content. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time with prior notice (including after you have submitted your order).</p>
      `
    },
    {
      title: "Prohibited Uses",
      content: `
        <p>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the Website or its content:</p>
        <ul>
          <li>for any unlawful purpose;</li>
          <li>to solicit others to perform or participate in any unlawful acts;</li>
          <li>to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;</li>
          <li>to infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
          <li>to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;</li>
          <li>to submit false or misleading information;</li>
          <li>to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet;</li>
          <li>to collect or track the personal information of others;</li>
          <li>to spam, phish, pharm, pretext, spider, crawl, or scrape;</li>
          <li>for any obscene or immoral purpose; or</li>
          <li>to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet.</li>
        </ul>
      `
    },
    {
      title: "Disclaimer of Warranties; Limitation of Liability",
      content: `
        <p>We do not guarantee, represent or warrant that your use of our Service will be uninterrupted, timely, secure or error-free.</p>
        <p>We do not warrant that the results that may be obtained from the use of the Service will be accurate or reliable.</p>
        <p>You agree that from time to time we may remove the Service for indefinite periods of time or cancel the Service at any time, without notice to you.</p>
        <p>You expressly agree that your use of, or inability to use, the Service is at your sole risk. The Service and all products and services delivered to you through the Service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied.</p>
      `
    },
    {
      title: "Indemnification",
      content: `
        <p>You agree to indemnify, defend and hold harmless Fitshit Health Solutions Private Limited and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.</p>
      `
    },
    {
      title: "Severability",
      content: `
        <p>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.</p>
      `
    },
    {
      title: "Termination",
      content: `
        <p>The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.</p>
        <p>These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.</p>
        <p>If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).</p>
      `
    },
    {
      title: "Entire Agreement",
      content: `
        <p>The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.</p>
        <p>These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).</p>
        <p>Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</p>
      `
    },
    {
      title: "Governing Law",
      content: `
        <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.</p>
        <p>The place of jurisdiction shall exclusively be in Mumbai, Maharashtra. In the event of any dispute arising out of these Terms of Service the same shall be settled by a binding arbitration conducted by a sole arbitrator, appointed jointly by both parties and governed by the Arbitration and Conciliation Act, 1996. The venue and seat of arbitration shall be Mumbai, Maharashtra.</p>
      `
    },
    {
      title: "Changes to Terms of Service",
      content: `
        <p>You can review the most current version of the Terms of Service at any time at this page.</p>
        <p>We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</p>
      `
    },
    {
      title: "Contact Information",
      content: `
        <p>Questions about the Terms of Service should be sent to us at listen@eat5foods.com.com.</p>
      `
    }
  ]

  return (
    <div className="container mx-auto flex flex-col items-center py-16">
      <h1 className="text-3xl font-bold mb-6">Terms of Services </h1>
      <div className="flex w-full md:max-w-5xl items-center">
        <div className="w-full">
          <Accordion className='w-full' type="single" collapsible defaultValue={sections[0].title}>
            {sections.map((term) => (
              <AccordionItem key={term.title} value={term.title}>
                <AccordionTrigger className='min-w-full'>
                  {term.title}
                </AccordionTrigger>
                <AccordionContent className="w-full">
                  <div className="policy-content prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: term.content }} />
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