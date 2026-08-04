'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Edit3 } from 'lucide-react';
import { CrestLogo } from './CrestLogo';

export function LoginModal({ onClose, onLoginSuccess, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const [contactWhatsapp, setContactWhatsapp] = useState(true);
  const [stayLoggedIn, setStayLoggedIn] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ 
        email, 
        name: email.split('@')[0] || 'Subscriber', 
        mobile: mobile || null,
        isPremium: true 
      });
      onClose();
    }, 500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ 
        email: `${provider.toLowerCase()}user@dailybrief.com`, 
        name: `${provider} Subscriber`, 
        isPremium: true 
      });
      onClose();
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 99999 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          background: '#ffffff', 
          color: '#111111', 
          width: '92%', 
          maxWidth: '460px', 
          borderRadius: '16px', 
          padding: '36px 32px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          fontFamily: 'var(--font-sans, system-ui, sans-serif)'
        }}
      >
        {/* Top Right Circle Close Button */}
        <button 
          onClick={onClose} 
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '-14px',
            right: '-14px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#475569',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        {/* Newspaper Crest & Title */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 900, letterSpacing: '1.5px', color: '#111', textTransform: 'uppercase' }}>
              DAILY
            </span>
            <CrestLogo style={{ height: '32px', width: 'auto', color: '#111' }} />
            <span style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 900, letterSpacing: '1.5px', color: '#111', textTransform: 'uppercase' }}>
              BRIEF
            </span>
          </div>

          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>
            {mode === 'login' ? 'Login to your account' : 'Sign Up'}
          </h2>

          <div style={{ fontSize: '14px', color: '#475569' }}>
            {mode === 'login' ? (
              <span>
                Don't have an account ?{' '}
                <button 
                  type="button" 
                  onClick={() => { setMode('signup'); setError(''); }} 
                  style={{ color: '#0f172a', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Sign up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button 
                  type="button" 
                  onClick={() => { setMode('login'); setError(''); }} 
                  style={{ color: '#0f172a', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Social Login Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '22px' }}>
          <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>Continue with</span>
          
          {/* Apple Button */}
          <button 
            type="button" 
            onClick={() => handleSocialLogin('Apple')}
            style={{
              width: '52px',
              height: '46px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s'
            }}
            title="Continue with Apple"
          >
            <svg width="20" height="22" viewBox="0 0 170 170" fill="#000000">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.82.13-9.74-1.92-14.75-6.14-3.32-2.73-7.2-7.37-11.64-13.92-6.52-9.67-11.65-20.67-15.39-33.01-3.74-12.33-5.61-24.32-5.61-35.95 0-14.73 3.66-26.79 10.98-36.19 7.32-9.4 16.63-14.22 27.93-14.47 4.58 0 9.77 1.15 15.56 3.46 5.79 2.3 9.69 3.46 11.71 3.46 1.83 0 5.86-1.2 12.09-3.61 6.23-2.41 11.45-3.51 15.66-3.3 11.05.74 19.86 4.67 26.43 11.79-9.87 5.96-14.7 14.3-14.49 25.02.21 8.35 3.37 15.42 9.48 21.2 6.11 5.78 13.43 9.07 21.96 9.87-2.3 6.94-5.32 14.2-9.06 21.78zM119.22 31.84c0-6.85 2.45-13.43 7.35-19.74 4.9-6.31 11.05-10.23 18.45-11.77.42 1.68.63 3.25.63 4.71 0 6.95-2.52 13.72-7.56 20.31-5.04 6.59-11.29 10.42-18.75 11.49-.07-1.68-.12-3.35-.12-5z"/>
            </svg>
          </button>

          {/* Google Button */}
          <button 
            type="button" 
            onClick={() => handleSocialLogin('Google')}
            style={{
              width: '52px',
              height: '46px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s'
            }}
            title="Continue with Google"
          >
            <svg width="22" height="22" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#94a3b8', fontSize: '13px' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          <span style={{ padding: '0 14px' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13px', padding: '10px 14px', borderRadius: '8px' }}>
              {error}
            </div>
          )}

          {/* Email Input */}
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                fontSize: '14px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                outline: 'none',
                background: '#ffffff',
                color: '#111111'
              }}
            />
          </div>

          {/* Sign Up Mode Additional Fields */}
          {mode === 'signup' && (
            <>
              {/* Password Input with eye toggle */}
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 42px',
                    fontSize: '14px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    outline: 'none',
                    background: '#ffffff',
                    color: '#111111'
                  }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Mobile Number Input */}
              <div style={{ position: 'relative' }}>
                <Edit3 size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="tel" 
                  placeholder="enter your 10 digit mobile number" 
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    fontSize: '14px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    outline: 'none',
                    background: '#ffffff',
                    color: '#111111'
                  }}
                />
              </div>

              {/* Checkboxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#334155', cursor: 'pointer', lineHeight: 1.35 }}>
                  <input 
                    type="checkbox" 
                    checked={receiveUpdates} 
                    onChange={(e) => setReceiveUpdates(e.target.checked)}
                    style={{ accentColor: '#000000', marginTop: '2px' }} 
                  />
                  <span>I'd like to receive updates and offers from Daily Brief via email and messages</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={contactWhatsapp} 
                    onChange={(e) => setContactWhatsapp(e.target.checked)}
                    style={{ accentColor: '#000000' }} 
                  />
                  <span>Contact me via Whatsapp</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={stayLoggedIn} 
                    onChange={(e) => setStayLoggedIn(e.target.checked)}
                    style={{ accentColor: '#000000' }} 
                  />
                  <span>Stay logged in</span>
                </label>
              </div>
            </>
          )}

          {/* Full Width Black Action Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              width: '100%',
              background: '#000000',
              color: '#ffffff',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '15px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'background-color 0.2s'
            }}
          >
            {isLoading ? 'PROCESSING...' : (mode === 'login' ? 'NEXT' : 'SIGN UP')}
          </button>
        </form>

        {/* Footer Notice */}
        <div style={{ marginTop: '22px', textAlign: 'center', fontSize: '12px', color: '#64748b', lineHeight: 1.45 }}>
          {mode === 'login' ? (
            <p>
              If you have an account with Daily Brief, e-Paper, or Premium Intelligence, you can use the same account to login here.
            </p>
          ) : (
            <p>
              By signing up, you agree to Daily Brief's{' '}
              <a href="#" style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'underline' }}>Terms of Use</a>{' '}
              and{' '}
              <a href="#" style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'underline' }}>Privacy Policy</a>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
