import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Video, 
  FileText, 
  Settings, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Stethoscope
} from 'lucide-react';

const Dashboard = () => {
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

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Williams',
      specialty: 'General Medicine',
      date: 'Today',
      time: '3:00 PM',
      status: 'upcoming',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      date: 'Tomorrow',
      time: '10:30 AM',
      status: 'upcoming',
    },
  ];

  const quickActions = [
    { icon: Stethoscope, label: 'Book Consultation', href: '/specialties', color: 'gradient-primary' },
    { icon: Calendar, label: 'My Appointments', href: '/appointments', color: 'bg-accent' },
    { icon: FileText, label: 'Medical Records', href: '/records', color: 'bg-success' },
    { icon: Settings, label: 'Settings', href: '/settings', color: 'bg-muted' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-muted-foreground">
            Manage your health appointments and records in one place.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Card 
              key={action.label}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
              onClick={() => navigate(action.href)}
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-3 rounded-xl ${action.color} mb-3`}>
                  <action.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="font-medium text-foreground text-sm">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-display text-xl">Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled consultations</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/appointments')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg gradient-primary">
                            <Video className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{appointment.doctor}</p>
                            <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{appointment.date}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                            <Clock className="h-3 w-3" />
                            {appointment.time}
                          </p>
                        </div>
                        <Button size="sm" onClick={() => navigate(`/consultation/${appointment.id}`)}>
                          Join
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                    <Button onClick={() => navigate('/specialties')}>
                      Book Your First Consultation
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Health Summary */}
          <div>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="font-display text-xl">Health Summary</CardTitle>
                <CardDescription>Quick overview of your health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Last Checkup</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Active Prescriptions</p>
                    <p className="text-xs text-muted-foreground">2 medications</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10">
                  <Video className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Total Consultations</p>
                    <p className="text-xs text-muted-foreground">5 sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
