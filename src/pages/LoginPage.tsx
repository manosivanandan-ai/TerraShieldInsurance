import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { demoCredentials } from '../data/mockData';

export default function LoginPage() {
  const [params] = useSearchParams();
  const [type, setType] = useState<'customer' | 'broker'>(
    params.get('type') === 'broker' ? 'broker' : 'customer'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const ok = login(email, password, type);
    setLoading(false);
    if (ok) {
      navigate(type === 'broker' ? '/broker-portal' : '/customer-portal');
    } else {
      setError('Invalid email or password. Use the demo credentials below.');
    }
  };

  const fillDemo = () => {
    const cred = type === 'customer' ? demoCredentials.customer : demoCredentials.broker;
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-brand-navy text-xl leading-none">TerraShield</div>
              <div className="text-xs text-brand-teal font-medium">Insurance</div>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-brand-navy">Welcome back</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to your account</p>
        </div>

        {/* Type Toggle */}
        <div className="flex bg-white rounded-xl border border-gray-200 p-1 mb-6">
          {(['customer', 'broker'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setType(t); setError(''); setEmail(''); setPassword(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                type === t
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t === 'customer' ? 'Customer' : 'Broker'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="form-label mb-0">Password</label>
              <button type="button" className="text-xs text-brand-teal hover:underline">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                className="form-input pr-10"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-3 text-base disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-4 bg-brand-navy/5 rounded-xl p-4 border border-brand-navy/10">
          <p className="text-xs font-semibold text-brand-navy mb-2">Demo Credentials</p>
          {type === 'customer' ? (
            <div className="space-y-1 text-xs text-gray-600">
              <div>Email: <span className="font-mono text-brand-navy">{demoCredentials.customer.email}</span></div>
              <div>Password: <span className="font-mono text-brand-navy">{demoCredentials.customer.password}</span></div>
            </div>
          ) : (
            <div className="space-y-1 text-xs text-gray-600">
              <div>Email: <span className="font-mono text-brand-navy">{demoCredentials.broker.email}</span></div>
              <div>Password: <span className="font-mono text-brand-navy">{demoCredentials.broker.password}</span></div>
            </div>
          )}
          <button
            onClick={fillDemo}
            className="mt-2 text-xs text-brand-teal hover:underline font-medium"
          >
            Fill demo credentials →
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-teal hover:underline font-medium">
            Create one →
          </Link>
        </p>
      </div>
    </div>
  );
}
