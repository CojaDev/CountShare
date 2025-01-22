import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Privacy Policy</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We collect information you provide directly to us when you create an account, create or share countdowns,
              and interact with other users. This may include your name, email address, profile information, and any
              content you choose to share.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to communicate with you,
              and to personalize your experience. We may also use your information to send you updates, newsletters, and
              promotional materials.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Information Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We do not sell or rent your personal information to third parties. We may share your information with
              service providers who assist us in operating our website and conducting our business. We may also disclose
              your information if required by law or to protect our rights or the rights of others.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We implement reasonable security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Your Choices</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              You can access, update, or delete your account information at any time by logging into your account
              settings. You can also opt-out of receiving promotional communications from us by following the
              instructions in those messages.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-gray-600 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </Layout>
  )
}

