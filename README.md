# TerraShield Insurance Platform

> **Protection for what matters.** — A polished, production-quality insurance demo platform built with React, TypeScript, and Tailwind CSS.

TerraShield is a headless CX insurance platform serving two primary audiences:
- **Insurance Buyers / Customers** — quote, register, manage policies, claims and support
- **Insurance Brokers** — register, manage customers and view commission/renewals

---

## Project Structure

```
terrashield/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Accordion.tsx       — FAQ accordion component
│   │   │   └── StatusBadge.tsx     — Coloured status pill
│   │   └── layout/
│   │       ├── Layout.tsx          — Page wrapper
│   │       ├── Navbar.tsx          — Sticky top nav with auth state
│   │       ├── Footer.tsx          — 5-column footer
│   │       └── MobileNav.tsx       — Bottom tab nav (mobile)
│   ├── pages/
│   │   ├── HomePage.tsx            — Full homepage with all sections
│   │   ├── InsurancePage.tsx       — All 5 products with deep detail
│   │   ├── BrokerPage.tsx          — Broker info + application form
│   │   ├── AboutPage.tsx           — Company story, team, values
│   │   ├── SupportPage.tsx         — Support hub + ticket creation
│   │   ├── ContactPage.tsx         — Contact form + department info
│   │   ├── GetQuotePage.tsx        — 4-step quote wizard
│   │   ├── RegisterPage.tsx        — Customer account creation
│   │   ├── LoginPage.tsx           — Customer/Broker login toggle
│   │   ├── CustomerPortalPage.tsx  — Full customer dashboard + tickets
│   │   ├── BrokerPortalPage.tsx    — Broker dashboard + commission
│   │   └── CancellationsPage.tsx  — Cancellation/refund request form
│   ├── services/
│   │   ├── customerService.ts      — Customer, policy, claims, tickets
│   │   ├── brokerService.ts        — Broker data and registration
│   │   ├── crm/crmService.ts       — Zoho CRM integration layer
│   │   └── desk/deskService.ts     — Zoho Desk integration layer
│   ├── data/
│   │   └── mockData.ts             — All fictional demo data
│   ├── hooks/
│   │   └── useAuth.ts              — Session-based auth hook
│   ├── types/
│   │   └── index.ts                — All TypeScript types
│   └── utils/
│       └── helpers.ts              — Date, currency, status formatters
├── .env                            — Local dev env (mock mode)
├── .env.example                    — All env var documentation
└── README.md
```

---

## Technologies Used

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool |
| Tailwind CSS 3 | Utility-first styling |
| React Router v7 | Client-side routing |
| Lucide React | Icons |
| Framer Motion | Animations (ready to use) |

---

## How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Start dev server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## How to Enable Mock Mode

Mock mode is **on by default** and requires no credentials.

In `.env`:
```
VITE_USE_MOCK_DATA=true
```

When `true`:
- All forms submit and return confirmation references
- Customer dashboard shows Sarah Wilson's policies, claims and tickets
- Broker dashboard shows Michael Anderson's portfolio
- Support ticket conversation and reply works
- Policy detail view works
- All navigation works end-to-end

To switch to real APIs, set:
```
VITE_USE_MOCK_DATA=false
```

---

## Demo Credentials

### Customer Portal
| Field | Value |
|---|---|
| URL | http://localhost:5173/login |
| Email | sarah.wilson@email.com |
| Password | demo1234 |
| Portal | /customer-portal |

**Demo Customer: Sarah Wilson**
- 2 Active Policies (Motor Comprehensive, Home & Contents)
- 1 Open Claim (CLM-23091 — Motor accident, Under Review)
- 3 Support Tickets (In Progress, Resolved, Awaiting Customer)

### Broker Portal
| Field | Value |
|---|---|
| URL | http://localhost:5173/login?type=broker |
| Email | michael@andersoninsurance.com.au |
| Password | demo1234 |
| Portal | /broker-portal |

**Demo Broker: Michael Anderson**
- Business: Anderson Insurance Partners
- 5 Active Policies with commission breakdown
- 1 Pending Renewal

---

## How to Configure Zoho CRM

