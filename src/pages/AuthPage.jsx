import { useState } from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

export default function AuthPage({ onSuccess }) {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setError('');
  };

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    const name = String(form.get('name') || '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Your password needs at least 8 characters.');
      return;
    }

    if (mode === 'signup' && name.length < 2) {
      setError('Enter your name so we know what to call you.');
      return;
    }

    if (mode === 'signup' && password !== form.get('confirmPassword')) {
      setError('Those passwords don’t match yet.');
      return;
    }

    onSuccess(mode === 'signup' ? name : email.split('@')[0]);
  };

  return (
    <main className="auth-page">
      <div className="auth-page-glow" />
      <a className="auth-brand" href="#welcome">
        <img src="/istore-mark.svg" alt="" />
        <span>iStore</span>
      </a>
      <section className="auth-page-layout">
        <div className="auth-welcome-copy">
          <span className="eyebrow">YOUR WORLD, A LITTLE CLOSER</span>
          <h1>Your world.<br /><em>One store.</em></h1>
          <p>Thoughtful technology. A more personal way to find the things that make every day feel like yours.</p>
          <div className="auth-benefits">
            <span><FiCheck /> Thoughtful picks, just for you</span>
            <span><FiCheck /> Easy, secure checkout</span>
            <span><FiCheck /> Your orders, always in reach</span>
          </div>
        </div>
        <section className="auth-card" aria-label={mode === 'login' ? 'Sign in' : 'Create account'}>
          <div className="auth-tabs">
            <button className={mode === 'login' ? 'active' : ''} onClick={() => changeMode('login')}>Sign in</button>
            <button className={mode === 'signup' ? 'active' : ''} onClick={() => changeMode('signup')}>Create account</button>
          </div>
          <span className="eyebrow">{mode === 'login' ? 'WELCOME BACK' : 'A NICE PLACE TO BEGIN'}</span>
          <h2>{mode === 'login' ? 'Good to see you.' : 'Make yourself at home.'}</h2>
          <p>{mode === 'login' ? 'Sign in to discover your next favourite.' : 'A few details, and you’re part of iStore.'}</p>
          <form onSubmit={submit} noValidate>
            {mode === 'signup' && (
              <label>
                Your name
                <input name="name" type="text" autoComplete="name" placeholder="How should we call you?" />
              </label>
            )}
            <label>
              Email address
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label>
              Password
              <input name="password" type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} placeholder="At least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            {mode === 'signup' && (
              <label>
                Confirm password
                <input name="confirmPassword" type="password" autoComplete="new-password" placeholder="Enter your password again" />
              </label>
            )}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button auth-submit" type="submit">
              {mode === 'login' ? 'Sign in to iStore' : 'Create my account'} <FiArrowRight />
            </button>
          </form>
          <div className="demo-credentials">
            <strong>Try the demo</strong>
            <span>Email: store@demo.com</span>
            <span>Password: Store123!</span>
            {mode === 'login' && (
              <button type="button" onClick={() => { setEmail('store@demo.com'); setPassword('Store123!'); }}>
                Fill demo credentials
              </button>
            )}
          </div>
          <p className="auth-privacy">By continuing, you agree to our Terms and Privacy Policy.</p>
        </section>
      </section>
      <div className="auth-page-footer"><span>© 2026 iStore</span><span>YOUR WORLD. ONE STORE.</span></div>
    </main>
  );
}
