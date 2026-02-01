import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | BestUsTax',
  description:
    'BestUsTax terms of service. Read our terms and conditions for using our tax preparation services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: January 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using BestUsTax services, you agree to be bound by these Terms of
              Service and all applicable laws and regulations. If you do not agree with any of these
              terms, you are prohibited from using our services.
            </p>

            <h2>Description of Services</h2>
            <p>
              BestUsTax provides online and in-person tax preparation services, including but not
              limited to:
            </p>
            <ul>
              <li>Federal and state income tax return preparation</li>
              <li>Electronic filing (e-filing) of tax returns</li>
              <li>Tax planning and consultation services</li>
              <li>Audit support and representation</li>
              <li>Bookkeeping services</li>
              <li>Tax calculators and educational resources</li>
            </ul>

            <h2>User Responsibilities</h2>
            <p>When using our services, you agree to:</p>
            <ul>
              <li>Provide accurate, complete, and truthful information</li>
              <li>Review your tax return carefully before submission</li>
              <li>Keep copies of all tax documents and supporting records</li>
              <li>Notify us promptly of any errors or omissions</li>
              <li>Pay all applicable fees for services rendered</li>
              <li>Maintain the confidentiality of your account credentials</li>
            </ul>
            <p>
              You are solely responsible for the accuracy of the information you provide. We prepare
              your tax return based on the information you give us.
            </p>

            <h2>Accuracy and Guarantees</h2>
            <h3>Maximum Refund Guarantee</h3>
            <p>
              We guarantee that we will obtain the maximum refund you are entitled to, or we will
              refund your preparation fees. If you find that another tax preparation service
              provides a larger refund using the same data, we will refund your fees and pay you the
              difference, up to $100.
            </p>

            <h3>Accuracy Guarantee</h3>
            <p>
              If an error on our part results in IRS penalties or interest, we will reimburse you
              for those penalties and interest up to $10,000. This guarantee does not cover
              penalties or interest resulting from errors in information you provided.
            </p>

            <h2>Fees and Payment</h2>
            <p>
              Service fees are disclosed before you begin the tax preparation process. Fees vary
              based on the complexity of your tax situation and the services you select.
            </p>
            <ul>
              <li>Fees are due upon completion of your tax return</li>
              <li>We accept major credit cards, debit cards, and bank transfers</li>
              <li>Refund Transfer option allows fees to be deducted from your refund</li>
              <li>All fees are non-refundable once your return has been filed</li>
            </ul>

            <h2>Electronic Filing Authorization</h2>
            <p>
              By using our e-filing services, you authorize BestUsTax to:
            </p>
            <ul>
              <li>Electronically file your tax return with the IRS and applicable state agencies</li>
              <li>Receive acknowledgment of your return from the IRS</li>
              <li>Communicate with the IRS on your behalf regarding the filed return</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, BESTUSTAX SHALL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT
              LIMITED TO LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p>
              Our total liability for any claim arising out of or relating to these terms or our
              services shall not exceed the fees you paid to us in the 12 months preceding the
              claim.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold BestUsTax harmless from any claims, damages, or
              expenses arising from:
            </p>
            <ul>
              <li>Your violation of these Terms of Service</li>
              <li>Inaccurate information provided by you</li>
              <li>Your violation of any third-party rights</li>
              <li>Any taxes, penalties, or interest resulting from information you provided</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content on our website and in our applications, including text, graphics, logos,
              and software, is the property of BestUsTax and is protected by copyright and
              trademark laws. You may not reproduce, distribute, or create derivative works without
              our express written permission.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our services may contain links to third-party websites. We are not responsible for
              the content or privacy practices of these external sites. We encourage you to read
              the terms and privacy policies of any third-party sites you visit.
            </p>

            <h2>Modifications to Services</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of our services at
              any time without notice. We will not be liable to you or any third party for any
              modification, suspension, or discontinuation of services.
            </p>

            <h2>Dispute Resolution</h2>
            <p>
              Any disputes arising from these terms or our services shall be resolved through
              binding arbitration in Austin, Texas, in accordance with the American Arbitration
              Association rules. You waive any right to participate in a class action lawsuit.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws
              of the State of Texas, without regard to its conflict of law provisions.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of these terms is found to be unenforceable, the remaining
              provisions will continue in full force and effect.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may update these Terms of Service from time to time. We will notify you of
              material changes by posting the new terms on our website. Your continued use of our
              services after changes are posted constitutes acceptance of the modified terms.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <p>
              <strong>BestUsTax Legal Department</strong><br />
              123 Tax Street, Suite 100<br />
              Austin, TX 78701<br />
              Email: legal@bestustax.com<br />
              Phone: (800) 555-1234
            </p>

            <h2>IRS Circular 230 Disclosure</h2>
            <p>
              To ensure compliance with requirements imposed by the IRS, we inform you that any
              U.S. federal tax advice contained in this communication (including any attachments)
              is not intended or written to be used, and cannot be used, for the purpose of (i)
              avoiding penalties under the Internal Revenue Code or (ii) promoting, marketing, or
              recommending to another party any transaction or matter addressed herein.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
