import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft, Shield } from 'lucide-react';
import { submitQuote } from '../services/customerService';

const productOptions = [
  { value: 'Motor', label: 'Motor Insurance', emoji: '🚗' },
  { value: 'Home', label: 'Home & Contents Insurance', emoji: '🏠' },
  { value: 'Travel', label: 'Travel Insurance', emoji: '✈️' },
  { value: 'Life', label: 'Life Insurance', emoji: '❤️' },
  { value: 'Business', label: 'Business Insurance', emoji: '💼' },
];

interface FormField { name: string; label: string; placeholder: string; type?: string; }

const motorFields: FormField[] = [
  { name: 'vehicleMake', label: 'Vehicle Make', placeholder: 'e.g. Toyota' },
  { name: 'vehicleModel', label: 'Vehicle Model', placeholder: 'e.g. Corolla' },
  { name: 'vehicleYear', label: 'Year of Manufacture', placeholder: 'e.g. 2021' },
  { name: 'rego', label: 'Registration Number', placeholder: 'e.g. ABC 123' },
  { name: 'estimatedValue', label: 'Estimated Vehicle Value', placeholder: 'e.g. $25,000' },
];

const homeFields: FormField[] = [
  { name: 'propertyAddress', label: 'Property Address', placeholder: '123 Main Street' },
  { name: 'propertyType', label: 'Property Type', placeholder: 'e.g. House, Unit, Townhouse' },
  { name: 'buildingValue', label: 'Estimated Building Value', placeholder: 'e.g. $650,000' },
  { name: 'contentsValue', label: 'Estimated Contents Value', placeholder: 'e.g. $80,000' },
  { name: 'yearBuilt', label: 'Year Built', placeholder: 'e.g. 1995' },
];

const travelFields: FormField[] = [
  { name: 'destination', label: 'Destination', placeholder: 'e.g. Bali, Indonesia' },
  { name: 'departureDate', label: 'Departure Date', placeholder: 'DD/MM/YYYY', type: 'date' },
  { name: 'returnDate', label: 'Return Date', placeholder: 'DD/MM/YYYY', type: 'date' },
  { name: 'travellers', label: 'Number of Travellers', placeholder: 'e.g. 2' },
];

const lifeFields: FormField[] = [
  { name: 'coverAmount', label: 'Desired Cover Amount', placeholder: 'e.g. $1,000,000' },
  { name: 'smoker', label: 'Do you smoke?', placeholder: 'Yes / No' },
  { name: 'occupation', label: 'Occupation', placeholder: 'e.g. Software Engineer' },
];

const businessFields: FormField[] = [
  { name: 'businessName', label: 'Business Name', placeholder: 'Your business name' },
  { name: 'industry', label: 'Industry / Profession', placeholder: 'e.g. Accounting, IT, Construction' },
  { name: 'abn', label: 'ABN (optional)', placeholder: '00 000 000 000' },
  { name: 'employees', label: 'Number of Employees', placeholder: 'e.g. 5' },
  { name: 'coverAmount', label: 'Desired Cover Amount', placeholder: 'e.g. $2,000,000' },
];

const productFieldsMap: Record<string, FormField[]> = {
  Motor: motorFields,
  Home: homeFields,
  Travel: travelFields,
  Life: lifeFields,
  Business: businessFields,
};

interface FormData {
  product: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  details: Record<string, string>;
}

