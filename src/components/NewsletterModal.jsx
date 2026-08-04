'use client';

import React, { useState } from 'react';
import { X, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

export function NewsletterModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px', textAlignment: 'center' }}
      >
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--text-muted)' }}
        >
          <X size={20} />
        </button>

        {subscribed ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
              Welcome to Daily Brief Pro
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              We've dispatched your first morning intelligence briefing to <strong>{email}</strong>.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Mail size={24} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 900, textAlign: 'center', marginBottom: '8px' }}>
              The Morning Briefing
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
              Essential global news, deep tech analysis, and market intelligence delivered to your inbox every day at 6:00 AM EST.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input 
                type="email" 
                placeholder="Enter your corporate or personal email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}
              />
              <button 
                type="submit" 
                style={{ padding: '12px', background: 'var(--accent-emerald)', color: '#fff', fontWeight: 800, borderRadius: 'var(--radius-sm)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
              >
                Get Free Morning Access
              </button>
            </form>

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} />
              <span>Zero spam. Unsubscribe with 1-click anytime.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
