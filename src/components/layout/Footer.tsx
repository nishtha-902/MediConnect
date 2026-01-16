import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">MediConnect</span>
            </div>
            <p className="text-background/70 text-sm">
              Quality healthcare accessible from anywhere. Connect with certified doctors instantly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/specialties" className="hover:text-background transition-colors">Find a Doctor</Link></li>
              <li><Link to="/how-it-works" className="hover:text-background transition-colors">How It Works</Link></li>
              <li><Link to="/about" className="hover:text-background transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-background transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>General Consultation</li>
              <li>Mental Health</li>
              <li>Dermatology</li>
              <li>Pediatrics</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@mediconnect.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                1-800-MEDI-CON
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Available Worldwide
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© 2024 MediConnect. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-background transition-colors">Terms of Service</Link>
            <Link to="/hipaa" className="hover:text-background transition-colors">HIPAA Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
