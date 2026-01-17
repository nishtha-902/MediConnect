import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowRight, 
  Heart, 
  Users, 
  Award, 
  Globe,
  Target,
  Lightbulb,
  Shield,
  Video
} from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { number: '10,000+', label: 'Consultations Completed' },
    { number: '500+', label: 'Verified Doctors' },
    { number: '50+', label: 'Medical Specialties' },
    { number: '4.9', label: 'Average Rating' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient-First Care',
      description: 'Every decision we make is guided by what\'s best for our patients. Your health and comfort are our top priorities.',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'We adhere to the highest standards of data protection. Your health information is always encrypted and secure.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Quality healthcare should be available to everyone, regardless of location. We break down geographical barriers.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously improve our platform with cutting-edge technology like live transcription and AI assistance.',
    },
  ];

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Chief Medical Officer',
      bio: '20+ years in healthcare, former Head of Telemedicine at Apollo Hospitals',
    },
    {
      name: 'Priya Sharma',
      role: 'CEO & Co-Founder',
      bio: 'Healthcare entrepreneur with a vision to democratize quality healthcare',
    },
    {
      name: 'Amit Patel',
      role: 'CTO',
      bio: 'Tech veteran with experience at Google Health and Microsoft',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              About MediConnect
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're on a mission to make quality healthcare accessible to everyone, everywhere. 
              Through innovative technology and compassionate care, we're transforming how people access medical services.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Target className="h-4 w-4" />
                Our Mission
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Healthcare Without Boundaries
              </h2>
              <p className="text-muted-foreground mb-6">
                In a post-pandemic world, we recognized the urgent need for accessible, reliable, and secure healthcare. 
                MediConnect was born from this vision – to bring quality medical care to every corner of the country.
              </p>
              <p className="text-muted-foreground mb-6">
                Our platform connects patients with certified doctors through HD video consultations, 
                complete with in-session chat, secure document sharing, and live transcription to overcome 
                language barriers.
              </p>
              <Button onClick={() => navigate('/how-it-works')}>
                Learn How It Works
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <Card 
                  key={value.title}
                  className="border-0 shadow-md animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="p-3 rounded-xl gradient-primary w-fit mb-4">
                      <value.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem We Solve */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Problem We're Solving
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Traditional healthcare faces numerous challenges that we're addressing head-on
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'Geographic Barriers',
                description: 'Millions live far from quality healthcare facilities. We bring doctors to their homes.',
              },
              {
                title: 'Long Wait Times',
                description: 'Hours spent in waiting rooms. Our patients connect with doctors in minutes.',
              },
              {
                title: 'Language Barriers',
                description: 'Dialect and accent differences cause miscommunication. Our transcription service helps.',
              },
            ].map((problem, index) => (
              <Card 
                key={problem.title}
                className="border-0 shadow-md animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Leadership Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Led by experienced professionals passionate about healthcare innovation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={member.name}
                className="border-0 shadow-md animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
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
            Join the Healthcare Revolution
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Experience the future of healthcare. Book your first consultation today.
          </p>
          <Button 
            variant="secondary" 
            size="xl"
            onClick={() => navigate(user ? '/specialties' : '/auth?mode=signup')}
          >
            {user ? 'Book Consultation' : 'Get Started Free'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
