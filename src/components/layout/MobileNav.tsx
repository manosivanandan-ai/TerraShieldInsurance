import { Link, useLocation } from 'react-router-dom';
import { Home, Shield, FileText, HeadphonesIcon, User } from 'lucide-react';

const tabs = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Insurance', to: '/insurance', icon: Shield },
  { label: 'My Policies', to: '/customer-portal', icon: FileText },
  { label: 'Support', to: '/support', icon: HeadphonesIcon },
  { label: 'Account', to: '/login', icon: User },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = location.pathname === tab.to ||
            (tab.to !== '/' && location.pathname.startsWith(tab.to));
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-colors min-w-[60px] ${
                active ? 'text-brand-teal' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'stroke-2' : 'stroke-1.5'}`} />
              <span className={`text-[10px] font-medium ${active ? 'text-brand-teal' : ''}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
