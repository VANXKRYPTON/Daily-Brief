'use client';

import React, { useState } from 'react';
import { X, Lock, CheckCircle2, ShieldCheck, KeyRound, UserCheck } from 'lucide-react';

export function LoginModal({ onClose, onLoginSuccess, onOpenSubscribe }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      onLoginSuccess({ email, name: email.split('@')[0] || 'Subscriber', isPremium: true });
    }, 600);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ email: 'subscriber@dailybrief.com', name: 'Member Subscriber', isPremium: true });
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content login-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="btn-close-modal" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Lock Icon Header */}
        <div className="login-modal-header">
          <div className="lock-icon-badge">
            <Lock size={28} color="#dc2626" />
          </div>
          <h2 className="login-title">
            Deep Dives <span className="gem-icon">💎</span> Member Access
          </h2>
          <p className="login-subtitle">
            Exclusive investigative reports, datasets, and 5-year forecasts are reserved for registered members.
          </p>
        </div>

        {/* Quick Demo Subscriber Login Notice */}
        <div className="demo-login-banner">
          <div className="banner-text">
            <strong>Free Reader?</strong> Log in or click below to unlock full access immediately.
          </div>
          <button 
            type="button" 
            className="btn-quick-demo"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            <UserCheck size={16} />
            <span>{isLoading ? 'Unlocking Access...' : 'Quick 1-Click Member Login'}</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-submit-login" disabled={isLoading}>
            <KeyRound size={16} />
            <span>{isLoading ? 'Signing In...' : 'Log In & Unlock Deep Dives 💎'}</span>
          </button>
        </form>

        {/* Benefits list */}
        <div className="login-benefits">
          <div className="benefit-item">
            <CheckCircle2 size={15} color="#dc2626" />
            <span>Full 50-page investigative Deep Dives</span>
          </div>
          <div className="benefit-item">
            <CheckCircle2 size={15} color="#dc2626" />
            <span>Interactive data charts & raw CSV downloads</span>
          </div>
          <div className="benefit-item">
            <CheckCircle2 size={15} color="#dc2626" />
            <span>Ad-free reading experience across all devices</span>
          </div>
        </div>

        {/* Footer Link to Subscribe */}
        <div className="login-footer">
          <span>Don't have a Daily Brief account?</span>
          <button 
            type="button" 
            className="link-subscribe-modal"
            onClick={() => {
              onClose();
              if (onOpenSubscribe) onOpenSubscribe();
            }}
          >
            Subscribe for All-Access →
          </button>
        </div>
      </div>
    </div>
  );
}
