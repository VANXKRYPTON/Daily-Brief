'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Search } from 'lucide-react';
import { HERO_FEATURED, HERO_SECONDARY, MAIN_ARTICLES } from '../data/newsData';

export function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('');

  const all = [HERO_FEATURED, ...HERO_SECONDARY, ...MAIN_ARTICLES];
  const results = query.trim() === '' 
    ? all.slice(0, 4)
    : all.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--text-muted)' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
          <Search size={20} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search news, topics, authors (e.g., Compute, Energy, Fusion)..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{ width: '100%', border: 'none', background: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '15px', fontFamily: 'var(--font-sans)' }}
          />
        </div>

        <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
            {query.trim() === '' ? 'Suggested Articles' : `Results (${results.length})`}
          </div>

          {results.map((item) => (
            <Link 
              key={item.id} 
              href={`/article/${item.slug || item.id}`}
              onClick={onClose}
              style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}
            >
              <div className="category-tag" style={{ fontSize: '10px', marginBottom: '2px' }}>
                {item.category}
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                {item.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
