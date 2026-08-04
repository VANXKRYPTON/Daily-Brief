'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Volume2, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  Bookmark, 
  Share2, 
  Compass, 
  Flame,
  Lock
} from 'lucide-react';
import { 
  HERO_FEATURED, 
  HERO_SECONDARY, 
  MAIN_ARTICLES, 
  MOST_READ, 
  DEEP_DIVES 
} from '../data/newsData';
import { ArticleModal } from '../components/ArticleModal';
import { LoginModal } from '../components/LoginModal';

export default function HomePage() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleDeepDiveClick = (dive) => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    } else {
      setSelectedArticle(dive);
    }
  };

  return (
    <main>
      {/* Hero 4-Grid Section */}
      <section className="hero-section">
        {/* Main Lead Story */}
        <article className="hero-main-card">
          <div className="hero-img-box">
            <img 
              src={HERO_FEATURED.imageUrl} 
              alt={HERO_FEATURED.title} 
            />
            {HERO_FEATURED.hasAudio && (
              <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(4px)', color: '#34d399', fontSize: '11px', fontWeight: 800, padding: '6px 12px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Volume2 size={14} />
                <span>LISTEN • 5 MIN</span>
              </div>
            )}
          </div>

          <div className="hero-content">
            <div className="category-tag">
              <Sparkles size={13} />
              <span>{HERO_FEATURED.category}</span>
            </div>

            <div onClick={() => setSelectedArticle(HERO_FEATURED)} style={{ cursor: 'pointer' }}>
              <h1 className="hero-headline">{HERO_FEATURED.title}</h1>
            </div>

            <p className="hero-subtitle">{HERO_FEATURED.subtitle}</p>

            <div className="author-meta">
              <img 
                src={HERO_FEATURED.authorAvatar} 
                alt={HERO_FEATURED.author} 
                className="author-avatar" 
              />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{HERO_FEATURED.author}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{HERO_FEATURED.authorTitle} • {HERO_FEATURED.readTime}</div>
              </div>
            </div>
          </div>
        </article>

        {/* Secondary Stack (3 Cards) */}
        <div className="hero-secondary-stack">
          {HERO_SECONDARY.map((story) => (
            <article key={story.id} className="secondary-card" onClick={() => setSelectedArticle(story)} style={{ cursor: 'pointer' }}>
              <div className="secondary-content">
                <div className="category-tag" style={{ fontSize: '10px' }}>
                  {story.category}
                </div>
                <h3 className="secondary-title">{story.title}</h3>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <span>{story.author}</span>
                  <span>•</span>
                  <Clock size={12} />
                  <span>{story.readTime}</span>
                </div>
              </div>

              <img 
                src={story.imageUrl} 
                alt={story.title} 
                className="secondary-img" 
              />
            </article>
          ))}
        </div>
      </section>

      {/* Main Feed & Sidebar Grid */}
      <section className="main-feed-layout">
        {/* Left Column Feed */}
        <div className="feed-grid">
          <div className="section-title">
            <span>Latest Intelligence</span>
            <Compass size={20} color="var(--accent-emerald)" />
          </div>

          {MAIN_ARTICLES.map((article) => (
            <article key={article.id} className="article-card-horizontal" onClick={() => setSelectedArticle(article)} style={{ cursor: 'pointer' }}>
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="card-h-img" 
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="category-tag" style={{ fontSize: '10px' }}>
                  {article.category}
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '8px' }}>
                  {article.title}
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                  {article.excerpt}
                </p>
                <div style={{ marginTop: 'auto', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{article.author}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Right Sidebar: Trending Top 5 */}
        <aside className="sidebar-trending">
          <div className="section-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={20} color="var(--accent-crimson)" />
              Most Read Today
            </span>
          </div>

          <div>
            {MOST_READ.map((item) => (
              <div key={item.id} className="trending-item" onClick={() => setSelectedArticle(item)} style={{ cursor: 'pointer' }}>
                <span className="rank-number">0{item.rank}</span>
                <div>
                  <div className="category-tag" style={{ fontSize: '9px', marginBottom: '2px' }}>
                    {item.category}
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                    {item.title}
                  </h4>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {item.readTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* Special Deep Dives Dark Feature Section */}
      <section className="deep-dives-banner">
        <div className="deep-dives-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="category-tag" style={{ color: 'var(--accent-emerald)' }}>
                <span>SPECIAL INVESTIGATIONS</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 900, color: '#ffffff' }}>
                Deep Dives 💎
              </h2>
            </div>
            <button 
              onClick={() => {
                if (!isLoggedIn) setIsLoginOpen(true);
              }}
              style={{ background: 'none', border: 'none', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            >
              Explore All Investigations {!isLoggedIn && <Lock size={14} />} <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="deep-dives-grid">
            {DEEP_DIVES.map((dive) => (
              <article 
                key={dive.id} 
                className="deep-card"
                onClick={() => handleDeepDiveClick(dive)}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <img 
                  src={dive.imageUrl} 
                  alt={dive.title} 
                  className="deep-card-img" 
                />
                {!isLoggedIn && (
                  <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(220, 38, 38, 0.9)', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 10 }}>
                    <Lock size={12} />
                    <span>MEMBER ONLY</span>
                  </div>
                )}
                <div className="deep-card-content">
                  <div className="category-tag" style={{ fontSize: '10px' }}>
                    {dive.category} • {dive.readTime}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                    {dive.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '14px' }}>
                    {dive.subtitle}
                  </p>
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
                    By {dive.author}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
          isLoggedIn={isLoggedIn}
          onOpenLogin={() => {
            setSelectedArticle(null);
            setIsLoginOpen(true);
          }}
          onLoginSuccess={(u) => {
            setIsLoggedIn(true);
          }}
        />
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginModal 
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={(u) => {
            setIsLoggedIn(true);
            setIsLoginOpen(false);
          }}
        />
      )}
    </main>
  );
}
