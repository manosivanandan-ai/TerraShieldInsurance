import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

const reasons = [
  'General Enquiry', 'Get a Quote', 'Existing Policy', 'Claims',
  'Broker Partnership', 'Technical Support', 'Other',
];
const products = ['Motor Insurance', 'Home & Contents', 'Travel Insurance', 'Life Insurance', 'Business Insurance', 'Not sure'];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', reason: '', product: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-gradient py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact TerraShield</h1>
            <p className="text-white/70 text-lg">We'd love to hear from you. Get in touch with our team.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-brand-navy mb-6">Send us a message</h2>
              {submitted ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <CheckCircle className="w-12 h-12 text-brand-teal mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-brand-navy mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Thank you for contacting TerraShield. We will respond within 24 business hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', reason: '', product: '', message: '' }); }}
                    className="btn-primary mt-6 inline-flex"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Name *</label>
                      <input className="form-input" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className="form-label">Email *</label>
                      <input type="email" className="form-input" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="04XX XXX XXX" />
                  </div>
                  <div>
                    <label className="form-label">Reason for Contact *</label>
                    <select className="form-input" required value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}>
                      <option value="">Select a reason</option>
                      {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Insurance Product</label>
                    <select className="form-input" value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))}>
                      <option value="">Select a product (optional)</option>
                      {products.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Message *</label>
                    <textarea
                      className="form-input min-h-[130px] resize-none"
                      required
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="How can we help you today?"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-brand-navy mb-6">Get in touch</h2>
              <div className="space-y-5 mb-8">
                {[
                  { icon: Phone, title: 'Phone', lines: ['1800 000 000', 'Free from Australian landlines & mobiles'] },
                  { icon: Mail, title: 'Email', lines: ['support@terrashield.example', 'claims@terrashield.example', 'brokers@terrashield.example'] },
                  { icon: MapPin, title: 'Head Office', lines: ['Level 20, 1 Market Street', 'Sydney NSW 2000', 'Australia'] },
                  { icon: Clock, title: 'Support Hours', lines: ['Monday – Friday', '8:00 AM – 6:00 PM AEST', 'Online portal: 24/7'] },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-brand-teal" />
                      </div>
                      <div>
                        <div className="font-semibold text-brand-navy mb-1">{item.title}</div>
                        {item.lines.map(l => <div key={l} className="text-sm text-gray-600">{l}</div>)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Department contacts */}
              <div className="bg-brand-navy rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4">Specific Departments</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { dept: 'Claims', email: 'claims@terrashield.example' },
                    { dept: 'Broker Relations', email: 'brokers@terrashield.example' },
                    { dept: 'Complaints', email: 'complaints@terrashield.example' },
                    { dept: 'Media Enquiries', email: 'media@terrashield.example' },
                  ].map(d => (
                    <div key={d.dept} className="flex justify-between">
                      <span className="text-white/60">{d.dept}</span>
                      <span className="text-white/90">{d.email}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
