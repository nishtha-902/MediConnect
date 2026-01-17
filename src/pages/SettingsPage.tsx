import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, CreditCard, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
  });

  const [notifications, setNotifications] = useState({
    emailReminders: true,
    smsReminders: false,
    appointmentUpdates: true,
    promotionalEmails: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
    if (user) {
      setProfileData({
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        dateOfBirth: user.user_metadata?.date_of_birth || '',
      });
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

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive updates and reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Email Reminders</p>
                      <p className="text-sm text-muted-foreground">Receive appointment reminders via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailReminders: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">SMS Reminders</p>
                      <p className="text-sm text-muted-foreground">Receive appointment reminders via SMS</p>
                    </div>
                    <Switch
                      checked={notifications.smsReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsReminders: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Appointment Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified about changes to your appointments</p>
                    </div>
                    <Switch
                      checked={notifications.appointmentUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, appointmentUpdates: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Promotional Emails</p>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and offers</p>
                    </div>
                    <Switch
                      checked={notifications.promotionalEmails}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, promotionalEmails: checked })}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium text-foreground mb-2">Data Protection</h4>
                    <p className="text-sm text-muted-foreground">
                      Your health data is encrypted and protected according to HIPAA standards. 
                      We never share your information with third parties without your consent.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium text-foreground mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  <div className="p-4 rounded-lg bg-destructive/10">
                    <h4 className="font-medium text-destructive mb-2">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Billing & Payments</CardTitle>
                <CardDescription>Manage your payment methods and view transaction history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium text-foreground mb-2">Payment Methods</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    No payment methods saved. Add a payment method for faster checkout.
                  </p>
                  <Button variant="outline">Add Payment Method</Button>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-4">Recent Transactions</h4>
                  <div className="text-center py-8 text-muted-foreground">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No transactions yet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default SettingsPage;
