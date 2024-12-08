import { Card } from '@/components/ui/card';
import { Lock, Info, Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="container mx-auto max-w-3xl space-y-8 py-12">
      <div className="flex items-center gap-4">
        <Lock className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Shield className="h-5 w-5 text-primary" />
              Information Collection
            </h2>
            <p className="text-muted-foreground">
              We collect and store:
            </p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>X handle for member identification</li>
              <li>Platform activity and interaction data</li>
              <li>Prediction history and performance metrics</li>
              <li>Communication records within the platform</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              Data Usage
            </h2>
            <p className="text-muted-foreground">
              Your information is used to:
            </p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Maintain and improve platform functionality</li>
              <li>Track prediction performance and leaderboard rankings</li>
              <li>Facilitate member communication and interaction</li>
              <li>Ensure platform security and prevent abuse</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              Data Protection
            </h2>
            <p className="text-muted-foreground">
              We implement strict security measures:
            </p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Encrypted data storage and transmission</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to member data</li>
              <li>Secure authentication protocols</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              Member Privacy
            </h2>
            <p className="text-muted-foreground">
              Your privacy is protected through:
            </p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Strict access controls and authentication</li>
              <li>No sharing of personal data with third parties</li>
              <li>Option to delete account and associated data</li>
              <li>Regular privacy policy updates and notifications</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              Data Retention
            </h2>
            <p className="text-muted-foreground">
              We retain member data:
            </p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>For the duration of active membership</li>
              <li>Up to 30 days after account deletion</li>
              <li>As required by applicable laws</li>
              <li>For platform security and abuse prevention</li>
            </ul>
          </section>
        </div>
      </Card>
    </div>
  );
}