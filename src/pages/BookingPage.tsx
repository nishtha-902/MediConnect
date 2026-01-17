import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  Clock, 
  User,
  CreditCard,
  Shield,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const doctors = [
  { id: 1, name: 'Dr. Sarah Williams', experience: '15 years', rating: 4.9, image: '/placeholder.svg' },
  { id: 2, name: 'Dr. Michael Chen', experience: '12 years', rating: 4.8, image: '/placeholder.svg' },
  { id: 3, name: 'Dr. Emily Rodriguez', experience: '10 years', rating: 4.9, image: '/placeholder.svg' },
  { id: 4, name: 'Dr. James Park', experience: '8 years', rating: 4.7, image: '/placeholder.svg' },
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

const CONSULTATION_PRICE_ID = "price_1SqYueAbtZw9IPLK4JfXA4VQ";

const BookingPage = () => {
  const { specialty } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientInfo, setPatientInfo] = useState({
    fullName: '',
    phone: '',
    symptoms: '',
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const specialtyName = specialty?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'General Medicine';

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname));
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      setPatientInfo(prev => ({
        ...prev,
        fullName: user.user_metadata?.full_name || '',
      }));
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    
    const selectedDoctorInfo = doctors.find(d => d.id === selectedDoctor);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          priceId: CONSULTATION_PRICE_ID,
          doctorName: selectedDoctorInfo?.name,
          specialty: specialtyName,
          appointmentDate: selectedDate?.toLocaleDateString(),
          appointmentTime: selectedTime,
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessingPayment(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Select a Doctor
              </h2>
              <p className="text-muted-foreground">
                Choose from our certified {specialtyName} specialists
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {doctors.map((doctor) => (
                <Card 
                  key={doctor.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedDoctor === doctor.id 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedDoctor(doctor.id)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                      <div className="flex items-center gap-1 text-sm text-warning">
                        ⭐ {doctor.rating}
                      </div>
                    </div>
                    {selectedDoctor === doctor.id && (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Select Date & Time
              </h2>
              <p className="text-muted-foreground">
                Choose your preferred consultation slot
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    Select Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-xs"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Patient Information
              </h2>
              <p className="text-muted-foreground">
                Please provide your details for the consultation
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={patientInfo.fullName}
                      onChange={(e) => setPatientInfo({ ...patientInfo, fullName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={patientInfo.phone}
                      onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Describe Your Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    value={patientInfo.symptoms}
                    onChange={(e) => setPatientInfo({ ...patientInfo, symptoms: e.target.value })}
                    placeholder="Please describe your symptoms or reason for consultation..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Your information is secure</p>
                <p className="text-muted-foreground">
                  All data is encrypted and HIPAA compliant. Only your doctor will have access to this information.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        const selectedDoctorInfo = doctors.find(d => d.id === selectedDoctor);
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Confirm & Pay
              </h2>
              <p className="text-muted-foreground">
                Review your booking details and complete payment
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Specialty</span>
                  <span className="font-medium">{specialtyName}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Doctor</span>
                  <span className="font-medium">{selectedDoctorInfo?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Patient</span>
                  <span className="font-medium">{patientInfo.fullName}</span>
                </div>
                <div className="flex justify-between py-4 text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary">₹499.00</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Secure Payment</h3>
                    <p className="text-sm text-muted-foreground">Powered by Stripe - Cards & UPI accepted</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  You will be redirected to Stripe's secure checkout page to complete your payment. 
                  A confirmation email will be sent after successful payment.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedDoctor !== null;
      case 2: return selectedDate !== undefined && selectedTime !== '';
      case 3: return patientInfo.fullName && patientInfo.phone;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {['Doctor', 'Schedule', 'Details', 'Payment'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${
                  step > index + 1 
                    ? 'gradient-primary text-primary-foreground' 
                    : step === index + 1 
                      ? 'gradient-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {step > index + 1 ? <CheckCircle className="h-5 w-5" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm hidden sm:inline ${
                  step >= index + 1 ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}>
                  {label}
                </span>
                {index < 3 && (
                  <div className={`w-12 sm:w-20 h-0.5 mx-2 ${
                    step > index + 1 ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => step > 1 ? setStep(step - 1) : navigate('/specialties')}
              disabled={isProcessingPayment}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {step > 1 ? 'Back' : 'Cancel'}
            </Button>
            
            {step < 4 ? (
              <Button 
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                variant="hero"
                onClick={handlePayment}
                disabled={!canProceed() || isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay ₹499.00
                    <CreditCard className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
