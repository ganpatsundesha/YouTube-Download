import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Terms of Service',
  description: 'TubeKit Terms of Service - Read our terms and conditions for using our YouTube utility tools.',
  canonical: '/terms-of-service',
  noindex: true,
});

export default function TermsOfServicePage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <p className="text-gray-600 mb-6">
          <strong>Last Updated:</strong> March 31, 2024
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using TubeKit, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          TubeKit provides free online tools for downloading YouTube videos, extracting subtitles, grabbing thumbnails, converting videos to MP3, and other YouTube-related utilities. The service is provided "as is" without warranties of any kind.
        </p>

        <h2>3. User Responsibilities</h2>
        <p>
          You agree to:
        </p>
        <ul>
          <li>Use TubeKit only for lawful purposes</li>
          <li>Respect copyright laws and intellectual property rights</li>
          <li>Only download content you have permission to download</li>
          <li>Comply with YouTube's Terms of Service</li>
          <li>Not use the service to infringe on others' rights</li>
          <li>Not attempt to abuse, harm, or overload our systems</li>
        </ul>

        <h2>4. Copyright and Content Ownership</h2>
        <p>
          TubeKit does not host, store, or own any content downloaded through our service. You are solely responsible for ensuring you have the right to download any content. Downloading copyrighted material without permission may violate copyright laws.
        </p>

        <h2>5. Fair Use and Legal Compliance</h2>
        <p>
          You acknowledge that:
        </p>
        <ul>
          <li>You will only download content for personal, non-commercial use</li>
          <li>You will respect the rights of content creators</li>
          <li>You understand that unauthorized downloading may violate laws in your jurisdiction</li>
          <li>TubeKit is not liable for your use of downloaded content</li>
        </ul>

        <h2>6. Prohibited Uses</h2>
        <p>
          You may not use TubeKit to:
        </p>
        <ul>
          <li>Download copyrighted content without permission</li>
          <li>Redistribute downloaded content commercially</li>
          <li>Violate any applicable laws or regulations</li>
          <li>Attempt to reverse engineer or exploit our service</li>
          <li>Use automated systems to make excessive requests</li>
        </ul>

        <h2>7. Service Availability</h2>
        <p>
          We strive to keep TubeKit available 24/7, but we do not guarantee uninterrupted service. We may suspend or terminate the service at any time for maintenance, updates, or other reasons without prior notice.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          TubeKit and its operators are not liable for:
        </p>
        <ul>
          <li>Any damages resulting from use of our service</li>
          <li>Content downloaded through our platform</li>
          <li>Violations of copyright or other laws by users</li>
          <li>Service interruptions or technical issues</li>
          <li>Any indirect, incidental, or consequential damages</li>
        </ul>

        <h2>9. Third-Party Links</h2>
        <p>
          TubeKit may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites.
        </p>

        <h2>10. Disclaimer</h2>
        <p>
          TubeKit is not affiliated with, endorsed by, or sponsored by YouTube, Google, or Alphabet Inc. YouTube is a trademark of Google LLC.
        </p>

        <h2>11. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of TubeKit after changes constitutes acceptance of the new terms.
        </p>

        <h2>12. Termination</h2>
        <p>
          We reserve the right to terminate or suspend access to our service immediately, without prior notice, for conduct that violates these Terms or is harmful to other users.
        </p>

        <h2>13. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
        </p>

        <h2>14. Contact Information</h2>
        <p>
          If you have questions about these Terms of Service, please contact us at:
          <br />
          Email: legal@tubekit.com
        </p>
      </div>
    </div>
  );
}
