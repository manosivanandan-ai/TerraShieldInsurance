import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

const footerSections = [
  {
    title: 'Insurance',
    links: [
      { label: 'Motor Insurance', to: '/insurance#motor' },
      { label: 'Home & Contents', to: '/insurance#home' },
      { label: 'Travel Insurance', to: '/insurance#travel' },
      { label: 'Life Insurance', to: '/insurance#life' },
      { label: 'Business Insurance', to: '/insurance#business' },
    ],
  },
  {
    title: 'Customers',
    links: [
      { label: 'Get a Quote', to: '/get-quote' },
      { label: 'My Policies', to: '/customer-portal' },
      { label: 'Claims', to: '/customer-portal' },
      { label: 'Support', to: '/support' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    title: 'Brokers',
    links: [
      { label: 'Become a Broker', to: '/brokers#register' },
      { label: 'Broker Login', to: '/login?type=broker' },
      { label: 'Broker Support', to: '/support' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Careers', to: '/about#careers' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/legal/privacy' },
      { label: 'Terms of Service', to: '/legal/terms' },
      { label: 'Cookie Policy', to: '/legal/cookies' },
      { label: 'Complaints', to: '/legal/complaints' },
      { label: 'Cancellations & Refunds', to: '/cancellations' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-none">TerraShield</div>
                <div className="text-[11px] text-brand-teal font-medium leading-none mt-0.5">Insurance</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Protection for what matters. Simple, flexible insurance for Australians.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <span>1800 000 000</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <span>support@terrashield.example</span>
              </div>
              <div className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                <span>Level 20, 1 Market Street, Sydney NSW 2000</span>
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TerraShield Insurance Pty Ltd. ABN 12 345 678 901. AFSL 000000. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            This is a fictional demonstration. Not a real insurance product.
          </p>
        </div>
      </div>

      {/* Mobile bottom nav spacer */}
      <div className="md:hidden h-16" />
    </footer>
  );
}
