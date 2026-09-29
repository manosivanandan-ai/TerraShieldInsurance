import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield } from 'lucide-react';
import { registerCustomer } from '../services/customerService';

const states = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
const products = ['Motor Insurance', 'Home & Contents Insurance', 'Travel Insurance', 'Life Insurance', 'Business Insurance'];
const contactMethods = ['Email', 'Phone', 'SMS'];

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', dob: '',
    address: '', suburb: '', state: '', postcode: '',
    product: '', contact: '', consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ref, setRef] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = 'Required';
    if (!form.lastName) e.lastName = 'Required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone) e.phone = 'Required';
    if (!form.dob) e.dob = 'Required';
    if (!form.address) e.address = 'Required';
    if (!form.suburb) e.suburb = 'Required';
    if (!form.state) e.state = 'Required';
    if (!form.postcode) e.postcode = 'Required';
    if (!form.consent) e.consent = 'You must agree to proceed';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const r = await registerCustomer({ ...form, consent: String(form.consent) });
      setRef(r);
    } finally {
      setLoading(false);
    }
  };

  if (ref) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-brand-navy mb-2">Welcome to TerraShield!</h1>
          <p className="text-gray-500 mb-6">Your registration has been received. We will be in touch shortly.</p>
          <div className="card mb-6">
            <p className="text-gray-500 text-sm mb-1">Your reference number</p>
            <p className="text-2xl font-bold text-brand-teal">{ref}</p>
          </div>
          <div className="space-y-3">
            <Link to="/get-quote" className="block btn-primary text-center">Get a Quote</Link>
            <Link to="/" className="block btn-secondary text-center">Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const field = (name: string, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="form-label">{label} *</label>
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Shield className="w-12 h-12 text-brand-teal mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-brand-navy">Get Started with TerraShield</h1>
          <p className="text-gray-500 mt-2">Create your account to manage policies, claims and support all in one place.</p>
          <p className="text-sm text-gray-400 mt-2">
            Already have an account? <Link to="/login" className="text-brand-teal hover:underline">Sign in</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          <h2 className="text-lg font-bold text-brand-navy border-b border-gray-100 pb-3">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {field('firstName', 'First Name', 'text', 'Jane')}
            {field('lastName', 'Last Name', 'text', 'Smith')}
          </div>
          {field('email', 'Email Address', 'email', 'jane.smith@email.com')}
          <div className="grid grid-cols-2 gap-4">
            {field('phone', 'Mobile Number', 'tel', '04XX XXX XXX')}
            {field('dob', 'Date of Birth', 'date')}
          </div>

          <h2 className="text-lg font-bold text-brand-navy border-b border-gray-100 pb-3 pt-2">Address</h2>
          {field('address', 'Street Address', 'text', '123 Main Street')}
          <div className="grid grid-cols-3 gap-4">
            {field('suburb', 'Suburb', 'text', 'Sydney')}
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
            {field('postcode', 'Postcode', 'text', '2000')}
          </div>

          <h2 className="text-lg font-bold text-brand-navy border-b border-gray-100 pb-3 pt-2">Preferences</h2>
          <div>
            <label className="form-label">Insurance Product Interested In</label>
            <select
              className="form-input"
              value={form.product}
              onChange={e => set('product', e.target.value)}
            >
              <option value="">Select a product</option>
              {products.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
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
                    className="text-brand-teal"
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
                className="mt-0.5 text-brand-teal w-4 h-4 flex-shrink-0"
              />
              <span className="text-sm text-gray-600">
                I agree to TerraShield's <Link to="/legal/privacy" className="text-brand-teal hover:underline">Privacy Policy</Link> and{' '}
                <Link to="/legal/terms" className="text-brand-teal hover:underline">Terms of Service</Link>. I consent to being contacted about insurance products and services.
              </span>
            </label>
            {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Create My Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
