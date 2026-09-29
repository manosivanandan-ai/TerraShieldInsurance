import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Phone, Clock, FileText, ChevronRight,
  CheckCircle, MessageSquare
} from 'lucide-react';
import Accordion from '../components/common/Accordion';

const faqItems = [
  { question: 'How do I track my support request?', answer: 'Log in to your customer portal and click "Support" to view all your support requests and their current status.' },
  { question: 'What is your support response time?', answer: 'We aim to respond to all requests within 24 hours on business days. Urgent claims are typically actioned within 4 hours.' },
  { question: 'How do I submit a claims enquiry?', answer: 'Log into your portal, select "Claims" and then "Submit Enquiry". Alternatively, call us on 1800 000 000 during business hours.' },
  { question: 'Can I update my policy details online?', answer: 'You can view your policy details in the customer portal. To make changes, submit a support request or call us.' },
  { question: 'What do I do in an emergency?', answer: 'Call our 24/7 emergency line on 1800 000 000. For roadside assistance, the number is on your motor policy document.' },
];

export default function SupportPage() {
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', category: 'General Enquiry', message: '' });
  const [submitted, setSubmitted] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TS-${Math.floor(Math.random() * 90000 + 10000)}`;
    setSubmitted(ref);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-gradient py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">We're here to help</h1>
            <p className="text-white/70 text-lg">
              Get support for claims, policies, payments and anything else. Our team is ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: FileText,
                title: 'View My Tickets',
                desc: 'Track your existing support requests',
                to: '/customer-portal',
                cta: 'Track My Request',
                color: 'bg-blue-50 text-blue-600',
              },
              {
                icon: MessageSquare,
                title: 'Submit a Request',
                desc: 'Create a new support ticket',
                action: () => setShowNewTicket(true),
                cta: 'New Request',
                color: 'bg-brand-teal/10 text-brand-teal',
              },
              {
                icon: Mail,
                title: 'Email Support',
                desc: 'support@terrashield.example',
                href: 'mailto:support@terrashield.example',
                cta: 'Send Email',
                color: 'bg-purple-50 text-purple-600',
              },
              {
                icon: Phone,
                title: 'Call Us',
                desc: '1800 000 000 (Mon–Fri, 8am–6pm)',
                href: 'tel:1800000000',
                cta: 'Call Now',
                color: 'bg-emerald-50 text-emerald-600',
              },
            ].map(opt => {
              const Icon = opt.icon;
              const inner = (
                <div className="card h-full flex flex-col hover:scale-[1.02] transition-transform group">
                  <div className={`w-12 h-12 rounded-xl ${opt.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-brand-navy mb-1">{opt.title}</h3>
                  <p className="text-sm text-gray-500 flex-1">{opt.desc}</p>
                  <div className="flex items-center gap-1 text-brand-teal font-medium text-sm mt-4">
                    {opt.cta} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );

              if (opt.to) return <Link key={opt.title} to={opt.to}>{inner}</Link>;
              if (opt.href) return <a key={opt.title} href={opt.href}>{inner}</a>;
              return (
                <button key={opt.title} onClick={opt.action} className="text-left">
                  {inner}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <Phone className="w-8 h-8 text-brand-teal mx-auto mb-3" />
              <h3 className="font-bold text-brand-navy mb-1">Phone Support</h3>
              <p className="text-2xl font-semibold text-gray-700 my-2">1800 000 000</p>
              <p className="text-sm text-gray-500">Calls are free from Australian landlines and mobiles</p>
            </div>
            <div className="card text-center">
              <Mail className="w-8 h-8 text-brand-teal mx-auto mb-3" />
              <h3 className="font-bold text-brand-navy mb-1">Email Support</h3>
              <p className="text-base font-semibold text-gray-700 my-2">support@terrashield.example</p>
              <p className="text-sm text-gray-500">We respond to all emails within 24 business hours</p>
            </div>
            <div className="card text-center">
              <Clock className="w-8 h-8 text-brand-teal mx-auto mb-3" />
              <h3 className="font-bold text-brand-navy mb-1">Support Hours</h3>
              <p className="text-base font-semibold text-gray-700 my-2">Mon–Fri, 8:00 AM – 6:00 PM AEST</p>
              <p className="text-sm text-gray-500">Online portal available 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            {submitted ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-brand-teal mx-auto mb-3" />
                <h3 className="text-xl font-bold text-brand-navy mb-2">Request Submitted!</h3>
                <p className="text-gray-500 mb-3">Your support ticket reference is:</p>
                <div className="font-mono text-2xl font-bold text-brand-teal mb-5">{submitted}</div>
                <p className="text-sm text-gray-400 mb-5">We'll be in touch within 24 hours.</p>
                <button
                  onClick={() => { setShowNewTicket(false); setSubmitted(''); setForm({ name: '', email: '', subject: '', category: 'General Enquiry', message: '' }); }}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-brand-navy">New Support Request</h2>
                  <button onClick={() => setShowNewTicket(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Your Name *</label>
                      <input className="form-input" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className="form-label">Email *</label>
                      <input type="email" className="form-input" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Category</label>
                    <select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                      {['Claims', 'Policy', 'Payment', 'General Enquiry', 'Document Request', 'Cancellation', 'Technical'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Subject *</label>
                    <input className="form-input" required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Brief description of your issue" />
                  </div>
                  <div>
                    <label className="form-label">Message *</label>
                    <textarea
                      className="form-input min-h-[100px] resize-none"
                      required
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Please describe your issue in detail..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setShowNewTicket(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                    <button type="submit" className="btn-primary flex-1 justify-center">Submit Request</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="section-heading">Frequently Asked Questions</h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
