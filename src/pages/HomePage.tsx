import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Car, Home, Plane, Heart, Briefcase,
  Star, CheckCircle, Phone, Mail, Clock, Users, Award, ChevronRight,
  TrendingUp, Zap, HeadphonesIcon
} from 'lucide-react';
import Accordion from '../components/common/Accordion';

const products = [
  {
    id: 'motor',
    icon: Car,
    title: 'Motor Insurance',
    description: 'Protect your vehicle with flexible coverage designed around the way you drive.',
    benefits: ['Comprehensive & third party options', 'Roadside assistance 24/7', 'New car replacement'],
    color: 'bg-blue-50 text-blue-600',
    accent: '#3b82f6',
  },
  {
    id: 'home',
    icon: Home,
    title: 'Home & Contents',
    description: 'Protect your home and the things that matter most inside it.',
    benefits: ['Building & contents coverage', 'Storm, fire & flood protection', 'Accidental damage'],
    color: 'bg-emerald-50 text-emerald-600',
    accent: '#10b981',
  },
  {
    id: 'travel',
    icon: Plane,
    title: 'Travel Insurance',
    description: 'Travel with confidence with coverage for unexpected events wherever you go.',
    benefits: ['Unlimited emergency medical', 'Trip cancellation cover', '24/7 assistance line'],
    color: 'bg-purple-50 text-purple-600',
    accent: '#8b5cf6',
  },
  {
    id: 'life',
    icon: Heart,
    title: 'Life Insurance',
    description: 'Financial protection for the people who depend on you.',
    benefits: ['Flexible coverage amounts', 'Terminal illness benefit', 'Premium waiver options'],
    color: 'bg-rose-50 text-rose-600',
    accent: '#f43f5e',
  },
  {
    id: 'business',
    icon: Briefcase,
    title: 'Business Insurance',
    description: 'Protection designed for Australian businesses and professionals.',
    benefits: ['Professional indemnity', 'Public liability', 'Business interruption'],
    color: 'bg-amber-50 text-amber-600',
    accent: '#f59e0b',
  },
];

const discoverOptions = [
  { label: 'My Car', icon: Car, product: 'motor' },
  { label: 'My Home', icon: Home, product: 'home' },
  { label: 'My Family', icon: Heart, product: 'life' },
  { label: 'My Travel', icon: Plane, product: 'travel' },
  { label: 'My Business', icon: Briefcase, product: 'business' },
];

const testimonials = [
  {
    name: 'Rachel M.',
    location: 'Sydney, NSW',
    rating: 5,
    text: 'The quote process was so simple. I had motor insurance sorted in under 10 minutes. The digital experience is unlike any insurer I have dealt with before.',
  },
  {
    name: 'David K.',
    location: 'Melbourne, VIC',
    rating: 5,
    text: 'My claim was handled professionally and quickly. The online portal made tracking everything effortless. Highly recommend TerraShield.',
  },
  {
    name: 'Sophie L.',
    location: 'Brisbane, QLD',
    rating: 5,
    text: 'Finally an insurer that actually communicates. The support team was helpful and my issue was resolved within a day. Excellent experience.',
  },
];

const stats = [
  { value: '50,000+', label: 'Customers Protected' },
  { value: '$2.1B+', label: 'Coverage Issued' },
  { value: '96%', label: 'Satisfaction Rate' },
  { value: '< 24hrs', label: 'Avg Support Response' },
];

const whyFeatures = [
  {
    icon: Zap,
    title: 'Simple & Fast',
    desc: 'Get a quote in minutes, not days. Our digital-first process removes the complexity from insurance.',
  },
  {
    icon: Shield,
    title: 'Flexible Coverage',
    desc: 'Build coverage that fits your life and budget — from essential protection to comprehensive plans.',
  },
  {
    icon: TrendingUp,
    title: 'Digital by Design',
    desc: 'Manage your policies, submit claims and track support requests all in one connected experience.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Human When It Matters',
    desc: 'Real people available Monday–Friday 8am–6pm AEST — because sometimes you need to talk.',
  },
];

const howItWorks = [
  { step: '01', title: 'Get a Quote', desc: 'Choose your product and complete a short form. We will match you with the right coverage.' },
  { step: '02', title: 'Choose Your Cover', desc: 'Review your options and select the plan that suits your needs and budget.' },
  { step: '03', title: 'Get Protected', desc: 'Your policy is active immediately. Manage everything online from your personal dashboard.' },
];

