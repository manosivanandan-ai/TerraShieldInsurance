/**
 * Zoho CRM Service
 *
 * Set VITE_USE_MOCK_DATA=false and configure the environment variables below
 * to connect to real Zoho CRM.
 *
 * Required env vars:
 *   CRM_API_BASE_URL     - e.g. https://www.zohoapis.com/crm/v3
 *   CRM_CLIENT_ID        - OAuth client ID
 *   CRM_CLIENT_SECRET    - OAuth client secret (server-side only)
 *   CRM_REFRESH_TOKEN    - OAuth refresh token (server-side only)
 */

const CRM_BASE = import.meta.env.VITE_CRM_API_BASE_URL || '';

export async function createCRMContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leadType: 'Insurance Buyer' | 'Insurance Broker';
  source?: string;
  [key: string]: string | undefined;
}) {
  if (!CRM_BASE) {
    console.warn('[CRM] CRM_API_BASE_URL not configured — skipping CRM push');
    return null;
  }
  // NOTE: In production, call a server-side endpoint that holds the OAuth token
  // Never expose client_secret or refresh_token to the browser
  const res = await fetch(`/api/crm/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.ok ? res.json() : null;
}

export async function createCRMLead(data: Record<string, string>) {
  if (!CRM_BASE) {
    console.warn('[CRM] CRM_API_BASE_URL not configured — skipping CRM push');
    return null;
  }
  const res = await fetch(`/api/crm/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.ok ? res.json() : null;
}
