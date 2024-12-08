import { Card } from '@/components/ui/card';
import { AlertTriangle, Info, Shield } from 'lucide-react';

export default function Terms() {
  return (
    <div className="container mx-auto max-w-3xl space-y-8 py-12">
      <div className="flex items-center gap-4">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Terms of Service</h1>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              Membership and Access
            </h2>
            <p className="text-muted-foreground">
              Channel 44 is a private, members-only platform. Access is granted exclusively through 
              official invitation and registration processes. Membership is non-transferable and 
              may be revoked at any time for violation of these terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Restricted Usage
            </h2>
            <p className="text-muted-foreground">
              Members are strictly prohibited from:
            </p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Sharing access credentials with non-members</li>
              <li>Distributing or republishing platform content</li>
              <li>Creating derivative works from platform features</li>
              <li>Attempting to reverse engineer platform components</li>
              <li>Using automated systems to access platform features</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              GEMS System Terms
            </h2>
            <p className="text-muted-foreground">
              GEMS are internal platform points with no monetary value. They are:
            </p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Non-transferable between users</li>
              <li>Not redeemable for cash or cryptocurrency</li>
              <li>Not representative of any ownership or investment</li>
              <li>Subject to modification or removal at platform discretion</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              Content and Communications
            </h2>
            <p className="text-muted-foreground">
              Members agree to:
            </p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Maintain confidentiality of platform discussions</li>
              <li>Not share screenshots or platform data externally</li>
              <li>Use respectful and professional communication</li>
              <li>Report violations or suspicious activity</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              Termination
            </h2>
            <p className="text-muted-foreground">
              Channel 44 reserves the right to terminate membership for:
            </p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Violation of these terms</li>
              <li>Sharing access with non-members</li>
              <li>Disruptive behavior</li>
              <li>Any activity deemed harmful to the platform or its members</li>
            </ul>
          </section>
        </div>
      </Card>
    </div>
  );
}