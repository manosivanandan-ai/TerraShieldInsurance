import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, FileText, RotateCcw, DollarSign,
  BarChart2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getBroker, getBrokerPolicies } from '../services/brokerService';
import type { Broker, BrokerPolicy } from '../types';
import StatusBadge from '../components/common/StatusBadge';
import { formatCurrency, formatDate } from '../utils/helpers';

type View = 'dashboard' | 'customers' | 'policies' | 'renewals' | 'commission';

export default function BrokerPortalPage() {
  const { isAuthenticated, userId, logout } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<View>('dashboard');
  const [broker, setBroker] = useState<Broker | null>(null);
  const [policies, setPolicies] = useState<BrokerPolicy[]>([]);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login?type=broker');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (userId) {
      Promise.all([getBroker(userId), getBrokerPolicies(userId)]).then(([b, p]) => {
        setBroker(b);
        setPolicies(p);
      });
    }
  }, [userId]);

  if (!broker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalCommission = policies.reduce((sum, p) => sum + p.commission, 0);
  const activePolicies = policies.filter(p => p.status === 'Active');
  const renewals = policies.filter(p => p.status === 'Pending Renewal');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'policies', label: 'Policies', icon: FileText },
    { id: 'renewals', label: 'Renewals', icon: RotateCcw },
    { id: 'commission', label: 'Commission', icon: DollarSign },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-60 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-card p-5 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-navy/10 flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-brand-navy">
                  {broker.firstName[0]}{broker.lastName[0]}
                </span>
              </div>
              <div className="font-bold text-brand-navy">{broker.firstName} {broker.lastName}</div>
              <div className="text-xs text-gray-400 mt-0.5">{broker.businessName}</div>
              <div className="text-xs text-gray-400 mt-1">ABN: {broker.abn}</div>
              <StatusBadge status={broker.status} className="mt-2" />
            </div>
            <nav className="bg-white rounded-2xl shadow-card p-3 space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id as View)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      view === item.id
                        ? 'bg-brand-navy text-white'
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
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50"
              >
                Sign Out
              </button>
            </nav>
          </aside>

          <div className="flex-1 min-w-0">
            {/* Dashboard */}
            {view === 'dashboard' && (
              <div>
                <h1 className="text-2xl font-bold text-brand-navy mb-2">Broker Dashboard</h1>
                <p className="text-gray-500 text-sm mb-6">Welcome back, {broker.firstName}. Here's your portfolio overview.</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Active Customers', value: broker.customerCount, icon: Users, color: 'text-blue-600 bg-blue-50', action: () => setView('customers') },
                    { label: 'Policies Sold', value: activePolicies.length, icon: FileText, color: 'text-emerald-600 bg-emerald-50', action: () => setView('policies') },
                    { label: 'Pending Renewals', value: renewals.length, icon: RotateCcw, color: 'text-amber-600 bg-amber-50', action: () => setView('renewals') },
                    { label: 'Monthly Commission', value: formatCurrency(totalCommission), icon: DollarSign, color: 'text-brand-teal bg-brand-teal/10', action: () => setView('commission') },
                  ].map(card => {
                    const Icon = card.icon;
                    return (
                      <button
                        key={card.label}
                        onClick={card.action}
                        className="card text-left hover:scale-[1.02] transition-transform"
                      >
                        <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-2xl font-bold text-brand-navy">{card.value}</div>
                        <div className="text-sm text-gray-500 mt-0.5">{card.label}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Broker info */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="card">
                    <h3 className="font-bold text-brand-navy mb-4">Broker Profile</h3>
                    <div className="space-y-3 text-sm">
                      {[
                        { label: 'Business', value: broker.businessName },
                        { label: 'Address', value: `${broker.address}, ${broker.suburb} ${broker.state} ${broker.postcode}` },
                        { label: 'Years in Business', value: `${broker.yearsInBusiness} years` },
                        { label: 'Commission Rate', value: `${broker.commissionRate}%` },
                        { label: 'Joined TerraShield', value: formatDate(broker.joinedDate) },
                        { label: 'Products Offered', value: broker.productsOffered.join(', ') },
                      ].map(item => (
                        <div key={item.label} className="flex justify-between">
                          <span className="text-gray-400">{item.label}</span>
                          <span className="font-medium text-brand-navy text-right max-w-[60%]">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card">
                    <h3 className="font-bold text-brand-navy mb-4">Recent Policies</h3>
                    <div className="space-y-3">
                      {policies.slice(0, 4).map(p => (
                        <div key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                          <div className="text-left min-w-0 flex-1">
                            <div className="text-sm font-medium text-brand-navy truncate">{p.customerName}</div>
                            <div className="text-xs text-gray-400">{p.policyType} · {p.policyNumber}</div>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <StatusBadge status={p.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setView('policies')} className="text-xs text-brand-teal hover:underline mt-2">
                      View all policies →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Customers */}
            {view === 'customers' && (
              <div>
                <h1 className="text-2xl font-bold text-brand-navy mb-6">Customers</h1>
                <div className="card overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-400 text-left border-b border-gray-100">
                        <th className="pb-3 pr-4">Customer</th>
                        <th className="pb-3 pr-4">Policy Type</th>
                        <th className="pb-3 pr-4">Policy Number</th>
                        <th className="pb-3 pr-4">Premium</th>
                        <th className="pb-3 pr-4">Status</th>
                        <th className="pb-3">Renewal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.map(p => (
                        <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-3 pr-4 font-medium text-brand-navy">{p.customerName}</td>
                          <td className="py-3 pr-4 text-gray-600">{p.policyType}</td>
                          <td className="py-3 pr-4 font-mono text-xs text-gray-500">{p.policyNumber}</td>
                          <td className="py-3 pr-4">{formatCurrency(p.premium)}/mo</td>
                          <td className="py-3 pr-4"><StatusBadge status={p.status} /></td>
                          <td className="py-3 text-gray-500 text-xs">{formatDate(p.renewalDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Policies */}
            {view === 'policies' && (
              <div>
                <h1 className="text-2xl font-bold text-brand-navy mb-6">Policies</h1>
                <div className="space-y-3">
                  {policies.map(p => (
                    <div key={p.id} className="card flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-brand-teal/10 flex items-center justify-center text-xl">
                          {p.policyType === 'Motor' ? '🚗' : p.policyType === 'Home' ? '🏠' : p.policyType === 'Travel' ? '✈️' : p.policyType === 'Life' ? '❤️' : '💼'}
                        </div>
                        <div>
                          <div className="font-semibold text-brand-navy">{p.customerName}</div>
                          <div className="text-xs text-gray-400">{p.policyNumber} · {p.policyType}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <div className="font-semibold">{formatCurrency(p.premium)}/mo</div>
                          <div className="text-xs text-gray-400">Commission: {formatCurrency(p.commission)}</div>
                        </div>
                        <StatusBadge status={p.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Renewals */}
            {view === 'renewals' && (
              <div>
                <h1 className="text-2xl font-bold text-brand-navy mb-6">Upcoming Renewals</h1>
                {renewals.length === 0 ? (
                  <div className="card text-center py-12">
                    <RotateCcw className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No upcoming renewals.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {renewals.map(p => (
                      <div key={p.id} className="card border-l-4 border-amber-400">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold text-brand-navy">{p.customerName}</div>
                            <div className="text-sm text-gray-500">{p.policyType} Insurance · {p.policyNumber}</div>
                            <div className="text-sm text-amber-600 font-medium mt-1">Renews: {formatDate(p.renewalDate)}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(p.premium)}/mo</div>
                            <button className="btn-primary text-xs mt-2 py-1.5 px-3">
                              Process Renewal
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Commission */}
            {view === 'commission' && (
              <div>
                <h1 className="text-2xl font-bold text-brand-navy mb-6">Commission Overview</h1>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="card text-center">
                    <div className="text-3xl font-bold text-brand-teal">{formatCurrency(totalCommission)}</div>
                    <div className="text-sm text-gray-500 mt-1">Total Commission (All Time)</div>
                  </div>
                  <div className="card text-center">
                    <div className="text-3xl font-bold text-brand-navy">{broker.commissionRate}%</div>
                    <div className="text-sm text-gray-500 mt-1">Your Commission Rate</div>
                  </div>
                  <div className="card text-center">
                    <div className="text-3xl font-bold text-emerald-600">{activePolicies.length}</div>
                    <div className="text-sm text-gray-500 mt-1">Active Earning Policies</div>
                  </div>
                </div>
                <div className="card overflow-x-auto">
                  <h3 className="font-bold text-brand-navy mb-4">Commission Breakdown</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-400 text-left border-b border-gray-100">
                        <th className="pb-3 pr-4">Customer</th>
                        <th className="pb-3 pr-4">Policy</th>
                        <th className="pb-3 pr-4">Premium</th>
                        <th className="pb-3 pr-4">Commission</th>
                        <th className="pb-3">Renewal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.map(p => (
                        <tr key={p.id} className="border-t border-gray-50">
                          <td className="py-3 pr-4 font-medium">{p.customerName}</td>
                          <td className="py-3 pr-4 text-gray-500">{p.policyType}</td>
                          <td className="py-3 pr-4">{formatCurrency(p.premium)}</td>
                          <td className="py-3 pr-4 font-semibold text-emerald-600">{formatCurrency(p.commission)}</td>
                          <td className="py-3 text-xs text-gray-400">{formatDate(p.renewalDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-200">
                        <td colSpan={3} className="py-3 font-bold text-brand-navy">Total</td>
                        <td className="py-3 font-bold text-emerald-600">{formatCurrency(totalCommission)}</td>
                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
