import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle, Car, Home, Plane, Heart, Briefcase } from 'lucide-react';

const products = [
  {
    id: 'motor',
    icon: Car,
    title: 'Motor Insurance',
    tagline: 'Drive with confidence',
    description:
      'Whether you drive a family car, ute, SUV or something sporty, TerraShield Motor Insurance has you covered. Choose from comprehensive, third party fire & theft, or third party property options.',
    options: [
      {
        name: 'Comprehensive',
        desc: 'Our most complete coverage — protects your vehicle against accidents, theft, fire, storm damage and third party liability.',
        features: ['Accidental damage & theft', 'Third party liability up to $20M', 'Emergency roadside assistance', 'Hire car (up to 14 days)', 'Windscreen & window cover', 'New car replacement (within 2 years)'],
      },
      {
        name: 'Third Party Fire & Theft',
        desc: 'Cover your vehicle against theft and fire damage, plus third party liability.',
        features: ['Fire & theft protection', 'Third party property damage', 'Towing after accident'],
      },
      {
        name: 'Third Party Property',
        desc: 'Basic protection for damage you cause to other people\'s property.',
        features: ['Third party property damage', 'Legal liability', 'Uninsured motorist benefit'],
      },
    ],
    color: 'bg-blue-600',
    gradient: 'from-blue-500 to-blue-700',
    lightBg: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    id: 'home',
    icon: Home,
    title: 'Home & Contents Insurance',
    tagline: 'Protect your most important place',
    description:
      'Your home is your most valuable asset. Our Home & Contents Insurance provides broad protection for your building, your belongings and unexpected events that can happen at any time.',
    options: [
      {
        name: 'Combined Home & Contents',
        desc: 'Our most popular option — covers both your building structure and personal contents in one convenient policy.',
        features: ['Building structure coverage', 'Contents up to $200,000', 'Storm, fire & flood protection', 'Theft & malicious damage', 'Accidental damage option', 'Temporary accommodation'],
      },
      {
        name: 'Building Only',
        desc: 'Ideal for landlords or owners who need to insure the structure only.',
        features: ['Building & permanent fixtures', 'Landlord liability', 'Loss of rent coverage'],
      },
      {
        name: 'Contents Only',
        desc: 'For renters or those who want to protect belongings separately.',
        features: ['Personal items & furniture', 'Portable valuables', 'Accidental damage'],
      },
    ],
    color: 'bg-emerald-600',
    gradient: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50',
    textColor: 'text-emerald-700',
  },
  {
    id: 'travel',
    icon: Plane,
    title: 'Travel Insurance',
    tagline: 'Explore the world, worry-free',
    description:
      'From weekend getaways to extended international adventures, TerraShield Travel Insurance ensures that unexpected events do not derail your plans or drain your savings.',
    options: [
      {
        name: 'International Comprehensive',
        desc: 'Complete peace of mind for overseas travel with broad medical and cancellation coverage.',
        features: ['Unlimited emergency medical', 'Medical evacuation & repatriation', 'Trip cancellation up to $15,000', 'Lost/stolen luggage up to $5,000', 'Travel delay cover', '24/7 emergency assistance'],
      },
      {
        name: 'Domestic',
        desc: 'Protection for Australian travel — cancellation cover and personal item protection.',
        features: ['Trip cancellation cover', 'Luggage & personal effects', 'Rental car excess cover'],
      },
      {
        name: 'Annual Multi-Trip',
        desc: 'Ideal for frequent travellers — one policy covers all your trips throughout the year.',
        features: ['Multiple international trips', 'Per-trip medical coverage', 'Adventure sports option'],
      },
    ],
    color: 'bg-purple-600',
    gradient: 'from-purple-500 to-purple-700',
    lightBg: 'bg-purple-50',
    textColor: 'text-purple-700',
  },
  {
    id: 'life',
    icon: Heart,
    title: 'Life Insurance',
    tagline: 'Financial protection for your family',
    description:
      'Ensure that the people who depend on you are financially protected. TerraShield Life Insurance provides flexible coverage to match your family\'s needs and goals.',
    options: [
      {
        name: 'Life Cover',
        desc: 'A lump sum payment to your beneficiaries in the event of your death or terminal illness.',
        features: ['Lump sum death benefit', 'Terminal illness benefit (12 months)', 'Indexation option', 'Premium waiver on disability', 'Conversion to trauma at 65', 'Worldwide coverage'],
      },
      {
        name: 'Total & Permanent Disability (TPD)',
        desc: 'Financial support if you become totally and permanently disabled.',
        features: ['Own occupation definition available', 'Lump sum benefit', 'Rehabilitation support'],
      },
      {
        name: 'Income Protection',
        desc: 'Replace your income if illness or injury prevents you from working.',
        features: ['Up to 70% of income replaced', 'Waiting period options (30–90 days)', 'Benefit period up to 5 years'],
      },
    ],
    color: 'bg-rose-600',
    gradient: 'from-rose-500 to-rose-700',
    lightBg: 'bg-rose-50',
    textColor: 'text-rose-700',
  },
  {
    id: 'business',
    icon: Briefcase,
    title: 'Business Insurance',
    tagline: 'Protect the business you built',
    description:
      'Every Australian business deserves reliable protection. TerraShield Business Insurance covers your operations, your people and your professional services.',
    options: [
      {
        name: 'Professional Indemnity',
        desc: 'Protect yourself and your business from claims arising from professional services or advice.',
        features: ['Professional negligence claims', 'Legal costs & settlements', 'Prior acts coverage', 'Cyber liability add-on', 'Regulatory investigations', 'Run-off coverage available'],
      },
      {
        name: 'Public & Products Liability',
        desc: 'Cover for third party injury or property damage arising from your business activities.',
        features: ['Public liability up to $20M', 'Products liability', 'Legal defence costs'],
      },
      {
        name: 'Business Package',
        desc: 'A comprehensive package combining property, liability and business interruption coverage.',
        features: ['Business property & stock', 'Business interruption cover', 'Machinery & equipment', 'Liability cover included'],
      },
    ],
    color: 'bg-amber-600',
    gradient: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    textColor: 'text-amber-700',
  },
];

