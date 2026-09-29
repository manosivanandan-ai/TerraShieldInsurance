import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import InsurancePage from './pages/InsurancePage';
import BrokerPage from './pages/BrokerPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';
import GetQuotePage from './pages/GetQuotePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CustomerPortalPage from './pages/CustomerPortalPage';
import BrokerPortalPage from './pages/BrokerPortalPage';
import CancellationsPage from './pages/CancellationsPage';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl font-bold text-brand-teal mb-4">404</div>
        <h1 className="text-2xl font-bold text-brand-navy mb-2">Page not found</h1>
        <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary inline-flex">Return Home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login has no layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* Customer portal */}
        <Route path="/customer-portal" element={<Layout noFooter><CustomerPortalPage /></Layout>} />

        {/* Broker portal */}
        <Route path="/broker-portal" element={<Layout noFooter><BrokerPortalPage /></Layout>} />

        {/* Full layout routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/insurance" element={<Layout><InsurancePage /></Layout>} />
        <Route path="/brokers" element={<Layout><BrokerPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/support" element={<Layout><SupportPage /></Layout>} />
        <Route path="/support/new" element={<Layout><SupportPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/get-quote" element={<Layout noFooter><GetQuotePage /></Layout>} />
        <Route path="/register" element={<Layout noFooter><RegisterPage /></Layout>} />
        <Route path="/cancellations" element={<Layout><CancellationsPage /></Layout>} />
        <Route path="/legal/:page" element={<Layout><LegalPage /></Layout>} />
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

function LegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-brand-navy mb-6">Legal Information</h1>
      <div className="prose text-gray-600">
        <p className="mb-4">TerraShield Insurance Pty Ltd (ABN 12 345 678 901) holds Australian Financial Services Licence (AFSL) 000000 issued by the Australian Securities and Investments Commission (ASIC).</p>
        <p className="mb-4">This is a demonstration website. TerraShield Insurance is a fictional company created for demonstration purposes only. No real insurance products or services are offered through this platform.</p>
        <p className="mb-4">All customer data entered on this demonstration platform is simulated and does not represent real individuals or real financial products.</p>
        <h2 className="text-xl font-bold text-brand-navy mt-8 mb-3">Privacy</h2>
        <p className="mb-4">TerraShield is committed to protecting your privacy in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles. For questions, contact privacy@terrashield.example.</p>
        <h2 className="text-xl font-bold text-brand-navy mt-8 mb-3">Complaints</h2>
        <p className="mb-4">If you have a complaint, contact complaints@terrashield.example or call 1800 000 000. If unresolved, you may contact the Australian Financial Complaints Authority (AFCA) at afca.org.au.</p>
      </div>
    </div>
  );
}
