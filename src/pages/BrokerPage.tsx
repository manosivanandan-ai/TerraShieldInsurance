import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Users, TrendingUp, Shield, Zap, Award, BarChart } from 'lucide-react';
import { registerBroker } from '../services/brokerService';

const states = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
const productsList = ['Motor', 'Home', 'Travel', 'Life', 'Business'];
const contactMethods = ['Email', 'Phone', 'Video Call'];

const benefits = [
  { icon: TrendingUp, title: 'Competitive Commission', desc: 'Earn up to 15% commission on all policies you place through TerraShield.' },
  { icon: Shield, title: 'Broad Product Range', desc: 'Access to Motor, Home, Travel, Life and Business insurance products.' },
  { icon: Users, title: 'Dedicated BRM', desc: 'Your own Broker Relationship Manager for support, training and growth.' },
  { icon: Zap, title: 'Digital Broker Portal', desc: 'Manage customers, quotes and policies through our modern broker portal.' },
  { icon: Award, title: 'Fast Turnaround', desc: 'Applications processed within 2 business days — no paperwork delays.' },
  { icon: BarChart, title: 'Performance Insights', desc: 'Dashboard analytics to track your portfolio, commissions and renewals.' },
];

export default function BrokerPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', businessName: '', email: '', phone: '',
    abn: '', address: '', suburb: '', state: '', postcode: '',
    years: '', customers: '', products: [] as string[],
    currentProducts: '', message: '', contact: '', consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ref, setRef] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string | boolean | string[]) => setForm(f => ({ ...f, [k]: v }));

  const toggleProduct = (p: string) => {
    setForm(f => ({
      ...f,
      products: f.products.includes(p) ? f.products.filter(x => x !== p) : [...f.products, p],
    }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = 'Required';
    if (!form.lastName) e.lastName = 'Required';
    if (!form.businessName) e.businessName = 'Required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone) e.phone = 'Required';
    if (!form.abn) e.abn = 'ABN is required';
    if (!form.address) e.address = 'Required';
    if (!form.state) e.state = 'Required';
    if (!form.consent) e.consent = 'You must agree to proceed';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const r = await registerBroker({ ...form, products: form.products } as any);
      setRef(r);
    } finally {
      setLoading(false);
    }
  };

  if (ref) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-brand-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-brand-teal" />
          </div>
          <h1 className="text-2xl font-bold text-brand-navy mb-2">
            Thank you for your interest in becoming a TerraShield Broker!
          </h1>
          <p className="text-gray-500 mb-6">
            Your application has been received. Our broker team will review your application and contact you within 2 business days.
          </p>
          <div className="card mb-6">
            <p className="text-gray-500 text-sm mb-1">Application Reference</p>
            <p className="text-2xl font-bold text-brand-teal">{ref}</p>
          </div>
          <div className="space-y-3">
            <Link to="/login?type=broker" className="block btn-primary text-center">Broker Login</Link>
            <Link to="/" className="block btn-secondary text-center">Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const field = (name: string, label: string, type = 'text', placeholder = '', required = true) => (
    <div>
      <label className="form-label">{label}{required ? ' *' : ''}</label>
      <input
        type={type}
        className={`form-input ${errors[name] ? 'border-red-400' : ''}`}
        value={form[name as keyof typeof form] as string}
        onChange={e => set(name, e.target.value)}
        placeholder={placeholder}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-gradient py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-5">
              <Users className="w-4 h-4 text-brand-teal" />
              <span className="text-sm font-medium">TerraShield Broker Network</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Become a TerraShield Broker
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Join our broker network and give your customers access to flexible insurance solutions backed by a connected digital experience.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Why partner with TerraShield?</h2>
            <p className="section-subheading mx-auto">Everything you need to grow your insurance business.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(b => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="card flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-1">{b.title}</h3>
                    <p className="text-gray-500 text-sm">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="register" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand-navy">Apply to Become a Broker</h2>
            <p className="text-gray-500 mt-2">Complete the form below and our team will be in touch within 2 business days.</p>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-5">
            <h3 className="text-lg font-bold text-brand-navy border-b border-gray-100 pb-3">Broker Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {field('firstName', 'First Name', 'text', 'Michael')}
              {field('lastName', 'Last Name', 'text', 'Anderson')}
            </div>
            {field('businessName', 'Business Name', 'text', 'Anderson Insurance Partners')}
            {field('email', 'Business Email', 'email', 'michael@business.com.au')}
            {field('phone', 'Phone Number', 'tel', '04XX XXX XXX')}
            {field('abn', 'ABN', 'text', '00 000 000 000')}
            {field('address', 'Business Address', 'text', '88 Collins Street')}
            <div className="grid grid-cols-3 gap-4">
              {field('suburb', 'Suburb', 'text', 'Melbourne')}
              <div>
                <label className="form-label">State *</label>
                <select
                  className={`form-input ${errors.state ? 'border-red-400' : ''}`}
                  value={form.state}
                  onChange={e => set('state', e.target.value)}
                >
                  <option value="">Select</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>
              {field('postcode', 'Postcode', 'text', '3000')}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {field('years', 'Years in Business', 'number', 'e.g. 10', false)}
              {field('customers', 'Number of Customers', 'number', 'e.g. 150', false)}
            </div>
            {field('currentProducts', 'Products Currently Sold', 'text', 'e.g. Motor, Home, Business', false)}

            <h3 className="text-lg font-bold text-brand-navy border-b border-gray-100 pb-3 pt-2">Product Interests</h3>
            <div>
              <label className="form-label">Which TerraShield products are you interested in?</label>
              <div className="flex flex-wrap gap-2">
                {productsList.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => toggleProduct(p)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                      form.products.includes(p)
                        ? 'border-brand-teal bg-brand-teal text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="text-lg font-bold text-brand-navy border-b border-gray-100 pb-3 pt-2">Additional Information</h3>
            <div>
              <label className="form-label">Message (optional)</label>
              <textarea
                className="form-input min-h-[100px] resize-none"
                value={form.message}
                onChange={e => set('message', e.target.value)}
                placeholder="Tell us about your business and why you want to partner with TerraShield..."
              />
            </div>
            <div>
              <label className="form-label">Preferred Contact Method</label>
              <div className="flex gap-3 flex-wrap">
                {contactMethods.map(m => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contact"
                      value={m}
                      checked={form.contact === m}
                      onChange={() => set('contact', m)}
                    />
                    <span className="text-sm text-gray-700">{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={e => set('consent', e.target.checked)}
                  className="mt-0.5 w-4 h-4 flex-shrink-0"
                />
                <span className="text-sm text-gray-600">
                  I confirm the information provided is accurate and agree to TerraShield's{' '}
                  <Link to="/legal/privacy" className="text-brand-teal hover:underline">Privacy Policy</Link> and{' '}
                  <Link to="/legal/terms" className="text-brand-teal hover:underline">Terms of Service</Link>.
                </span>
              </label>
              {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-70"
            >
              {loading ? 'Submitting Application...' : <>Apply to Become a Broker <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </section>

      {/* Existing broker login CTA */}
      <section className="py-12 bg-brand-teal">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Already a TerraShield Broker?</h3>
          <p className="text-white/80 mb-6">Log in to access your broker portal and manage your customers.</p>
          <Link to="/login?type=broker" className="btn-primary bg-white text-brand-teal hover:bg-gray-50 shadow-none">
            Broker Login <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
