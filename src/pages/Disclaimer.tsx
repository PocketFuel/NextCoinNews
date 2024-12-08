import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Info } from 'lucide-react';

export default function Disclaimer() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-3xl space-y-8 py-12">
      <div className="flex items-center gap-4">
        <AlertTriangle className="h-8 w-8 text-yellow-500" />
        <h1 className="text-3xl font-bold">Important Disclaimer</h1>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              Educational Purpose
            </h2>
            <p className="text-muted-foreground">
              Channel 44 is designed and operated for educational and entertainment purposes only. 
              The platform provides simulated trading experiences and market analysis tools to help users 
              understand market dynamics without the risks associated with real trading.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              GEMS Points System
            </h2>
            <p className="text-muted-foreground">
              GEMS are non-transferrable points used within the platform. They are not:
            </p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Cryptocurrency or digital assets</li>
              <li>Securities or investment products</li>
              <li>Redeemable for real currency or value</li>
              <li>Transferrable between users or platforms</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              Not Financial Advice
            </h2>
            <p className="text-muted-foreground">
              Information provided through Channel 44 should not be considered as financial, investment, 
              legal, or tax advice. Users should conduct their own research and consult with qualified 
              professionals before making any investment decisions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              Risk Acknowledgment
            </h2>
            <p className="text-muted-foreground">
              While Channel 44 uses real market data, all predictions and trades are simulated. 
              Real cryptocurrency trading involves substantial risk and may not be suitable for all investors. 
              Past performance does not indicate future results.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Info className="h-5 w-5 text-primary" />
              Data Usage
            </h2>
            <p className="text-muted-foreground">
              Market data and information displayed on Channel 44 is sourced from third-party providers 
              and may not always be accurate or up-to-date. Users should verify information through 
              official sources before making any decisions.
            </p>
          </section>

          <div className="flex justify-end pt-4">
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
            >
              I Understand
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}