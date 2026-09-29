import type { Customer, Policy, Claim, SupportTicket, QuoteRequest } from '../types';
import { mockCustomers, mockPolicies, mockClaims, mockTickets } from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export async function getCustomer(customerId: string): Promise<Customer | null> {
  if (USE_MOCK) {
    return mockCustomers.find(c => c.id === customerId) || null;
  }
  const res = await fetch(`${API_BASE}/customers/${customerId}`);
  return res.ok ? res.json() : null;
}

export async function getPolicies(customerId: string): Promise<Policy[]> {
  if (USE_MOCK) {
    return mockPolicies.filter(p => p.customerId === customerId);
  }
  const res = await fetch(`${API_BASE}/policies?customerId=${customerId}`);
  return res.ok ? res.json() : [];
}

export async function getClaims(customerId: string): Promise<Claim[]> {
  if (USE_MOCK) {
    return mockClaims.filter(c => c.customerId === customerId);
  }
  const res = await fetch(`${API_BASE}/claims?customerId=${customerId}`);
  return res.ok ? res.json() : [];
}

export async function getTickets(customerId: string): Promise<SupportTicket[]> {
  if (USE_MOCK) {
    return mockTickets.filter(t => t.customerId === customerId);
  }
  const res = await fetch(`${API_BASE}/support/tickets?customerId=${customerId}`);
  return res.ok ? res.json() : [];
}

export async function getTicket(ticketId: string): Promise<SupportTicket | null> {
  if (USE_MOCK) {
    return mockTickets.find(t => t.id === ticketId) || null;
  }
  const res = await fetch(`${API_BASE}/support/tickets/${ticketId}`);
  return res.ok ? res.json() : null;
}

export async function replyToTicket(
  ticketId: string,
  _customerId: string,
  content: string,
  customerName: string
): Promise<boolean> {
  if (USE_MOCK) {
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (ticket) {
      ticket.conversation.push({
        id: generateId('msg'),
        from: customerName,
        fromType: 'customer',
        content,
        timestamp: new Date().toISOString(),
      });
      ticket.lastUpdated = new Date().toISOString().split('T')[0];
      ticket.status = 'Open';
    }
    return true;
  }
  const res = await fetch(`${API_BASE}/support/tickets/${ticketId}/reply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  return res.ok;
}

export async function createTicket(data: {
  customerId: string;
  subject: string;
  description: string;
  category: string;
}): Promise<string> {
  if (USE_MOCK) {
    const newId = generateId('TS');
    mockTickets.unshift({
      id: `tkt-${Date.now()}`,
      ticketNumber: newId,
      customerId: data.customerId,
      subject: data.subject,
      description: data.description,
      category: data.category as any,
      status: 'Open',
      priority: 'Medium',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      conversation: [
        {
          id: generateId('msg'),
          from: 'You',
          fromType: 'customer',
          content: data.description,
          timestamp: new Date().toISOString(),
        },
      ],
    });
    return newId;
  }
  const res = await fetch(`${API_BASE}/support/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.ticketNumber;
}

export async function submitQuote(data: Omit<QuoteRequest, 'id' | 'submittedAt'>): Promise<string> {
  const quoteId = `TS-QUO-${Math.floor(Math.random() * 90000 + 10000)}`;
  if (USE_MOCK) return quoteId;
  await fetch(`${API_BASE}/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, id: quoteId, submittedAt: new Date().toISOString() }),
  });
  return quoteId;
}

export async function registerCustomer(data: Record<string, string>): Promise<string> {
  const ref = `TS-CUST-${Math.floor(Math.random() * 90000 + 10000)}`;
  if (USE_MOCK) return ref;
  await fetch(`${API_BASE}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, reference: ref, source: 'TerraShield Website', leadType: 'Insurance Buyer' }),
  });
  return ref;
}
