import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Calendar, Video, ArrowRight } from 'lucide-react';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const appointmentId = searchParams.get('appointment_id') || '1';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-full bg-success/10 mb-6 animate-bounce">
            <CheckCircle className="h-16 w-16 text-success" />
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Your consultation has been booked successfully. A confirmation email has been sent to your registered email address.
          </p>

          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-8">
              <h3 className="font-semibold text-foreground mb-6">Appointment Details</h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <Video className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Video Consultation</p>
                    <p className="text-sm text-muted-foreground">Dr. Sarah Williams - General Medicine</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Scheduled Time</p>
                    <p className="text-sm text-muted-foreground">January 20, 2024 at 3:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-foreground">
                  <strong>Reminder:</strong> You'll receive an email reminder 30 minutes before your consultation.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/appointments')}>
              View My Appointments
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