export default function InsurancePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace('#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-gradient py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Insurance for every part of life
            </h1>
            <p className="text-white/70 text-lg">
              Flexible, straightforward insurance products designed to protect what matters most to you and your family.
            </p>
          </div>
        </div>
      </section>

      {/* Product anchors */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {products.map(p => {
              const Icon = p.icon;
              return (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-brand-teal hover:bg-brand-teal/5 transition-colors whitespace-nowrap"
                >
                  <Icon className="w-4 h-4" />
                  {p.title}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products */}
      {products.map((product, idx) => {
        const Icon = product.icon;
        return (
          <section
            key={product.id}
            id={product.id}
            className={`py-20 ${idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <p className={`text-sm font-semibold ${product.textColor} mb-1`}>{product.tagline}</p>
                  <h2 className="text-3xl font-bold text-brand-navy mb-4">{product.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                  <div className="flex gap-3">
                    <Link to={`/get-quote?product=${product.id}`} className="btn-primary">
                      Get a Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="space-y-4">
                  {product.options.map(opt => (
                    <div key={opt.name} className="card">
                      <h3 className="font-bold text-brand-navy mb-1">{opt.name}</h3>
                      <p className="text-gray-500 text-sm mb-3">{opt.desc}</p>
                      <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                        {opt.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-16 bg-brand-teal">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Not sure which product is right for you?</h2>
          <p className="text-white/80 mb-8">Our specialists are ready to help you find the right coverage for your situation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-quote" className="btn-primary bg-white text-brand-teal hover:bg-gray-50 shadow-none">
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
