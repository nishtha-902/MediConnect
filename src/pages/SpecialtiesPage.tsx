import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Stethoscope, 
  Brain, 
  Heart, 
  Baby, 
  Bone, 
  Eye,
  Pill,
  Activity,
  Ear,
  Syringe,
  Thermometer,
  Flower2,
  Search,
  ArrowRight
} from 'lucide-react';

const allSpecialties = [
  { icon: Stethoscope, name: 'General Medicine', description: 'Primary care for common illnesses and health checkups', price: 49, available: 24 },
  { icon: Brain, name: 'Mental Health', description: 'Counseling, therapy, and psychiatric care', price: 79, available: 18 },
  { icon: Heart, name: 'Cardiology', description: 'Heart and cardiovascular system care', price: 89, available: 12 },
  { icon: Baby, name: 'Pediatrics', description: 'Healthcare for infants, children, and adolescents', price: 59, available: 15 },
  { icon: Bone, name: 'Orthopedics', description: 'Bone, joint, and muscle conditions', price: 79, available: 10 },
  { icon: Eye, name: 'Dermatology', description: 'Skin, hair, and nail conditions', price: 69, available: 14 },
  { icon: Pill, name: 'Internal Medicine', description: 'Adult diseases and complex conditions', price: 69, available: 20 },
  { icon: Activity, name: 'Neurology', description: 'Brain and nervous system disorders', price: 99, available: 8 },
  { icon: Ear, name: 'ENT', description: 'Ear, nose, and throat conditions', price: 59, available: 11 },
  { icon: Syringe, name: 'Endocrinology', description: 'Hormonal and metabolic disorders', price: 79, available: 7 },
  { icon: Thermometer, name: 'Infectious Disease', description: 'Infections and tropical diseases', price: 69, available: 9 },
  { icon: Flower2, name: 'Gynecology', description: "Women's reproductive health", price: 69, available: 16 },
];

const SpecialtiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpecialties = allSpecialties.filter(specialty =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    specialty.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-hero py-16">
          <div className="container text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Find the Right Specialist
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Browse our network of certified doctors across various specialties and book your consultation today.
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>
        </section>

        {/* Specialties Grid */}
        <section className="container py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpecialties.map((specialty, index) => (
              <Card 
                key={specialty.name}
                className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(`/booking/${specialty.name.toLowerCase().replace(' ', '-')}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl gradient-primary">
                      <specialty.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">${specialty.price}</p>
                      <p className="text-xs text-muted-foreground">per session</p>
                    </div>
                  </div>
                  <CardTitle className="font-display text-xl mt-4">{specialty.name}</CardTitle>
                  <CardDescription>{specialty.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-success">
                      <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                      {specialty.available} doctors available
                    </div>
                    <Button size="sm">
                      Book Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSpecialties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No specialties found matching "{searchTerm}"</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SpecialtiesPage;
