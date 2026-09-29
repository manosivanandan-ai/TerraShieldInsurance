import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Insurance', to: '/insurance' },
  { label: 'For Brokers', to: '/brokers' },
  { label: 'About Us', to: '/about' },
  { label: 'Support', to: '/support' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated, userType, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const portalPath = userType === 'broker' ? '/broker-portal' : '/customer-portal';
  const portalLabel = userType === 'broker' ? 'Broker Portal' : 'My TerraShield';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center group-hover:bg-brand-teal transition-colors">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-brand-navy text-lg leading-none">TerraShield</span>
              <div className="text-[10px] text-brand-teal font-medium leading-none">Insurance</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-brand-teal bg-brand-teal/10'
                    : 'text-gray-600 hover:text-brand-navy hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-brand-navy hover:bg-gray-50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-teal/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-brand-teal" />
                  </div>
                  {portalLabel}
                  <ChevronDown className={`w-4 h-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <Link
                      to={portalPath}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4" /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-brand-navy transition-colors px-3 py-2"
              >
                Login
              </Link>
            )}
            <Link
              to="/get-quote"
              className="btn-primary text-sm py-2.5 px-5"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-brand-teal bg-brand-teal/10'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-4">
            {isAuthenticated ? (
              <>
                <Link
                  to={portalPath}
                  className="block w-full btn-secondary text-center text-sm py-2.5"
                >
                  {portalLabel}
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center text-sm font-medium text-red-600 py-2.5"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block w-full btn-secondary text-center text-sm py-2.5"
              >
                Login
              </Link>
            )}
            <Link
              to="/get-quote"
              className="block w-full btn-primary text-center text-sm py-2.5"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
