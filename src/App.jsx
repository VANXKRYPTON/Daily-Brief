import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroStory } from './components/HeroStory';
import { MiddleFeed } from './components/MiddleFeed';
import { RightSidebar } from './components/RightSidebar';
import { ArticleModal } from './components/ArticleModal';
import { EPaperModal } from './components/EPaperModal';
import { SearchModal } from './components/SearchModal';
import { SubscribeModal } from './components/SubscribeModal';
import { LoginModal } from './components/LoginModal';
import { NavDrawer } from './components/NavDrawer';
import { HERO_STORY, MIDDLE_FEED_STORIES } from './data/newsData';

export function App() {
  const [activeCategory, setActiveCategory] = useState("India");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEPaperOpen, setIsEPaperOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Login / Subscription user state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Category change handler
  const handleSelectCategory = (cat) => {
    const isDeepDive = cat === 'deep-dives' || cat.toLowerCase().includes('deep dive') || cat.toLowerCase().includes('sovereign ai');
    if (isDeepDive && !isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }
    setActiveCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsLoginOpen(false);
    setActiveCategory("deep-dives");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // Filter middle stories based on active category
  const filteredMiddleFeed = activeCategory.toLowerCase() === "india"
    ? MIDDLE_FEED_STORIES
    : MIDDLE_FEED_STORIES.map(s => ({
        ...s,
        category: activeCategory.toUpperCase(),
        title: s.title.includes(activeCategory) ? s.title : `[${activeCategory}] ${s.title}`
      }));

  return (
    <div className="app-main">
      {/* Header with Masthead & Category Navigation */}
      <Header 
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEPaper={() => setIsEPaperOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenMenu={() => setIsMenuOpen(!isMenuOpen)}
        onCloseMenu={() => setIsMenuOpen(false)}
        isMenuOpen={isMenuOpen}
        onOpenLogin={() => setIsLoginOpen(true)}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Front Page 3-Column Layout */}
      <main className="frontpage-layout">
        {/* Column 1: Hero Main Lead Article */}
        <HeroStory 
          story={{ ...HERO_STORY, category: activeCategory.toUpperCase() }} 
          onArticleClick={(article) => setSelectedArticle(article)} 
        />

        {/* Column 2: Middle Stories & Live Feed */}
        <MiddleFeed 
          stories={filteredMiddleFeed} 
          onArticleClick={(article) => setSelectedArticle(article)} 
        />

        {/* Column 3: Right Sidebar with Editorials & Timeline */}
        <RightSidebar 
          onArticleClick={(article) => setSelectedArticle(article)} 
        />
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '2px solid #111', background: '#fafafa', padding: '30px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontFamily: 'var(--font-serif-title)', fontSize: '24px', fontWeight: 900, color: '#111' }}>
            THE DAILY BRIEF
          </div>
          <p style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>
            Copyright © 2026 Daily Brief Media Limited. All rights reserved. Replica frontend built for prompt specifications.
          </p>
        </div>
      </footer>

      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
          isLoggedIn={isLoggedIn}
          onOpenLogin={() => {
            setSelectedArticle(null);
            setIsLoginOpen(true);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {isLoginOpen && (
        <LoginModal 
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onOpenSubscribe={() => {
            setIsLoginOpen(false);
            setIsSubscribeOpen(true);
          }}
        />
      )}

      {isEPaperOpen && (
        <EPaperModal 
          onClose={() => setIsEPaperOpen(false)} 
          isLoggedIn={isLoggedIn}
          onOpenLogin={() => {
            setIsEPaperOpen(false);
            setIsLoginOpen(true);
          }}
        />
      )}

      {isSearchOpen && (
        <SearchModal 
          onClose={() => setIsSearchOpen(false)} 
          onArticleClick={(article) => setSelectedArticle(article)}
        />
      )}

      {isSubscribeOpen && (
        <SubscribeModal 
          onClose={() => setIsSubscribeOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;
