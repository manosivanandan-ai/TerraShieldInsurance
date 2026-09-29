import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield, AlertCircle, HeadphonesIcon, TrendingUp,
  ChevronRight, Plus, Send, CheckCircle, Clock, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getCustomer, getPolicies, getClaims, getTickets, replyToTicket, createTicket } from '../services/customerService';
import type { Customer, Policy, Claim, SupportTicket } from '../types';
import StatusBadge from '../components/common/StatusBadge';
import { formatDate, formatDateTime, formatCurrency, relativeDate, daysUntil } from '../utils/helpers';

type View = 'overview' | 'policies' | 'policy-detail' | 'claims' | 'support' | 'ticket-detail' | 'new-ticket';

export default function CustomerPortalPage() {
  const { isAuthenticated, userId, logout } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<View>('overview');
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', description: '', category: 'General Enquiry' });
  const [ticketSubmitted, setTicketSubmitted] = useState('');

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (userId) {
      Promise.all([
        getCustomer(userId),
        getPolicies(userId),
        getClaims(userId),
        getTickets(userId),
      ]).then(([c, p, cl, t]) => {
        setCustomer(c);
        setPolicies(p);
        setClaims(cl);
        setTickets(t);
      });
    }
  }, [userId]);

  const handleReply = async () => {
    if (!selectedTicket || !replyText.trim() || !customer) return;
    setSending(true);
    await replyToTicket(selectedTicket.id, userId!, replyText, `${customer.firstName} ${customer.lastName}`);
    const updated = await getTickets(userId!);
    setTickets(updated);
    const updatedTicket = updated.find(t => t.id === selectedTicket.id);
    if (updatedTicket) setSelectedTicket(updatedTicket);
    setReplyText('');
    setSending(false);
  };

  const handleNewTicket = async () => {
    if (!newTicket.subject || !newTicket.description || !userId) return;
    const id = await createTicket({ customerId: userId, ...newTicket });
    setTicketSubmitted(id);
    const updated = await getTickets(userId);
    setTickets(updated);
  };

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activePolicies = policies.filter(p => p.status === 'Active');
  const openClaims = claims.filter(c => !['Paid', 'Rejected', 'Closed'].includes(c.status));
  const openTickets = tickets.filter(t => !['Resolved', 'Closed'].includes(t.status));
  const soonestRenewal = activePolicies.filter(p => p.expiryDate).sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())[0];

  const navItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'policies', label: 'My Policies', icon: Shield },
    { id: 'claims', label: 'Claims', icon: AlertCircle },
    { id: 'support', label: 'Support', icon: HeadphonesIcon },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-60 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-card p-5 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-teal/20 flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-brand-teal">
                  {customer.firstName[0]}{customer.lastName[0]}
                </span>
              </div>
              <div className="font-bold text-brand-navy">{customer.firstName} {customer.lastName}</div>
              <div className="text-xs text-gray-400 mt-0.5">{customer.email}</div>
              <div className="text-xs text-gray-400 mt-1">Member since {formatDate(customer.memberSince)}</div>
            </div>
            <nav className="bg-white rounded-2xl shadow-card p-3 space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id as View)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      view === item.id || (view === 'policy-detail' && item.id === 'policies') || (view === 'ticket-detail' && item.id === 'support') || (view === 'new-ticket' && item.id === 'support')
                        ? 'bg-brand-teal text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
              <hr className="my-2 border-gray-100" />
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Overview */}
            {view === 'overview' && (
              <div>
                <h1 className="text-2xl font-bold text-brand-navy mb-6">
                  Welcome back, {customer.firstName} 👋
                </h1>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Active Policies', value: activePolicies.length, icon: Shield, color: 'bg-brand-teal/10 text-brand-teal', action: () => setView('policies') },
                    { label: 'Open Claims', value: openClaims.length, icon: AlertCircle, color: 'bg-amber-100 text-amber-600', action: () => setView('claims') },
                    { label: 'Support Requests', value: openTickets.length, icon: HeadphonesIcon, color: 'bg-purple-100 text-purple-600', action: () => setView('support') },
                    {
                      label: soonestRenewal ? 'Next Renewal' : 'No Renewals',
                      value: soonestRenewal ? `${daysUntil(soonestRenewal.expiryDate)} days` : '—',
                      icon: Clock,
                      color: 'bg-blue-100 text-blue-600',
                      action: () => setView('policies'),
                      sub: soonestRenewal?.productName,
                    },
                  ].map(card => {
                    const Icon = card.icon;
                    return (
                      <button
                        key={card.label}
                        onClick={card.action}
                        className="card text-left hover:scale-[1.02] transition-transform group"
                      >
                        <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-2xl font-bold text-brand-navy">{card.value}</div>
                        <div className="text-sm text-gray-500 mt-0.5">{card.label}</div>
                        {card.sub && <div className="text-xs text-gray-400 mt-1 truncate">{card.sub}</div>}
                      </button>
                    );
                  })}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Recent Policies */}
                  <div className="card">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-bold text-brand-navy">My Policies</h2>
                      <button onClick={() => setView('policies')} className="text-xs text-brand-teal hover:underline">View all</button>
                    </div>
                    {activePolicies.length === 0 ? (
                      <div className="text-center py-6">
                        <Shield className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">No active policies</p>
                        <Link to="/insurance" className="text-xs text-brand-teal hover:underline mt-1 block">Explore Insurance →</Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {activePolicies.slice(0, 3).map(p => (
                          <button
                            key={p.id}
                            onClick={() => { setSelectedPolicy(p); setView('policy-detail'); }}
                            className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-brand-teal/5 transition-colors group"
                          >
                            <div className="text-left">
                              <div className="text-sm font-semibold text-brand-navy">{p.productName}</div>
                              <div className="text-xs text-gray-400">{p.policyNumber}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <StatusBadge status={p.status} />
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-teal" />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recent Tickets */}
                  <div className="card">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-bold text-brand-navy">Support Requests</h2>
                      <button onClick={() => setView('support')} className="text-xs text-brand-teal hover:underline">View all</button>
                    </div>
                    {tickets.length === 0 ? (
                      <div className="text-center py-6">
                        <HeadphonesIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">No support requests</p>
                        <button onClick={() => setView('new-ticket')} className="text-xs text-brand-teal hover:underline mt-1">Contact Support →</button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {tickets.slice(0, 3).map(t => (
                          <button
                            key={t.id}
                            onClick={() => { setSelectedTicket(t); setView('ticket-detail'); }}
                            className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-brand-teal/5 transition-colors group"
                          >
                            <div className="text-left flex-1 min-w-0 pr-2">
                              <div className="text-sm font-semibold text-brand-navy truncate">{t.subject}</div>
                              <div className="text-xs text-gray-400">{t.ticketNumber} · {relativeDate(t.lastUpdated)}</div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <StatusBadge status={t.status} />
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-teal" />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Policies List */}
            {view === 'policies' && (
              <div>
                <h1 className="text-2xl font-bold text-brand-navy mb-6">My Policies</h1>
                {policies.length === 0 ? (
                  <div className="card text-center py-12">
                    <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-500 mb-2">No active policies</h3>
                    <p className="text-sm text-gray-400 mb-4">You don't have any active policies yet.</p>
                    <Link to="/insurance" className="btn-primary inline-flex">Explore Insurance</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {policies.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setSelectedPolicy(p); setView('policy-detail'); }}
                        className="card w-full text-left hover:shadow-card-hover transition-shadow group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-2xl">
                              {p.productType === 'Motor' ? '🚗' : p.productType === 'Home' ? '🏠' : p.productType === 'Travel' ? '✈️' : p.productType === 'Life' ? '❤️' : '💼'}
                            </div>
                            <div>
                              <div className="font-bold text-brand-navy">{p.productName}</div>
                              <div className="text-sm text-gray-400">{p.policyNumber}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                              <div className="font-semibold text-brand-navy">{formatCurrency(p.premium)}<span className="text-xs text-gray-400">/{p.frequency === 'Monthly' ? 'mo' : 'yr'}</span></div>
                              <div className="text-xs text-gray-400">Expires {formatDate(p.expiryDate)}</div>
                            </div>
                            <StatusBadge status={p.status} />
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand-teal" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Policy Detail */}
            {view === 'policy-detail' && selectedPolicy && (
              <div>
                <button onClick={() => setView('policies')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-navy mb-4">
                  <ArrowLeft className="w-4 h-4" /> Back to Policies
                </button>
                <div className="card mb-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-3xl">
                      {selectedPolicy.productType === 'Motor' ? '🚗' : selectedPolicy.productType === 'Home' ? '🏠' : selectedPolicy.productType === 'Travel' ? '✈️' : selectedPolicy.productType === 'Life' ? '❤️' : '💼'}
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-brand-navy">{selectedPolicy.productName}</h1>
                      <div className="text-sm text-gray-400">{selectedPolicy.policyNumber}</div>
                    </div>
                    <StatusBadge status={selectedPolicy.status} className="ml-auto" />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Premium', value: `${formatCurrency(selectedPolicy.premium)} / ${selectedPolicy.frequency}` },
                      { label: 'Start Date', value: formatDate(selectedPolicy.startDate) },
                      { label: 'Expiry Date', value: formatDate(selectedPolicy.expiryDate) },
                      { label: 'Coverage Amount', value: formatCurrency(selectedPolicy.coverageAmount) },
                      { label: 'Product Type', value: selectedPolicy.productType },
                      { label: 'Next Renewal', value: selectedPolicy.nextRenewal ? formatDate(selectedPolicy.nextRenewal) : '—' },
                    ].map(item => (
                      <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                        <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                        <div className="font-semibold text-brand-navy text-sm">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <h3 className="font-bold text-brand-navy mb-3">Coverage Includes</h3>
                  <ul className="space-y-2">
                    {selectedPolicy.coverageDetails.map(d => (
                      <li key={d} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setView('new-ticket')} className="btn-secondary text-sm">
                    Submit Support Request
                  </button>
                </div>
              </div>
            )}

            {/* Claims */}
            {view === 'claims' && (
              <div>
                <h1 className="text-2xl font-bold text-brand-navy mb-6">My Claims</h1>
                {claims.length === 0 ? (
                  <div className="card text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No claims found.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {claims.map(c => (
                      <div key={c.id} className="card">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-brand-navy">{c.claimNumber}</span>
                              <StatusBadge status={c.status} />
                            </div>
                            <div className="font-semibold text-gray-700 text-sm">{c.subject}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {c.policyType} Insurance · Lodged {formatDate(c.lodgedDate)}
                            </div>
                            {c.assessorName && (
                              <div className="text-xs text-gray-500 mt-1">Assessor: {c.assessorName}</div>
                            )}
                          </div>
                          {c.claimAmount && (
                            <div className="text-right">
                              <div className="text-sm text-gray-400">Claim Amount</div>
                              <div className="font-bold text-brand-navy">{formatCurrency(c.claimAmount)}</div>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">{c.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Support */}
            {view === 'support' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-brand-navy">My Support Requests</h1>
                  <button
                    onClick={() => setView('new-ticket')}
                    className="btn-primary text-sm py-2"
                  >
                    <Plus className="w-4 h-4" /> New Request
                  </button>
                </div>
                {tickets.length === 0 ? (
                  <div className="card text-center py-12">
                    <HeadphonesIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">You don't have any support requests.</p>
                    <button onClick={() => setView('new-ticket')} className="btn-primary inline-flex">
                      Contact Support
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-xs text-gray-400 text-left">
                            <th className="pb-3 pr-4">Ticket</th>
                            <th className="pb-3 pr-4">Subject</th>
                            <th className="pb-3 pr-4">Status</th>
                            <th className="pb-3">Last Updated</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tickets.map(t => (
                            <tr
                              key={t.id}
                              onClick={() => { setSelectedTicket(t); setView('ticket-detail'); }}
                              className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                              <td className="py-3 pr-4 font-mono text-sm text-brand-teal font-semibold">{t.ticketNumber}</td>
                              <td className="py-3 pr-4 text-sm text-brand-navy max-w-[200px] truncate">{t.subject}</td>
                              <td className="py-3 pr-4"><StatusBadge status={t.status} /></td>
                              <td className="py-3 text-sm text-gray-400">{relativeDate(t.lastUpdated)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Ticket Detail */}
            {view === 'ticket-detail' && selectedTicket && (
              <div>
                <button onClick={() => setView('support')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-navy mb-4">
                  <ArrowLeft className="w-4 h-4" /> Back to Support
                </button>
                <div className="card mb-4">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="font-mono text-brand-teal font-bold text-sm mb-1">{selectedTicket.ticketNumber}</div>
                      <h2 className="text-xl font-bold text-brand-navy">{selectedTicket.subject}</h2>
                    </div>
                    <StatusBadge status={selectedTicket.status} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { label: 'Category', value: selectedTicket.category },
                      { label: 'Priority', value: selectedTicket.priority },
                      { label: 'Created', value: formatDate(selectedTicket.createdDate) },
                      { label: 'Assigned to', value: selectedTicket.assignedAgent || 'Pending' },
                    ].map(item => (
                      <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                        <div className="text-xs text-gray-400">{item.label}</div>
                        <div className="text-sm font-semibold text-brand-navy mt-0.5">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversation */}
                <div className="card mb-4">
                  <h3 className="font-bold text-brand-navy mb-4">Conversation</h3>
                  <div className="space-y-4">
                    {selectedTicket.conversation.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.fromType === 'customer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.fromType === 'customer'
                            ? 'bg-brand-teal text-white rounded-tr-sm'
                            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                        }`}>
                          <div className={`text-xs font-semibold mb-1 ${
                            msg.fromType === 'customer' ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {msg.from}
                          </div>
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                          <div className={`text-xs mt-1 ${
                            msg.fromType === 'customer' ? 'text-white/50' : 'text-gray-400'
                          }`}>
                            {formatDateTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Box */}
                  {!['Resolved', 'Closed'].includes(selectedTicket.status) && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <textarea
                        className="form-input min-h-[80px] resize-none mb-2"
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                      />
                      <button
                        onClick={handleReply}
                        disabled={!replyText.trim() || sending}
                        className="btn-primary text-sm disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        {sending ? 'Sending...' : 'Send Reply'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* New Ticket */}
            {view === 'new-ticket' && (
              <div>
                <button onClick={() => setView('support')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-navy mb-4">
                  <ArrowLeft className="w-4 h-4" /> Back to Support
                </button>
                {ticketSubmitted ? (
                  <div className="card text-center py-12">
                    <CheckCircle className="w-12 h-12 text-brand-teal mx-auto mb-3" />
                    <h2 className="text-xl font-bold text-brand-navy mb-2">Support Request Created</h2>
                    <p className="text-gray-500 mb-4">Your ticket reference is:</p>
                    <div className="font-mono text-2xl font-bold text-brand-teal mb-6">{ticketSubmitted}</div>
                    <button onClick={() => { setTicketSubmitted(''); setView('support'); }} className="btn-primary inline-flex">
                      View My Tickets
                    </button>
                  </div>
                ) : (
                  <div className="card">
                    <h2 className="text-xl font-bold text-brand-navy mb-5">New Support Request</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="form-label">Subject *</label>
                        <input
                          className="form-input"
                          value={newTicket.subject}
                          onChange={e => setNewTicket(t => ({ ...t, subject: e.target.value }))}
                          placeholder="Brief description of your issue"
                        />
                      </div>
                      <div>
                        <label className="form-label">Category</label>
                        <select
                          className="form-input"
                          value={newTicket.category}
                          onChange={e => setNewTicket(t => ({ ...t, category: e.target.value }))}
                        >
                          {['Claims', 'Policy', 'Payment', 'General Enquiry', 'Document Request', 'Cancellation', 'Technical'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Description *</label>
                        <textarea
                          className="form-input min-h-[120px] resize-none"
                          value={newTicket.description}
                          onChange={e => setNewTicket(t => ({ ...t, description: e.target.value }))}
                          placeholder="Please provide as much detail as possible..."
                        />
                      </div>
                      <button
                        onClick={handleNewTicket}
                        disabled={!newTicket.subject || !newTicket.description}
                        className="btn-primary disabled:opacity-50"
                      >
                        Submit Request
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
