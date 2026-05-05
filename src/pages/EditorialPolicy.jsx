import React from 'react';
import PolicyLayout from '../layouts/PolicyLayout';

export default function EditorialPolicy() {
  return (
    <PolicyLayout
      title="Editorial Policy"
      subtitle="Our standards for product information and content integrity."
      lastUpdated="May 06, 2026"
    >
      <section>
        <h2>Our Commitment to Accuracy</h2>
        <p>
          At The Zenvix, we are committed to providing our customers with accurate, reliable, and transparent information 
          regarding all imaging hardware and printing supplies featured in our catalog. Our goal is to empower 
          purchasing decisions through detailed technical specifications and honest product representations.
        </p>
      </section>

      <section>
        <h2>Product Information Standards</h2>
        <p>
          All product descriptions and technical data provided on our platform are sourced directly from official 
          manufacturer documentation. We strive to ensure that every feature, from print speed to connectivity 
          specifications, is presented precisely as defined by the original equipment manufacturers.
        </p>
      </section>

      <section>
        <h2>Integrity and Transparency</h2>
        <p>
          Our content is strictly focused on the sale and distribution of professional printing hardware. We do not 
          publish speculative reviews or third-party promotional content. Our team regularly audits the product 
          information on our site to ensure it remains current with the latest hardware releases and updates.
        </p>
      </section>

      <section>
        <h2>No Technical Support Services</h2>
        <p>
          The Zenvix is a retail platform for hardware procurement. We do not provide technical support, 
          software troubleshooting, or repair services. For any operational assistance or warranty-related technical 
          queries, we encourage customers to refer to the official support channels provided by the respective 
          hardware manufacturers.
        </p>
      </section>

      <section>
        <h2>Contact for Content Inquiries</h2>
        <p>
          If you identify any discrepancies in our product information or have questions regarding our editorial 
          standards, please contact our content team at <a href="mailto:info@thezenvix.co">info@thezenvix.co</a>.
        </p>
      </section>
    </PolicyLayout>
  );
}
