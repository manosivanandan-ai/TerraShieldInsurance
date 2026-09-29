export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  memberSince: string;
}

export interface Policy {
  id: string;
  policyNumber: string;
  customerId: string;
  productType: ProductType;
  productName: string;
  status: 'Active' | 'Expired' | 'Pending' | 'Cancelled';
  premium: number;
  frequency: 'Monthly' | 'Annual';
  startDate: string;
  expiryDate: string;
  coverageAmount: number;
  coverageDetails: string[];
  nextRenewal?: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  customerId: string;
  policyId: string;
  policyType: ProductType;
  subject: string;
  description: string;
  status: 'Submitted' | 'Under Review' | 'In Progress' | 'Approved' | 'Paid' | 'Rejected' | 'Closed';
  lodgedDate: string;
  lastUpdated: string;
  claimAmount?: number;
  assessorName?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  subject: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  createdDate: string;
  lastUpdated: string;
  assignedAgent?: string;
  assignedTeam?: string;
  conversation: Message[];
  attachments?: string[];
}

export interface Message {
  id: string;
  from: string;
  fromType: 'customer' | 'agent';
  content: string;
  timestamp: string;
}

export interface Broker {
  id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  abn: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  yearsInBusiness: number;
  customerCount: number;
  status: 'Active' | 'Pending' | 'Suspended';
  productsOffered: ProductType[];
  joinedDate: string;
  commissionRate: number;
}

export interface BrokerPolicy {
  id: string;
  brokerId: string;
  customerId: string;
  customerName: string;
  policyType: ProductType;
  policyNumber: string;
  premium: number;
  commission: number;
  status: string;
  renewalDate: string;
}

export type ProductType = 'Motor' | 'Home' | 'Travel' | 'Life' | 'Business';

export type TicketStatus = 'Open' | 'In Progress' | 'Awaiting Customer' | 'Resolved' | 'Closed';

export type TicketCategory =
  | 'Claims'
  | 'Policy'
  | 'Payment'
  | 'General Enquiry'
  | 'Document Request'
  | 'Cancellation'
  | 'Technical';

export interface QuoteRequest {
  id: string;
  productType: ProductType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  details: Record<string, string>;
  submittedAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  reason: string;
  product?: string;
  message: string;
}
