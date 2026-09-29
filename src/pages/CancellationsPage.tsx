import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const requestTypes = [
  'Policy Cancellation',
  'Premium Refund Enquiry',
  'Policy Amendment',
  'Cooling-off Period Enquiry',
  'Payment Correction',
];
const policyTypes = ['Motor Insurance', 'Home & Contents Insurance', 'Travel Insurance', 'Life Insurance', 'Business Insurance'];

export default function CancellationsPage() {
  const [form, setForm] = useState({
    name: '', policyNumber: '', email: '', policyType: '', requestType: '', reason: '', details: '',
  });
  const [submitted, setSubmitted] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(`TS-REQ-${Math.floor(Math.random() * 90000 + 10000)}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-gradient py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Cancellations & Refunds</h1>
            <p className="text-white/70 text-lg">
              We make it easy to manage your policy, including cancellations, refunds and amendments.
            </p>
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">Your options</h2>
              <p className="text-gray-600 mb-6">
                TerraShield customers can request any of the following at any time. Our team will process your request and follow up within 2 business days.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  { title: 'Policy Cancellation', desc: 'Cancel your policy at any time. Pro-rata refund may apply.' },
                  { title: 'Premium Refund Enquiry', desc: 'If you believe you have been overcharged, we will investigate and refund where applicable.' },
                  { title: 'Policy Amendment', desc: 'Update your coverage, add or remove optional extras, or change your payment method.' },
                  { title: 'Cooling-off Period', desc: 'Cancel within 21 days of policy inception for a full refund if no claims have been made.' },
                  { title: 'Payment Correction', desc: 'If an incorrect payment has been taken, we will correct it promptly.' },
                ].map(item => (
                  <li key={item.title} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-brand-navy text-sm">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <strong>Important:</strong> Cancellations during the cooling-off period (within 21 days, no claims made) are entitled to a full refund. Outside this period, refunds are calculated on a pro-rata basis less any administration fees.
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-brand-navy mb-6">Request Cancellation or Refund</h2>
              {submitted ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <CheckCircle className="w-12 h-12 text-brand-teal mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-brand-navy mb-2">Request Submitted</h3>
                  <p className="text-gray-500 mb-3">Your request reference is:</p>
                  <div className="font-mono text-2xl font-bold text-brand-teal mb-5">{submitted}</div>
                  <p className="text-sm text-gray-400">
                    Our team will review your request and respond within 2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="form-label">Customer Name *</label>
                    <input className="form-input" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Jane Smith" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Policy Number *</label>
                      <input className="form-input" required value={form.policyNumber} onChange={e => setForm(f => ({ ...f, policyNumber: e.target.value }))} placeholder="TS-MOT-XXXX-XXXXX" />
                    </div>
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input type="email" className="form-input" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Policy Type *</label>
                    <select className="form-input" required value={form.policyType} onChange={e => setForm(f => ({ ...f, policyType: e.target.value }))}>
                      <option value="">Select policy type</option>
                      {policyTypes.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Request Type *</label>
                    <select className="form-input" required value={form.requestType} onChange={e => setForm(f => ({ ...f, requestType: e.target.value }))}>
                      <option value="">Select request type</option>
                      {requestTypes.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Reason *</label>
                    <input className="form-input" required value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} placeholder="Brief reason for your request" />
                  </div>
                  <div>
                    <label className="form-label">Additional Details</label>
                    <textarea
                      className="form-input min-h-[100px] resize-none"
                      value={form.details}
                      onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
                      placeholder="Any additional information that may help us process your request..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base">
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
