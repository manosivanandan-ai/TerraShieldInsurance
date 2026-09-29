/**
 * Zoho Desk Service
 *
 * Set VITE_USE_MOCK_DATA=false and configure the environment variables below
 * to connect to real Zoho Desk.
 *
 * Required env vars:
 *   DESK_API_BASE_URL    - e.g. https://desk.zoho.com/api/v1
 *   DESK_CLIENT_ID       - OAuth client ID
 *   DESK_CLIENT_SECRET   - OAuth client secret (server-side only)
 *   DESK_REFRESH_TOKEN   - OAuth refresh token (server-side only)
 *   DESK_ORG_ID          - Your Zoho Desk org ID
 */

const DESK_BASE = import.meta.env.VITE_DESK_API_BASE_URL || '';

export async function getDeskTickets(contactId: string) {
  if (!DESK_BASE) {
    console.warn('[Desk] DESK_API_BASE_URL not configured — using mock data');
    return null;
  }
  const res = await fetch(`/api/desk/tickets?contactId=${contactId}`);
  return res.ok ? res.json() : null;
}

export async function getDeskTicket(ticketId: string) {
  if (!DESK_BASE) {
    console.warn('[Desk] DESK_API_BASE_URL not configured — using mock data');
    return null;
  }
  const res = await fetch(`/api/desk/tickets/${ticketId}`);
  return res.ok ? res.json() : null;
}

export async function createDeskTicket(data: {
  subject: string;
  description: string;
  contactId?: string;
  email?: string;
  departmentId?: string;
}) {
  if (!DESK_BASE) {
    console.warn('[Desk] DESK_API_BASE_URL not configured — skipping Desk push');
    return null;
  }
  // In production this must call a server-side endpoint that holds OAuth tokens
  const res = await fetch(`/api/desk/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.ok ? res.json() : null;
}

export async function replyDeskTicket(ticketId: string, content: string) {
  if (!DESK_BASE) {
    console.warn('[Desk] DESK_API_BASE_URL not configured — skipping Desk push');
    return null;
  }
  const res = await fetch(`/api/desk/tickets/${ticketId}/reply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  return res.ok ? res.json() : null;
}
