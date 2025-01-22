import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfUsePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Terms of Use</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              By accessing and using CountShare, you agree to be bound by these Terms of Use and all applicable laws and
              regulations. If you do not agree with any part of these terms, you may not use our service.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. Use of Service</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              You may use CountShare to create, share, and view countdowns. You are responsible for maintaining the
              confidentiality of your account and password. You agree to accept responsibility for all activities that
              occur under your account.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. User Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              You retain all rights to the content you post on CountShare. By posting content, you grant CountShare a
              non-exclusive, worldwide, royalty-free license to use, reproduce, and distribute your content in
              connection with the service.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Prohibited Conduct</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              You agree not to use CountShare for any unlawful purpose or in any way that could damage, disable,
              overburden, or impair the service. This includes but is not limited to: posting harmful content,
              attempting to gain unauthorized access, or interfering with other users' enjoyment of the service.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We reserve the right to terminate or suspend your account and access to CountShare at our sole discretion,
              without notice, for conduct that we believe violates these Terms of Use or is harmful to other users, us,
              or third parties, or for any other reason.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We reserve the right to modify these Terms of Use at any time. We will notify users of any significant
              changes. Your continued use of CountShare after changes are posted constitutes your acceptance of the
              modified terms.
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-gray-600 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </Layout>
  )
}