1. Create an OAuth client in [Zoho API Console](https://api-console.zoho.com/)
2. Note your Client ID, Client Secret and generate a Refresh Token
3. Set these in your **backend/server** environment (never in the frontend):

```
CRM_API_BASE_URL=https://www.zohoapis.com/crm/v3
CRM_CLIENT_ID=your_client_id
CRM_CLIENT_SECRET=your_client_secret
CRM_REFRESH_TOKEN=your_refresh_token
```

4. Create a backend endpoint at `/api/customers` that:
   - Accepts the form POST body
   - Authenticates with Zoho CRM via OAuth
   - Creates a Lead/Contact record in CRM
   - Returns success/failure

5. Set `VITE_USE_MOCK_DATA=false` in `.env`

**CRM Field Mapping:**

| Website Field | Zoho CRM Field |
|---|---|
| firstName + lastName | First Name + Last Name |
| email | Email |
| phone | Mobile |
| address/suburb/state/postcode | Mailing Address |
| product | Lead Source / Product Interest |
| `source` | Lead Source = "TerraShield Website" |
| `leadType` | Custom field = "Insurance Buyer" or "Insurance Broker" |

---

## How to Configure Zoho Desk

1. Create an OAuth client in Zoho API Console with Desk scopes
2. Note your Client ID, Client Secret, Refresh Token and Org ID
3. Set these in your **backend/server** environment:

```
DESK_API_BASE_URL=https://desk.zoho.com/api/v1
DESK_CLIENT_ID=your_client_id
DESK_CLIENT_SECRET=your_client_secret
DESK_REFRESH_TOKEN=your_refresh_token
DESK_ORG_ID=your_org_id
```

4. Create backend endpoints:
   - `POST /api/desk/tickets` — Create Desk ticket
   - `GET /api/desk/tickets?contactId=X` — Get tickets for a customer
   - `GET /api/desk/tickets/:id` — Get ticket detail + conversation
   - `POST /api/desk/tickets/:id/reply` — Add reply to ticket

5. Configure Zoho Desk to create tickets from email sent to `support@terrashield.example`

---

## How to Deploy to Zoho Catalyst

### Frontend (Catalyst Slate)

```bash
# Build the production assets
npm run build

# Deploy to Catalyst Slate
catalyst slate deploy
```

Configure `slate-config.toml`:
```toml
[build]
  command = "npm run build"
  output = "dist"

[routing]
  spa = true
```

### Backend (Catalyst Functions)

Create Node.js functions for each API route:
- `/api/customers` → CRM contact creation
- `/api/brokers` → CRM broker lead creation
- `/api/desk/*` → Desk ticket operations
- `/api/quotes` → CRM opportunity/lead creation

Store credentials in Catalyst Environment Configuration (never hardcode).

---

## Environment Variables Reference

| Variable | Where Set | Purpose |
|---|---|---|
| `VITE_USE_MOCK_DATA` | Frontend `.env` | Toggle mock vs real APIs |
| `VITE_API_BASE_URL` | Frontend `.env` | Backend API base URL |
| `VITE_CRM_API_BASE_URL` | Frontend `.env` | CRM proxy URL (optional) |
| `VITE_DESK_API_BASE_URL` | Frontend `.env` | Desk proxy URL (optional) |
| `CRM_API_BASE_URL` | Backend env | Zoho CRM API endpoint |
| `CRM_CLIENT_ID` | Backend env | Zoho CRM OAuth client ID |
| `CRM_CLIENT_SECRET` | Backend env | Zoho CRM OAuth secret **[SERVER ONLY]** |
| `CRM_REFRESH_TOKEN` | Backend env | Zoho CRM refresh token **[SERVER ONLY]** |
| `DESK_API_BASE_URL` | Backend env | Zoho Desk API endpoint |
| `DESK_CLIENT_ID` | Backend env | Zoho Desk OAuth client ID |
| `DESK_CLIENT_SECRET` | Backend env | Zoho Desk OAuth secret **[SERVER ONLY]** |
| `DESK_REFRESH_TOKEN` | Backend env | Zoho Desk refresh token **[SERVER ONLY]** |
| `DESK_ORG_ID` | Backend env | Zoho Desk organisation ID |

---

## API Endpoints to Connect

| Method | Endpoint | Purpose | CRM/Desk |
|---|---|---|---|
| `POST` | `/api/customers` | Register new customer | Zoho CRM Lead/Contact |
| `POST` | `/api/brokers` | Register broker application | Zoho CRM Lead (type: Broker) |
| `POST` | `/api/quotes` | Submit quote request | Zoho CRM Lead/Opportunity |
| `GET` | `/api/customers/:id` | Get customer data | Zoho CRM Contact |
| `GET` | `/api/policies?customerId=X` | Customer policies | Zoho CRM / Policy module |
| `GET` | `/api/claims?customerId=X` | Customer claims | Zoho CRM Claims module |
| `POST` | `/api/support/tickets` | Create support ticket | Zoho Desk |
| `GET` | `/api/support/tickets?customerId=X` | List customer tickets | Zoho Desk |
| `GET` | `/api/support/tickets/:id` | Get ticket detail | Zoho Desk |
| `POST` | `/api/support/tickets/:id/reply` | Reply to ticket | Zoho Desk |
| `GET` | `/api/brokers/:id` | Get broker data | Zoho CRM |
| `GET` | `/api/brokers/:id/policies` | Broker's placed policies | Zoho CRM |
| `POST` | `/api/crm/contacts` | Direct CRM contact creation | Zoho CRM |
| `POST` | `/api/crm/leads` | Direct CRM lead creation | Zoho CRM |

---

## Key Demo Flows

### Flow 1 — Insurance Buyer
Home → Insurance → Motor → Get Quote → Submit → Confirmation → Login → Customer Portal

### Flow 2 — Broker Registration
Home → For Brokers → Apply → Submit → Confirmation → Broker Login → Broker Portal

### Flow 3 — Customer Support
Login → Customer Portal → Support → Select Ticket → View Conversation → Reply → Updated

### Flow 4 — New Support Request  
Login → Customer Portal → Support → New Request → Submit → Ticket ID displayed

### Flow 5 — Policy Detail
Login → Customer Portal → My Policies → Select Policy → View: number, coverage, premium, dates

---

## Page Routes

| Route | Page |
|---|---|
| `/` | Homepage |
| `/insurance` | All insurance products |
| `/brokers` | Broker info + application |
| `/about` | About TerraShield |
| `/support` | Support hub |
| `/contact` | Contact form |
| `/get-quote` | 4-step quote wizard |
| `/register` | Customer registration |
| `/login` | Login (customer/broker toggle) |
| `/login?type=broker` | Broker login |
| `/customer-portal` | Customer dashboard |
| `/broker-portal` | Broker dashboard |
| `/cancellations` | Cancellation/refund requests |
| `/legal/:page` | Privacy, Terms, Cookies, Complaints |
