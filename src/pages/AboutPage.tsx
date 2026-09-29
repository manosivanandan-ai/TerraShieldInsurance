import { Link } from 'react-router-dom';
import { Shield, Users, Zap, Heart, ArrowRight, Award, Globe, CheckCircle } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Customer First', desc: 'Every decision starts with our customer. We design products, processes and experiences with the customer\'s needs at the centre.' },
  { icon: Globe, title: 'Transparent', desc: 'No jargon, no hidden fees, no surprises. We communicate clearly and honestly about what we cover and what we do not.' },
  { icon: Zap, title: 'Digital by Design', desc: 'We use technology to eliminate friction — from getting a quote to submitting a claim to tracking support requests.' },
  { icon: Users, title: 'Human When It Matters', desc: 'Technology is a tool, not a replacement for people. When our customers need real support, real people are available.' },
];

const team = [
  { name: 'Olivia Chen', role: 'Chief Executive Officer', desc: '20+ years in Australian financial services. Former Head of Insurance at major Australian bank.' },
  { name: 'James Hartley', role: 'Chief Technology Officer', desc: 'Ex-Google engineer. Built digital platforms for three successful fintechs before joining TerraShield.' },
  { name: 'Priya Patel', role: 'Chief Customer Officer', desc: 'Insurance industry veteran with a deep focus on customer experience, claims and support operations.' },
  { name: 'Marcus Webb', role: 'Head of Products', desc: 'Actuary with 15 years designing and pricing insurance products across Motor, Home, Life and Business.' },
];

const milestones = [
  { year: '2019', event: 'TerraShield founded in Sydney' },
  { year: '2020', event: 'First 1,000 customers — Motor and Home products launched' },
  { year: '2021', event: 'Travel and Life Insurance added. Series A funding secured.' },
  { year: '2022', event: 'Business Insurance launched. Broker network launched.' },
  { year: '2023', event: '25,000 customers protected. Zoho CRM & Desk integration.' },
  { year: '2024', event: '50,000+ customers across all Australian states and territories.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-gradient py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Insurance built around people.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              TerraShield was created with a simple idea: insurance should be easier to understand, easier to buy and easier to manage. We bring together insurance products, digital experiences and human support to help customers protect what matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-heading mb-5">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Make insurance simpler and more accessible for every Australian — individuals, families and businesses alike.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe that protection should not require a law degree to understand or a week to purchase. So we rebuilt the insurance experience from the ground up, using modern technology and human-centred design.
              </p>
              <ul className="space-y-3">
                {[
                  'Clear, plain-language policies',
                  'Fast, fair claims handling',
                  'Proactive customer communication',
                  'Digital tools that actually work',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-brand-teal flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '50,000+', label: 'Customers Protected' },
                  { value: '$2.1B+', label: 'Coverage Issued' },
                  { value: '5 Products', label: 'Insurance Products' },
                  { value: '96%', label: 'Satisfaction Rate' },
                  { value: '300+', label: 'Broker Partners' },
                  { value: '< 24hrs', label: 'Avg Support Response' },
                ].map(stat => (
                  <div key={stat.label} className="text-center p-4 bg-white rounded-xl shadow-soft">
                    <div className="text-2xl font-bold text-brand-teal">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Approach</h2>
            <p className="section-subheading mx-auto">The principles that guide everything we do at TerraShield.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card text-center">
                  <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-brand-teal" />
                  </div>
                  <h3 className="font-bold text-brand-navy mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Story</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-8">
              {milestones.map(m => (
                <div key={m.year} className="flex gap-6 pl-4">
                  <div className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0 relative z-10 shadow-md">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="pb-2">
                    <div className="font-bold text-brand-teal text-sm mb-1">{m.year}</div>
                    <div className="text-gray-700">{m.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Leadership Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="card text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-navy/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-navy">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-bold text-brand-navy">{member.name}</h3>
                <div className="text-xs text-brand-teal font-semibold mt-1 mb-2">{member.role}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-center text-center">
            <div className="flex flex-col items-center gap-2">
              <Award className="w-10 h-10 text-brand-teal" />
              <div className="font-bold text-brand-navy">AFSL Licensed</div>
              <p className="text-sm text-gray-500">AFSL 000000 — Authorised by ASIC to provide financial services</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-10 h-10 text-brand-teal" />
              <div className="font-bold text-brand-navy">APRA Regulated</div>
              <p className="text-sm text-gray-500">Prudential standards enforced under APRA supervision</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Users className="w-10 h-10 text-brand-teal" />
              <div className="font-bold text-brand-navy">Member ANZIIF</div>
              <p className="text-sm text-gray-500">Active member of the Australia & NZ Institute of Insurance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join 50,000+ Australians we protect</h2>
          <p className="text-white/70 mb-8">Get started with a quote today and discover why TerraShield is Australia's most trusted insurtech platform.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/get-quote" className="btn-primary">
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
