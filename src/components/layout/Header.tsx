import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserInitial = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">MediConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/specialties" className="text-muted-foreground hover:text-foreground transition-colors">
            Specialties
          </Link>
          <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getUserInitial()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getUserInitial()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium truncate max-w-[150px]">
                      {user.user_metadata?.full_name || 'User'}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                      {user.email}
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/appointments')}>
                  My Appointments
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/auth?mode=signup')}>
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-4">
            <Link 
              to="/specialties" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Specialties
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              {user ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getUserInitial()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </div>
                  <Button variant="outline" onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}>
                    Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => { navigate('/appointments'); setMobileMenuOpen(false); }}>
                    My Appointments
                  </Button>
                  <Button variant="destructive" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => { navigate('/auth'); setMobileMenuOpen(false); }}>
                    Sign In
                  </Button>
                  <Button onClick={() => { navigate('/auth?mode=signup'); setMobileMenuOpen(false); }}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
