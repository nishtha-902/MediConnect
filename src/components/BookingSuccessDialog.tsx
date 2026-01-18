import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Clock, User, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingDetails: {
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    patientName: string;
    paymentId: string;
  };
}

const BookingSuccessDialog = ({ open, onOpenChange, bookingDetails }: BookingSuccessDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-center">Booking Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Your appointment has been successfully booked
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-muted p-4 space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Doctor</p>
                <p className="font-medium">{bookingDetails.doctorName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{bookingDetails.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{bookingDetails.time}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 p-3 rounded-lg">
            <Mail className="h-4 w-4" />
            <span>A confirmation email has been sent to your registered email</span>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Payment ID: {bookingDetails.paymentId}
          </p>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              onOpenChange(false);
              navigate('/appointments');
            }}
          >
            View Appointments
          </Button>
          <Button 
            className="flex-1"
            onClick={() => {
              onOpenChange(false);
              navigate('/');
            }}
          >
            Go Home
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingSuccessDialog;
