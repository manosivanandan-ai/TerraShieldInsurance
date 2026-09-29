import type { Broker, BrokerPolicy } from '../types';
import { mockBrokers, mockBrokerPolicies } from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function getBroker(brokerId: string): Promise<Broker | null> {
  if (USE_MOCK) {
    return mockBrokers.find(b => b.id === brokerId) || null;
  }
  const res = await fetch(`${API_BASE}/brokers/${brokerId}`);
  return res.ok ? res.json() : null;
}

export async function getBrokerPolicies(brokerId: string): Promise<BrokerPolicy[]> {
  if (USE_MOCK) {
    return mockBrokerPolicies.filter(p => p.brokerId === brokerId);
  }
  const res = await fetch(`${API_BASE}/brokers/${brokerId}/policies`);
  return res.ok ? res.json() : [];
}

export async function registerBroker(data: Record<string, string | string[]>): Promise<string> {
  const ref = `TS-BROKER-${Math.floor(Math.random() * 90000 + 10000)}`;
  if (USE_MOCK) return ref;
  await fetch(`${API_BASE}/brokers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, reference: ref, source: 'TerraShield Website', leadType: 'Insurance Broker' }),
  });
  return ref;
}
