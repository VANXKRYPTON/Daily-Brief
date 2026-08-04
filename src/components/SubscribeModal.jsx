import React from 'react';
import { X, Check, ShieldCheck, Zap, BookOpen } from 'lucide-react';

export const SubscribeModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '720px', padding: '32px' }}
      >
        <button className="btn-close-modal" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#111', marginBottom: '8px' }}>
            Subscribe to THE DAILY BRIEF
          </h2>
          <p style={{ color: '#555', fontSize: '15px' }}>
            Unbiased journalism, exclusive editorial analysis, and digital e-Paper access.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          {/* Card 1: All Access Digital */}
          <div style={{ border: '2px solid #900000', borderRadius: '6px', padding: '20px', background: '#fffbfb', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', right: '16px', background: '#900000', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '3px', textTransform: 'uppercase' }}>
              Most Popular
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>Digital All-Access</h3>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#900000', marginBottom: '14px' }}>
              ₹99 <span style={{ fontSize: '14px', color: '#666', fontWeight: 400 }}>/ month</span>
            </div>
            <ul style={{ listStyle: 'none', fontSize: '13px', color: '#333', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#900000" /> Unlimited website & app stories</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#900000" /> Daily e-Paper digital replica</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#900000" /> Ad-lite reader experience</li>
            </ul>
            <button className="btn-subscribe" style={{ width: '100%', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Card 2: Print + Digital Combo */}
          <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '20px', background: '#fff' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>Print + Digital Combo</h3>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#111', marginBottom: '14px' }}>
              ₹249 <span style={{ fontSize: '14px', color: '#666', fontWeight: 400 }}>/ month</span>
            </div>
            <ul style={{ listStyle: 'none', fontSize: '13px', color: '#333', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#444" /> Home delivery of daily broadsheet</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#444" /> Full e-Paper & archives access</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#444" /> Sunday Magazine included</li>
            </ul>
            <button style={{ width: '100%', padding: '10px', background: '#111', color: '#fff', fontWeight: 800, fontSize: '12px', borderRadius: '4px', textTransform: 'uppercase' }}>
              Get Combo Pack
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '12px', color: '#777', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldCheck size={14} /> Cancel anytime</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Zap size={14} /> Instant activation</span>
        </div>
      </div>
    </div>
  );
};
