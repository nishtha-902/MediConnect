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
import BookingSuccessDialog from '@/components/BookingSuccessDialog';
import { getDoctorsForSpecialty, Doctor } from '@/data/doctors';
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

declare global {
  interface Window {
    Razorpay: any;
  }
}

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

const CONSULTATION_AMOUNT = 499;

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
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    doctorName: '',
    specialty: '',
    date: '',
    time: '',
    patientName: '',
    paymentId: '',
  });

  const specialtyName = specialty?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'General Medicine';
  const doctors = getDoctorsForSpecialty(specialty);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

  const saveAppointment = async (paymentId: string, doctorInfo: Doctor) => {
    try {
      const { error } = await supabase.from('appointments').insert({
        user_id: user.id,
        doctor_name: doctorInfo.name,
        specialty: specialtyName,
        appointment_date: selectedDate?.toISOString().split('T')[0],
        appointment_time: selectedTime,
        patient_name: patientInfo.fullName,
        patient_phone: patientInfo.phone,
        symptoms: patientInfo.symptoms,
        payment_id: paymentId,
        amount: CONSULTATION_AMOUNT,
        status: 'upcoming',
      });

      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error('Error saving appointment:', error);
      return false;
    }
  };

  const sendConfirmationEmail = async (doctorInfo: Doctor) => {
    try {
      await supabase.functions.invoke('send-confirmation', {
        body: {
          email: user.email,
          patientName: patientInfo.fullName,
          doctorName: doctorInfo.name,
          specialty: specialtyName,
          appointmentDate: selectedDate?.toLocaleDateString(),
          appointmentTime: selectedTime,
        },
      });
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const scheduleReminder = async (doctorInfo: Doctor) => {
    try {
      // Create appointment datetime
      const [time, period] = selectedTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let hour24 = hours;
      if (period === 'PM' && hours !== 12) hour24 += 12;
      if (period === 'AM' && hours === 12) hour24 = 0;
      
      const appointmentDateTime = new Date(selectedDate!);
      appointmentDateTime.setHours(hour24, minutes, 0, 0);

      await supabase.functions.invoke('schedule-reminder', {
        body: {
          appointmentId: Date.now().toString(),
          appointmentDateTime: appointmentDateTime.toISOString(),
          email: user.email,
          patientName: patientInfo.fullName,
          doctorName: doctorInfo.name,
          specialty: specialtyName,
        },
      });
    } catch (error) {
      console.error('Error scheduling reminder:', error);
    }
  };

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      toast({
        title: "Payment Error",
        description: "Payment system is loading. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingPayment(true);
    
    const selectedDoctorInfo = doctors.find(d => d.id === selectedDoctor);
    
    try {
      // Create Razorpay order
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          amount: CONSULTATION_AMOUNT,
          doctorName: selectedDoctorInfo?.name,
          specialty: specialtyName,
          appointmentDate: selectedDate?.toLocaleDateString(),
          appointmentTime: selectedTime,
          patientName: patientInfo.fullName,
          patientPhone: patientInfo.phone,
        },
      });

      if (error) throw error;

      const { orderId, amount, currency, keyId } = data;

      // Open Razorpay checkout
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "MedConsult",
        description: `${specialtyName} Consultation with ${selectedDoctorInfo?.name}`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            });

            if (verifyError || !verifyData?.success) {
              throw new Error(verifyError?.message || "Payment verification failed");
            }

            // Save appointment to database
            await saveAppointment(response.razorpay_payment_id, selectedDoctorInfo!);

            // Send confirmation email
            await sendConfirmationEmail(selectedDoctorInfo!);

            // Schedule reminder email
            await scheduleReminder(selectedDoctorInfo!);

            // Show success dialog
            setBookingDetails({
              doctorName: selectedDoctorInfo?.name || '',
              specialty: specialtyName,
              date: selectedDate?.toLocaleDateString() || '',
              time: selectedTime,
              patientName: patientInfo.fullName,
              paymentId: response.razorpay_payment_id,
            });
            setShowSuccessDialog(true);
          } catch (verifyErr: any) {
            console.error('Payment verification error:', verifyErr);
            toast({
              title: "Payment Verification Failed",
              description: verifyErr.message || "Please contact support if amount was deducted.",
              variant: "destructive",
            });
          }
          setIsProcessingPayment(false);
        },
        prefill: {
          name: patientInfo.fullName,
          email: user.email,
          contact: patientInfo.phone,
        },
        notes: {
          specialty: specialtyName,
          doctor: selectedDoctorInfo?.name,
          date: selectedDate?.toLocaleDateString(),
          time: selectedTime,
        },
        theme: {
          color: "#10b981",
        },
        modal: {
          ondismiss: function() {
            setIsProcessingPayment(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        toast({
          title: "Payment Failed",
          description: response.error.description || "Payment could not be completed. Please try again.",
          variant: "destructive",
        });
        setIsProcessingPayment(false);
      });
      razorpay.open();
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
                  <span className="font-bold text-primary">₹{CONSULTATION_AMOUNT}.00</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Secure Payment</h3>
                    <p className="text-sm text-muted-foreground">Powered by Razorpay - Cards, UPI, Net Banking accepted</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete your payment securely using Razorpay. You can pay via UPI, debit/credit cards, net banking, or wallets.
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
                  <div className={`w-8 sm:w-16 h-1 mx-2 rounded ${
                    step > index + 1 ? 'gradient-primary' : 'bg-muted'
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
              onClick={() => step === 1 ? navigate('/specialties') : setStep(step - 1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {step === 1 ? 'Back to Specialties' : 'Previous'}
            </Button>

            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handlePayment}
                disabled={isProcessingPayment || !razorpayLoaded}
                className="gap-2"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Pay ₹{CONSULTATION_AMOUNT}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <BookingSuccessDialog 
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        bookingDetails={bookingDetails}
      />
    </div>
  );
};

export default BookingPage;
