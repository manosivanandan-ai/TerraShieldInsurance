export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatTime(isoStr: string): string {
  const d = new Date(isoStr);
  return d.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function formatDateTime(isoStr: string): string {
  const d = new Date(isoStr);
  return d.toLocaleString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });
}

export function relativeDate(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return formatDateShort(dateStr);
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-700',
    Expired: 'bg-gray-100 text-gray-600',
    Pending: 'bg-amber-100 text-amber-700',
    Cancelled: 'bg-red-100 text-red-700',
    Open: 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-brand-teal/10 text-brand-teal-dark',
    'Awaiting Customer': 'bg-amber-100 text-amber-700',
    Resolved: 'bg-emerald-100 text-emerald-700',
    Closed: 'bg-gray-100 text-gray-600',
    'Under Review': 'bg-purple-100 text-purple-700',
    Approved: 'bg-emerald-100 text-emerald-700',
    Paid: 'bg-emerald-200 text-emerald-800',
    Rejected: 'bg-red-100 text-red-700',
    Submitted: 'bg-blue-100 text-blue-700',
    'Pending Renewal': 'bg-amber-100 text-amber-700',
  };
  return map[status] || 'bg-gray-100 text-gray-600';
}

export function productIcon(type: string): string {
  const map: Record<string, string> = {
    Motor: '🚗',
    Home: '🏠',
    Travel: '✈️',
    Life: '❤️',
    Business: '💼',
  };
  return map[type] || '🛡️';
}

export function daysUntil(dateStr: string): number {
  const now = new Date();
  const date = new Date(dateStr);
  return Math.ceil((date.getTime() - now.getTime()) / 86400000);
}