const faqItems = [
  { question: 'How do I get a quote?', answer: 'Click "Get a Quote" on any page, select your insurance type and complete the short form. A specialist will contact you with your personalised quote.' },
  { question: 'How do I purchase a policy?', answer: 'Once you receive your quote, a TerraShield specialist will guide you through the policy setup process. You can also create an account online to manage everything digitally.' },
  { question: 'How do I make a claim?', answer: 'Log in to your TerraShield account, navigate to Claims and click "Submit a Claim". Alternatively, call us on 1800 000 000 or email claims@terrashield.example.' },
  { question: 'How do I track my claim?', answer: 'Log in to your customer portal and select "Claims" to see the current status of all claims. You can also view conversations with your assigned assessor.' },
  { question: 'How do I update my policy?', answer: 'Login to your account, go to My Policies and select the policy you wish to update. For major changes, our team will assist you via phone or support ticket.' },
  { question: 'How do I contact support?', answer: 'You can email support@terrashield.example, call 1800 000 000 (Mon–Fri, 8am–6pm AEST) or submit a request through the Support portal.' },
  { question: 'How do I become a broker?', answer: 'Visit the "For Brokers" page and click "Become a Broker". Complete the application form and our broker team will be in touch within 2 business days.' },
  { question: 'How do I cancel my policy?', answer: 'You can request a policy cancellation through your customer portal, via email or by calling us. Note that cooling-off periods may apply within 21 days of policy inception.' },
  { question: 'How long does support take to respond?', answer: 'We aim to respond to all support requests within 24 hours on business days. Urgent claims and time-sensitive enquiries are typically actioned within 4 hours.' },
];

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const filteredProducts = selectedProduct
    ? products.filter(p => p.id === selectedProduct)
    : products;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-gradient min-h-[92vh] flex items-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-brand-teal rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-teal/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-brand-teal" />
                <span className="text-white/90 text-sm font-medium">Australia's trusted insurance partner</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Insurance that protects{' '}
                <span className="text-brand-teal">what matters.</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                Simple, flexible insurance for people, families and businesses — backed by a connected support experience built for the digital age.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-quote" className="btn-primary text-base px-7 py-3.5 shadow-lg">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/insurance" className="btn-outline text-base px-7 py-3.5">
                  Explore Products
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-10">
                {[
                  { icon: CheckCircle, text: 'No hidden fees' },
                  { icon: CheckCircle, text: 'Instant cover' },
                  { icon: CheckCircle, text: 'Cancel anytime' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 text-white/70">
                    <item.icon className="w-4 h-4 text-brand-teal" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              {/* Illustrative insurance card grid */}
              <div className="relative w-full max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '🏠', label: 'Home', color: 'from-emerald-500 to-teal-600' },
                    { icon: '🚗', label: 'Motor', color: 'from-blue-500 to-blue-700' },
                    { icon: '✈️', label: 'Travel', color: 'from-purple-500 to-purple-700' },
                    { icon: '❤️', label: 'Life', color: 'from-rose-500 to-rose-700' },
                  ].map(card => (
                    <div
                      key={card.label}
                      className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-transform duration-300 cursor-default`}
                    >
                      <div className="text-3xl mb-3">{card.icon}</div>
                      <div className="font-semibold">{card.label}</div>
                      <div className="text-xs text-white/70 mt-1">Insurance</div>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-brand-navy text-sm">Policy Active</div>
                    <div className="text-xs text-gray-500">Motor Insurance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats ribbon */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Discovery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-heading">What are you looking to protect?</h2>
            <p className="section-subheading mx-auto">
              Select what matters to you and we will show you the right coverage.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {discoverOptions.map(opt => {
              const Icon = opt.icon;
              const active = selectedProduct === opt.product;
              return (
                <button
                  key={opt.product}
                  onClick={() => setSelectedProduct(active ? null : opt.product)}
                  className={`flex flex-col items-center gap-2 px-6 py-5 rounded-2xl border-2 transition-all duration-200 min-w-[110px] ${
                    active
                      ? 'border-brand-teal bg-brand-teal text-white shadow-lg scale-105'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-brand-teal/50 hover:bg-brand-teal/5'
                  }`}
                >
                  <Icon className={`w-7 h-7 ${active ? 'text-white' : 'text-brand-teal'}`} />
                  <span className="text-sm font-semibold">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Insurance for every part of life</h2>
            <p className="section-subheading mx-auto">
              Comprehensive coverage options to protect you, your family and your business.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const Icon = product.icon;
              return (
                <div
                  key={product.id}
                  className="card group hover:scale-[1.02] transition-transform duration-200 cursor-default flex flex-col"
                >
                  <div className={`w-14 h-14 rounded-2xl ${product.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.benefits.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-brand-teal flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                    <Link
                      to={`/insurance#${product.id}`}
                      className="flex-1 text-center py-2 rounded-lg text-sm font-medium text-brand-navy border border-gray-200 hover:border-brand-navy/40 transition-colors"
                    >
                      Learn More
                    </Link>
                    <Link
                      to={`/get-quote?product=${product.id}`}
                      className="flex-1 text-center py-2 rounded-lg text-sm font-medium text-white bg-brand-teal hover:bg-brand-teal-dark transition-colors"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">How it works</h2>
            <p className="section-subheading mx-auto">Get covered in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-brand-teal/20 via-brand-teal to-brand-teal/20" />
            {howItWorks.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-20 h-20 rounded-2xl bg-brand-navy flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <span className="text-2xl font-bold text-brand-teal">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/get-quote" className="btn-primary text-base px-8 py-3.5">
              Get Started Today <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why TerraShield */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-heading mb-4">Why TerraShield?</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We built TerraShield because insurance should be easier to understand, easier to buy and easier to manage. We bring together smart technology and human expertise so you get the best of both worlds.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {whyFeatures.map(f => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="flex gap-3 p-4 rounded-xl bg-gray-50 hover:bg-brand-teal/5 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-brand-teal" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-navy text-sm">{f.title}</h4>
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-navy-gradient rounded-3xl p-8 text-white">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                  <Award className="w-8 h-8 text-brand-teal" />
                  <div>
                    <div className="font-semibold">AFSL Authorised</div>
                    <div className="text-xs text-white/60">Regulated by ASIC — AFSL 000000</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                  <Users className="w-8 h-8 text-brand-teal" />
                  <div>
                    <div className="font-semibold">50,000+ Australians Protected</div>
                    <div className="text-xs text-white/60">Trusted across all states and territories</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                  <Clock className="w-8 h-8 text-brand-teal" />
                  <div>
                    <div className="font-semibold">Fast Claims Processing</div>
                    <div className="text-xs text-white/60">Average resolution in 5 business days</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                  <Phone className="w-8 h-8 text-brand-teal" />
                  <div>
                    <div className="font-semibold">24/7 Digital Support</div>
                    <div className="text-xs text-white/60">Your portal is always open</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Broker CTA */}
      <section className="py-20 bg-brand-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Are you an insurance broker?
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Join the TerraShield broker network and give your customers access to flexible insurance solutions backed by a connected digital experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/brokers#register" className="btn-primary bg-white text-brand-teal hover:bg-gray-50 shadow-none">
                  Become a Broker <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/brokers" className="btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, label: 'Competitive Commission', desc: 'Up to 15% commission on policies sold' },
                { icon: Shield, label: 'Broad Product Range', desc: 'Motor, Home, Travel, Life, Business' },
                { icon: Users, label: 'Dedicated Support', desc: 'Your own broker relationship manager' },
                { icon: Zap, label: 'Digital Tools', desc: 'Full broker portal to manage customers' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <Icon className="w-7 h-7 text-white mb-3" />
                    <div className="font-semibold text-white text-sm">{item.label}</div>
                    <div className="text-xs text-white/60 mt-1">{item.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">What our customers say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-brand-navy text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-3xl p-10 md:p-14 text-white">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">We're here to help</h2>
                <p className="text-white/70 mb-6">
                  Our support team is ready to assist with claims, policy changes, payment questions and anything else you need.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-brand-teal" />
                    <span className="text-white/80">1800 000 000 (Mon–Fri, 8am–6pm AEST)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-brand-teal" />
                    <span className="text-white/80">support@terrashield.example</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/support/new" className="btn-primary bg-brand-teal hover:bg-brand-teal-dark">
                  Submit Support Request <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/support" className="btn-outline">
                  Track My Request
                </Link>
                <Link to="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Frequently Asked Questions</h2>
          </div>
          <Accordion items={faqItems} />
          <div className="text-center mt-8">
            <Link to="/support" className="text-brand-teal font-medium hover:underline text-sm">
              Have another question? Contact Support →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-navy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Shield className="w-16 h-16 text-brand-teal mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to get protected?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Get a quote today and start protecting what matters most.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-quote" className="btn-primary text-base px-8 py-3.5 shadow-lg">
              Get a Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/register" className="btn-outline text-base px-8 py-3.5">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
