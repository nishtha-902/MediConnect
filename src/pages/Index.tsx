import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Video, 
  Shield, 
  Clock, 
  CreditCard, 
  MessageSquare, 
  Languages,
  ArrowRight,
  Star,
  CheckCircle,
  Stethoscope,
  Brain,
  Heart,
  Baby,
  Bone,
  Eye
} from 'lucide-react';

const specialties = [
  { icon: Stethoscope, name: 'General Medicine', color: 'bg-primary/10 text-primary' },
  { icon: Brain, name: 'Mental Health', color: 'bg-accent/10 text-accent' },
  { icon: Heart, name: 'Cardiology', color: 'bg-destructive/10 text-destructive' },
  { icon: Baby, name: 'Pediatrics', color: 'bg-success/10 text-success' },
  { icon: Bone, name: 'Orthopedics', color: 'bg-warning/10 text-warning' },
  { icon: Eye, name: 'Dermatology', color: 'bg-primary/10 text-primary' },
];

const features = [
  {
    icon: Video,
    title: 'HD Video Consultation',
    description: 'Crystal clear video calls for an in-person like experience from anywhere in the world.',
  },
  {
    icon: Shield,
    title: 'HIPAA Compliant',
    description: 'Your health information is protected with enterprise-grade security and encryption.',
  },
  {
    icon: Clock,
    title: 'Available 24/7',
    description: 'Connect with doctors anytime, day or night. No more waiting rooms.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Easy and secure payment processing before your consultation begins.',
  },
  {
    icon: MessageSquare,
    title: 'In-Session Chat',
    description: 'Share documents, images, and messages during your video consultation.',
  },
  {
    icon: Languages,
    title: 'Live Transcription',
    description: 'Real-time transcription overcomes dialect and accent barriers for better understanding.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Patient',
    content: 'MediConnect saved me hours of travel. I got my prescription within 15 minutes from home!',
    rating: 5,
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Cardiologist',
    content: 'The platform is intuitive and the transcription feature helps me understand patients clearly.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Patient',
    content: 'Affordable, convenient, and the doctors are highly professional. Highly recommend!',
    rating: 5,
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Shield className="h-4 w-4" />
              HIPAA Compliant & Secure
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Quality Healthcare,{' '}
              <span className="text-gradient">Anywhere You Are</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Connect instantly with certified doctors through secure video consultations. 
              Get prescriptions, referrals, and medical advice from the comfort of your home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate(user ? '/specialties' : '/auth?mode=signup')}
              >
                {user ? 'Book Consultation' : 'Get Started Free'}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate('/how-it-works')}
              >
                See How It Works
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Consultations</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Doctors</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">4.9</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Browse by Specialty
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our wide range of medical specialties and connect with the right doctor for your needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {specialties.map((specialty, index) => (
              <Card 
                key={specialty.name}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate('/specialties')}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-xl ${specialty.color} mb-3`}>
                    <specialty.icon className="h-6 w-6" />
                  </div>
                  <p className="font-medium text-foreground text-sm">{specialty.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => navigate('/specialties')}>
              View All Specialties
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Remote Healthcare
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform addresses all challenges of remote consultation with cutting-edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="border-0 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="inline-flex p-3 rounded-xl gradient-primary w-fit mb-2">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-display text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get medical care in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Choose a Specialty', description: 'Select the type of doctor you need and browse available physicians.' },
              { step: '2', title: 'Book & Pay', description: 'Pick a convenient time slot and complete secure payment.' },
              { step: '3', title: 'Start Consultation', description: 'Join your HD video call with chat and transcription support.' },
            ].map((item, index) => (
              <div key={item.step} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary text-primary-foreground text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-muted-foreground">See what our patients and doctors say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name}
                className="border-0 shadow-md animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
            Join thousands of patients getting quality healthcare from home. Your first consultation is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="xl"
              onClick={() => navigate(user ? '/specialties' : '/auth?mode=signup')}
            >
              {user ? 'Book Now' : 'Create Free Account'}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
