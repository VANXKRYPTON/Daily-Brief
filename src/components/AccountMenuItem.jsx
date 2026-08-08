"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function AccountMenuItem({ icon, label, onClick, isSubtle = false }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onClick) onClick();
        }
      }}
      aria-label={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '13px 0',
        borderBottom: '1px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease'
      }}
      className="account-menu-item"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {icon}
        <span 
          style={{ 
            fontSize: '14px', 
            fontWeight: isSubtle ? 600 : 700, 
            color: '#0f172a' 
          }}
        >
          {label}
        </span>
      </div>
      <ChevronRight size={16} color="#94a3b8" />
    </div>
  );
}
