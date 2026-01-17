import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Video, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const AppointmentsPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  // Mock data - would come from database
  const appointments: Appointment[] = [
    {
      id: '1',
      doctor: 'Dr. Sarah Williams',
      specialty: 'General Medicine',
      date: 'Today',
      time: '3:00 PM',
      status: 'upcoming',
    },
    {
      id: '2',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      date: 'Tomorrow',
      time: '10:30 AM',
      status: 'upcoming',
    },
    {
      id: '3',
      doctor: 'Dr. Emily Brown',
      specialty: 'Mental Health',
      date: 'Jan 10, 2024',
      time: '2:00 PM',
      status: 'completed',
    },
    {
      id: '4',
      doctor: 'Dr. James Wilson',
      specialty: 'Dermatology',
      date: 'Jan 5, 2024',
      time: '11:00 AM',
      status: 'cancelled',
    },
  ];

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getStatusBadge = (status: Appointment['status']) => {
    const styles = {
      upcoming: 'bg-primary/10 text-primary',
      completed: 'bg-success/10 text-success',
      cancelled: 'bg-destructive/10 text-destructive',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filterAppointments = (status: 'all' | Appointment['status']) => {
    if (status === 'all') return appointments;
    return appointments.filter(a => a.status === status);
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl gradient-primary">
              <Video className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{appointment.doctor}</h3>
              <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
            </div>
          </div>
          {getStatusBadge(appointment.status)}
        </div>
        
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{appointment.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{appointment.time}</span>
          </div>
        </div>

        {appointment.status === 'upcoming' && (
          <div className="flex gap-3 mt-4">
            <Button 
              size="sm" 
              onClick={() => navigate(`/consultation/${appointment.id}`)}
            >
              Join Consultation
            </Button>
            <Button size="sm" variant="outline">
              Reschedule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">My Appointments</h1>
          <p className="text-muted-foreground">View and manage your scheduled consultations</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          {['all', 'upcoming', 'completed', 'cancelled'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {filterAppointments(tab as any).length > 0 ? (
                <div className="grid gap-4">
                  {filterAppointments(tab as any).map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              ) : (
                <Card className="border-0 shadow-md">
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">No appointments found</h3>
                    <p className="text-muted-foreground mb-6">
                      {tab === 'upcoming' 
                        ? "You don't have any upcoming appointments" 
                        : `No ${tab} appointments to display`}
                    </p>
                    <Button onClick={() => navigate('/specialties')}>
                      Book a Consultation
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AppointmentsPage;
