import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | BestUsTax',
  description:
    'BestUsTax privacy policy. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy <span className="gradient-text">Policy</span>
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
            <h2>Introduction</h2>
            <p>
              BestUsTax ("we," "our," or "us") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you
              use our tax preparation services, website, and mobile applications.
            </p>
            <p>
              Please read this Privacy Policy carefully. By using our services, you consent to the
              practices described in this policy.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul>
              <li>Name, address, phone number, and email address</li>
              <li>Social Security Number or Tax Identification Number</li>
              <li>Date of birth and filing status</li>
              <li>Income information (W-2s, 1099s, etc.)</li>
              <li>Bank account information for direct deposit</li>
              <li>Prior year tax returns</li>
              <li>Other tax-related financial information</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages viewed and time spent on our site</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Prepare and file your federal and state tax returns</li>
              <li>Communicate with you about your tax return status</li>
              <li>Process payments for our services</li>
              <li>Provide customer support</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Detect and prevent fraud</li>
            </ul>

            <h2>Information Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>
                <strong>IRS and State Tax Authorities:</strong> To file your tax returns as
                authorized by you
              </li>
              <li>
                <strong>Service Providers:</strong> Third parties who help us provide our services
                (e.g., payment processors, cloud hosting)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court order, or
                government regulation
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or
                sale of assets
              </li>
            </ul>
            <p>
              We do NOT sell your personal information to third parties for marketing purposes.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement robust security measures to protect your information, including:
            </p>
            <ul>
              <li>256-bit SSL encryption for all data transmission</li>
              <li>Multi-factor authentication for account access</li>
              <li>Regular security audits and penetration testing</li>
              <li>Secure data centers with physical access controls</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p>
              While we strive to protect your information, no method of transmission over the
              Internet is 100% secure. We cannot guarantee absolute security.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain your tax return information for a minimum of 7 years, as required by IRS
              regulations. You may request deletion of your account and associated data, subject to
              our legal and regulatory obligations.
            </p>

            <h2>Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
              <li>Disable cookies through your browser settings</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@bestustax.com.
            </p>

            <h2>California Privacy Rights (CCPA)</h2>
            <p>
              California residents have additional rights under the California Consumer Privacy Act
              (CCPA), including:
            </p>
            <ul>
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to equal service and price</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly
              collect personal information from children. If you are a parent or guardian and
              believe your child has provided us with personal information, please contact us.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the new policy on this page and updating the "Last
              updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please
              contact us at:
            </p>
            <p>
              <strong>BestUsTax Privacy Team</strong><br />
              123 Tax Street, Suite 100<br />
              Austin, TX 78701<br />
              Email: privacy@bestustax.com<br />
              Phone: (800) 555-1234
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
