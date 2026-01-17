import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowRight, 
  UserPlus, 
  Search, 
  Calendar, 
  CreditCard, 
  Video, 
  MessageSquare, 
  FileText,
  Shield,
  Clock,
  Languages,
  CheckCircle
} from 'lucide-react';

const HowItWorksPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Create Your Account',
      description: 'Sign up in seconds with your email. Your health information is protected with enterprise-grade security.',
      color: 'bg-primary/10 text-primary',
    },
    {
      number: '02',
      icon: Search,
      title: 'Choose a Specialty',
      description: 'Browse our wide range of medical specialties. From general medicine to specialized care, find the right doctor for your needs.',
      color: 'bg-accent/10 text-accent',
    },
    {
      number: '03',
      icon: Calendar,
      title: 'Book Your Appointment',
      description: 'Select a convenient date and time that works for you. Our doctors are available 24/7 for your convenience.',
      color: 'bg-success/10 text-success',
    },
    {
      number: '04',
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Complete payment securely before your consultation. We accept UPI, cards, and other payment methods.',
      color: 'bg-warning/10 text-warning',
    },
    {
      number: '05',
      icon: Video,
      title: 'Join Video Consultation',
      description: 'Connect with your doctor through crystal-clear HD video. Chat, share documents, and get real-time transcription.',
      color: 'bg-primary/10 text-primary',
    },
    {
      number: '06',
      icon: FileText,
      title: 'Receive Your Records',
      description: 'Get prescriptions, consultation notes, and recommendations delivered securely to your account.',
      color: 'bg-accent/10 text-accent',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Your health data is encrypted and secure',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Doctors available around the clock',
    },
    {
      icon: Languages,
      title: 'Live Transcription',
      description: 'Overcome language barriers easily',
    },
    {
      icon: MessageSquare,
      title: 'In-Session Chat',
      description: 'Share files during consultation',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            How MediConnect Works
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Get quality healthcare from the comfort of your home in just a few simple steps. 
            Our platform makes it easy to connect with certified doctors.
          </p>
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => navigate(user ? '/specialties' : '/auth?mode=signup')}
          >
            {user ? 'Book Consultation' : 'Get Started Now'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Journey to Better Health
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From registration to receiving your prescription, here's everything you need to know
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="flex gap-6 mb-8 last:mb-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center`}>
                    <step.icon className="h-7 w-7" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border my-4" />
                  )}
                </div>
                <Card className="flex-1 border-0 shadow-md">
                  <CardContent className="p-6">
                    <span className="text-sm font-bold text-primary mb-2 block">Step {step.number}</span>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MediConnect?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed with your health and convenience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="border-0 shadow-md text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="inline-flex p-4 rounded-2xl gradient-primary mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How long does a typical consultation last?',
                a: 'Consultations typically last 15-30 minutes, depending on the complexity of your health concerns.',
              },
              {
                q: 'Can I get prescriptions through video consultations?',
                a: 'Yes, our doctors can prescribe medications when medically appropriate. Prescriptions are delivered digitally.',
              },
              {
                q: 'Is my health information secure?',
                a: 'Absolutely. We use HIPAA-compliant encryption to protect all your health data and consultations.',
              },
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of patients who trust MediConnect for their healthcare needs.
          </p>
          <Button 
            variant="secondary" 
            size="xl"
            onClick={() => navigate(user ? '/specialties' : '/auth?mode=signup')}
          >
            {user ? 'Book Your Consultation' : 'Create Free Account'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
