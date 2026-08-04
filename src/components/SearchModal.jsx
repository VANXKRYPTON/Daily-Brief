import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { HERO_STORY, MIDDLE_FEED_STORIES, RIGHT_LEAD_STORY, LATEST_NEWS } from '../data/newsData';

export const SearchModal = ({ onClose, onArticleClick }) => {
  const [query, setQuery] = useState('');

  const allArticles = [
    HERO_STORY,
    ...MIDDLE_FEED_STORIES,
    RIGHT_LEAD_STORY,
    ...LATEST_NEWS.map(n => ({ ...n, author: "NEWS WIRE", content: n.title }))
  ];

  const filtered = query.trim() === '' 
    ? allArticles.slice(0, 5)
    : allArticles.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) || 
        (a.category && a.category.toLowerCase().includes(query.toLowerCase())) ||
        (a.author && a.author.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', padding: '24px' }}
      >
        <button className="btn-close-modal" onClick={onClose} aria-label="Close search">
          <X size={20} />
        </button>

        <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '22px', fontWeight: 800, marginBottom: '16px' }}>
          Search The Daily Brief
        </h2>

        {/* Input Box */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f5f5f5', border: '1px solid #ddd', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px' }}>
          <Search size={20} color="#666" />
          <input 
            type="text" 
            placeholder="Search headlines, topics, writers (e.g. Kerala, SC, Brij Bhushan)..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{ width: '100%', border: 'none', background: 'none', outline: 'none', fontSize: '15px', fontFamily: 'var(--font-sans)' }}
          />
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#888', marginBottom: '12px' }}>
            {query.trim() === '' ? 'Trending Topics' : `Search Results (${filtered.length})`}
          </div>

          {filtered.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic', padding: '12px 0' }}>No stories found matching "{query}". Try searching for another topic.</p>
          ) : (
            filtered.map((item) => (
              <div 
                key={item.id} 
                onClick={() => { onArticleClick(item); onClose(); }}
                style={{ padding: '12px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#900000', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {item.category || "NEWS"}
                </div>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', fontWeight: 700, color: '#111', lineHeight: 1.3 }}>
                  {item.title}
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
