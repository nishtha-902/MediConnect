import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Calendar, Pill, TestTube, Stethoscope, Upload } from 'lucide-react';

const MedicalRecordsPage = () => {
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

  const prescriptions = [
    { id: '1', medication: 'Amoxicillin 500mg', doctor: 'Dr. Sarah Williams', date: 'Jan 15, 2024', status: 'Active' },
    { id: '2', medication: 'Lisinopril 10mg', doctor: 'Dr. Michael Chen', date: 'Jan 10, 2024', status: 'Active' },
    { id: '3', medication: 'Ibuprofen 400mg', doctor: 'Dr. Emily Brown', date: 'Dec 20, 2023', status: 'Completed' },
  ];

  const labResults = [
    { id: '1', test: 'Complete Blood Count', date: 'Jan 12, 2024', status: 'Normal' },
    { id: '2', test: 'Lipid Panel', date: 'Jan 10, 2024', status: 'Review Required' },
    { id: '3', test: 'HbA1c Test', date: 'Dec 15, 2023', status: 'Normal' },
  ];

  const consultationNotes = [
    { id: '1', doctor: 'Dr. Sarah Williams', specialty: 'General Medicine', date: 'Jan 15, 2024' },
    { id: '2', doctor: 'Dr. Michael Chen', specialty: 'Cardiology', date: 'Jan 10, 2024' },
    { id: '3', doctor: 'Dr. Emily Brown', specialty: 'Mental Health', date: 'Dec 20, 2023' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Medical Records</h1>
            <p className="text-muted-foreground">Access your health documents securely</p>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <Tabs defaultValue="prescriptions" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="prescriptions" className="gap-2">
              <Pill className="h-4 w-4" />
              Prescriptions
            </TabsTrigger>
            <TabsTrigger value="lab-results" className="gap-2">
              <TestTube className="h-4 w-4" />
              Lab Results
            </TabsTrigger>
            <TabsTrigger value="consultation-notes" className="gap-2">
              <Stethoscope className="h-4 w-4" />
              Consultation Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions">
            <div className="grid gap-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-primary/10">
                          <Pill className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{prescription.medication}</h3>
                          <p className="text-sm text-muted-foreground">Prescribed by {prescription.doctor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          prescription.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                        }`}>
                          {prescription.status}
                        </span>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{prescription.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lab-results">
            <div className="grid gap-4">
              {labResults.map((result) => (
                <Card key={result.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-accent/10">
                          <TestTube className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{result.test}</h3>
                          <p className="text-sm text-muted-foreground">{result.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          result.status === 'Normal' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}>
                          {result.status}
                        </span>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="consultation-notes">
            <div className="grid gap-4">
              {consultationNotes.map((note) => (
                <Card key={note.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-success/10">
                          <FileText className="h-6 w-6 text-success" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{note.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{note.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{note.date}</span>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default MedicalRecordsPage;