export default function GetQuotePage() {
  const [params] = useSearchParams();
  const initialProduct = params.get('product') || '';

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    product: initialProduct
      ? productOptions.find(p => p.value.toLowerCase() === initialProduct.toLowerCase())?.value || ''
      : '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    details: {},
  });
  const [loading, setLoading] = useState(false);
  const [quoteId, setQuoteId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1 && !form.product) errs.product = 'Please select an insurance type';
    if (step === 2) {
      if (!form.firstName) errs.firstName = 'First name is required';
      if (!form.lastName) errs.lastName = 'Last name is required';
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required';
      if (!form.phone) errs.phone = 'Phone number is required';
      if (!form.dob) errs.dob = 'Date of birth is required';
      if (!form.address) errs.address = 'Address is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validate()) setStep(s => s + 1);
  };

  const back = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const id = await submitQuote({
        productType: form.product as any,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        details: { ...form.details, address: form.address, dob: form.dob },
      });
      setQuoteId(id);
      setStep(5);
    } finally {
      setLoading(false);
    }
  };

  const productFields = productFieldsMap[form.product] || [];

  if (step === 5) {
    const product = productOptions.find(p => p.value === form.product);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-brand-navy mb-2">Quote Request Submitted!</h1>
          <p className="text-gray-500 mb-8">A TerraShield insurance specialist will contact you shortly.</p>
          <div className="card text-left space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Quote Reference</span>
              <span className="font-semibold text-brand-teal">{quoteId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Product</span>
              <span className="font-medium">{product?.emoji} {form.product} Insurance</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{form.firstName} {form.lastName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{form.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Expected Follow-up</span>
              <span className="font-medium">Within 1 business day</span>
            </div>
          </div>
          <div className="space-y-3">
            <a href="/" className="block btn-primary text-center">Return Home</a>
            <a href="/register" className="block btn-secondary text-center">Create My Account</a>
          </div>
        </div>
      </div>
    );
  }

  const steps = ['Insurance Type', 'Your Details', 'Coverage Details', 'Review'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-brand-navy">Get a Quote</h1>
            <span className="text-sm text-gray-500">Step {step} of 4</span>
          </div>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i + 1 <= step ? 'bg-brand-teal' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {steps.map((s, i) => (
              <span key={i} className={`text-[10px] ${i + 1 === step ? 'text-brand-teal font-semibold' : 'text-gray-400'}`}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          {/* Step 1: Product */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-brand-navy mb-5">What type of insurance do you need?</h2>
              <div className="space-y-2 mb-6">
                {productOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setForm(f => ({ ...f, product: opt.value })); setErrors({}); }}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      form.product === opt.value
                        ? 'border-brand-teal bg-brand-teal/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="font-medium text-brand-navy">{opt.label}</span>
                    {form.product === opt.value && (
                      <CheckCircle className="w-5 h-5 text-brand-teal ml-auto" />
                    )}
                  </button>
                ))}
              </div>
              {errors.product && <p className="text-red-500 text-sm mb-4">{errors.product}</p>}
              <button onClick={next} className="btn-primary w-full justify-center">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-brand-navy mb-5">Your personal details</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label">First Name *</label>
                  <input
                    className={`form-input ${errors.firstName ? 'border-red-400' : ''}`}
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    placeholder="Jane"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="form-label">Last Name *</label>
                  <input
                    className={`form-input ${errors.lastName ? 'border-red-400' : ''}`}
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    placeholder="Smith"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'border-red-400' : ''}`}
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane.smith@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  className={`form-input ${errors.phone ? 'border-red-400' : ''}`}
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="04XX XXX XXX"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="form-label">Date of Birth *</label>
                <input
                  type="date"
                  className={`form-input ${errors.dob ? 'border-red-400' : ''}`}
                  value={form.dob}
                  onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>
              <div className="mb-6">
                <label className="form-label">Residential Address *</label>
                <input
                  className={`form-input ${errors.address ? 'border-red-400' : ''}`}
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="123 Main Street, Sydney NSW 2000"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div className="flex gap-3">
                <button onClick={back} className="btn-secondary flex-1 justify-center">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={next} className="btn-primary flex-1 justify-center">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Product Details */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-brand-navy mb-5">
                {productOptions.find(p => p.value === form.product)?.label} details
              </h2>
              <div className="space-y-4 mb-6">
                {productFields.map(field => (
                  <div key={field.name}>
                    <label className="form-label">{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      className="form-input"
                      placeholder={field.placeholder}
                      value={form.details[field.name] || ''}
                      onChange={e =>
                        setForm(f => ({
                          ...f,
                          details: { ...f.details, [field.name]: e.target.value },
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={back} className="btn-secondary flex-1 justify-center">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={next} className="btn-primary flex-1 justify-center">
                  Review <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-bold text-brand-navy mb-5">Review your quote request</h2>
              <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Product</span>
                  <span className="font-medium">{form.product} Insurance</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium">{form.firstName} {form.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium">{form.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium">{form.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Address</span>
                  <span className="font-medium text-right max-w-[60%]">{form.address}</span>
                </div>
                {Object.entries(form.details).map(([k, v]) => v && (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-500 capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-brand-teal/5 rounded-xl p-4 mb-6 flex gap-3">
                <Shield className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  By submitting this form, you agree that a TerraShield specialist may contact you to discuss your insurance needs. We handle your information in accordance with our Privacy Policy.
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={back} className="btn-secondary flex-1 justify-center">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-primary flex-1 justify-center disabled:opacity-70"
                >
                  {loading ? 'Submitting...' : <>Submit Quote <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
