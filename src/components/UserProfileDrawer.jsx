"use client";

import React from 'react';
import { 
  X, 
  Lock, 
  ChevronRight, 
  Mail, 
  Phone,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function UserProfileDrawer({ 
  isOpen, 
  onClose, 
  user, 
  isLoggedIn, 
  onLogout, 
  onOpenSubscribe,
  onOpenBookmarks
}) {
  if (!isOpen) return null;

  const isSubscriber = user?.isSubscriber || user?.isPremium || false;
  const userEmail = user?.email || 'adityakumar08092004@gmail.com';

  const benefitsList = [
    { name: 'eBooks', icon: <Lock size={16} color="#b91c1c" /> },
    { name: 'Webinars', icon: <Lock size={16} color="#b91c1c" /> },
    { name: 'Newsletters', icon: <Lock size={16} color="#b91c1c" /> },
    { name: 'Games', icon: <Lock size={16} color="#b91c1c" /> },
    { name: 'Monthly Digest', icon: <Lock size={16} color="#b91c1c" /> }
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '380px',
          height: '100%',
          background: '#ffffff',
          color: '#0f172a',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.3)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row with Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#e5e7eb', borderBottom: '1px solid #d1d5db' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            MY ACCOUNT
          </span>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#475569', padding: '4px', cursor: 'pointer', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Close Profile"
          >
            <X size={20} />
          </button>
        </div>

        {/* Section 1: Grey Profile Card (Matches User Screenshot 100%) */}
        <div style={{ background: '#e5e7eb', padding: '20px 24px 24px 24px', borderBottom: '1px solid #d1d5db' }}>
          <div style={{ color: '#991b1b', fontSize: '13px', fontWeight: 700, marginBottom: '2px' }}>
            You are logged in
          </div>
          <div style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, wordBreak: 'break-all', marginBottom: '16px' }}>
            {userEmail}
          </div>

          {/* LOGOUT Button */}
          <button
            onClick={() => {
              if (onLogout) onLogout();
              onClose();
            }}
            style={{
              width: '100%',
              background: '#ffffff',
              border: '1px solid #0f172a',
              borderRadius: '2px',
              padding: '10px',
              color: '#0f172a',
              fontWeight: 800,
              fontSize: '13px',
              letterSpacing: '1px',
              cursor: 'pointer',
              marginBottom: '20px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
          >
            LOGOUT
          </button>

          {/* Active Subscription Status */}
          {isSubscriber ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '4px', padding: '10px 14px', marginBottom: '12px' }}>
              <CheckCircle size={18} color="#059669" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>Active Premium Subscriber</div>
                <div style={{ fontSize: '11px', color: '#047857' }}>All premium stories & eBooks unlocked</div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>
                You don't have any Active Subscription.
              </div>

              {/* SUBSCRIBE NOW Button */}
              <button
                onClick={() => {
                  onClose();
                  if (onOpenSubscribe) onOpenSubscribe();
                }}
                style={{
                  width: '100%',
                  background: '#b91c1c',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '2px',
                  padding: '12px',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(185, 28, 28, 0.3)',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#991b1b'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#b91c1c'}
              >
                SUBSCRIBE NOW
              </button>

              <div style={{ color: '#475569', fontSize: '12px', lineHeight: '1.4', marginTop: '12px' }}>
                Subscribed with another email? Logout and Login with that one.
              </div>
            </>
          )}
        </div>

        {/* Section 2: Subscription Benefits (Matches User Screenshot) */}
        <div style={{ padding: '24px' }}>
          <div style={{ color: '#991b1b', fontSize: '13px', fontWeight: 700, lineHeight: '1.45', marginBottom: '16px' }}>
            Account subscription benefits alongside Premium Stories, Editorials, Opinions and more. Unlock these with Subscription
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {benefitsList.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  if (!isSubscriber && onOpenSubscribe) {
                    onClose();
                    onOpenSubscribe();
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {isSubscriber ? <Sparkles size={16} color="#059669" /> : item.icon}
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{item.name}</span>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </div>
            ))}
          </div>

          {/* Section 3: Account Settings */}
          <div style={{ color: '#991b1b', fontSize: '13px', fontWeight: 700, marginTop: '24px', marginBottom: '12px' }}>
            Account Settings
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              onClick={() => {
                alert(`Account Settings\nEmail: ${userEmail}\nStatus: ${isSubscriber ? 'Premium Member' : 'Free Reader'}`);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Go to My Account</span>
              <ChevronRight size={16} color="#94a3b8" />
            </div>

            <div
              onClick={() => {
                onClose();
                if (onOpenBookmarks) onOpenBookmarks();
                else alert("Your Saved Bookmarks opened.");
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Bookmarks</span>
              <ChevronRight size={16} color="#94a3b8" />
            </div>
          </div>

          {/* Section 4: Customer Support Footer */}
          <div style={{ color: '#991b1b', fontSize: '13px', fontWeight: 700, marginTop: '28px', marginBottom: '14px' }}>
            Need help with your subscription?
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a 
              href="mailto:customersupport@dailybrief.com" 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0f172a', textDecoration: 'none', fontSize: '13.5px', fontWeight: 600, borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}
            >
              <Mail size={18} color="#b91c1c" />
              <span>customersupport@dailybrief.com</span>
            </a>

            <a 
              href="tel:18001021878" 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0f172a', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}
            >
              <Phone size={18} color="#b91c1c" />
              <span>1800 102 1878</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
