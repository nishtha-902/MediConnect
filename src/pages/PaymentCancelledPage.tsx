import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const PaymentCancelledPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-full bg-destructive/10 mb-6">
            <XCircle className="h-16 w-16 text-destructive" />
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Payment Cancelled
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Your payment was not completed. Don't worry - you can try again or choose a different payment method.
          </p>

          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-8">
              <h3 className="font-semibold text-foreground mb-4">What happened?</h3>
              <p className="text-muted-foreground mb-6">
                The payment process was cancelled. This could be because:
              </p>
              <ul className="text-left text-muted-foreground space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  You closed the payment window
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  There was an issue with your payment method
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  The session timed out
                </li>
              </ul>
              <p className="text-sm text-foreground">
                No charges have been made to your account.
              </p>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/specialties')}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentCancelledPage;
