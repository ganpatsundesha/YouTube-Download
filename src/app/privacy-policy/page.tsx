import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'TubeKit Privacy Policy - Learn how we protect your data and privacy when using our YouTube utility tools.',
  canonical: '/privacy-policy',
  noindex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <p className="text-gray-600 mb-6">
          <strong>Last Updated:</strong> March 31, 2024
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          TubeKit is committed to protecting your privacy. We do not collect, store, or share any personal information or YouTube URLs you submit to our service. All processing happens in real-time and is not logged or stored on our servers.
        </p>

        <h2>2. Data We Don't Store</h2>
        <ul>
          <li>YouTube URLs you paste into our tool</li>
          <li>Downloaded videos, audio files, or content</li>
          <li>Your browsing history or viewing patterns</li>
          <li>Personal identification information</li>
          <li>IP addresses or device information</li>
        </ul>

        <h2>3. Cookies and Tracking</h2>
        <p>
          We may use essential cookies to ensure the website functions properly. We do not use tracking cookies or third-party analytics that identify individual users. You can disable cookies in your browser settings, though this may affect website functionality.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>
          TubeKit may use third-party services for website hosting and content delivery. These services may collect standard web server logs (IP addresses, browser types) but this information is not shared with us or used to identify you.
        </p>

        <h2>5. YouTube API Services</h2>
        <p>
          When you use TubeKit, we may fetch metadata from YouTube's public APIs. This data is used solely to provide you with information about videos, playlists, and content. We comply with YouTube's Terms of Service and API policies.
        </p>

        <h2>6. Data Security</h2>
        <p>
          While we don't store your data, we take security seriously. All connections to TubeKit are encrypted using HTTPS. Any temporary data needed for processing is immediately discarded after your request is completed.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          TubeKit is not directed to children under 13. We do not knowingly collect information from children. If you believe a child has used our service, please contact us.
        </p>

        <h2>8. Your Rights</h2>
        <p>
          Since we don't collect or store personal data, there is no personal information to access, modify, or delete. You can use TubeKit anonymously without creating an account.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:
          <br />
          Email: privacy@tubekit.com
        </p>
      </div>
    </div>
  );
}
