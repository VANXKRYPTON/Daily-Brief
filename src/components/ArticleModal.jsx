import React, { useState, useEffect } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Share2, 
  Type, 
  Clock, 
  Lock,
  UserCheck
} from 'lucide-react';

export const ArticleModal = ({ article, onClose, isLoggedIn, onOpenLogin, onLoginSuccess }) => {
  if (!article) return null;

  const [fontSize, setFontSize] = useState(18);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const isDeepDive = article.category?.toUpperCase()?.includes('DEEP DIVE') || 
                     article.slug?.includes('deep-dive') ||
                     article.isDeepDive;

  const isGated = isDeepDive && !isLoggedIn;

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const paragraphs = (article.content || article.excerpt || "Full article text loading...").split('\n\n');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ width: '92%', maxWidth: '980px', maxHeight: '88vh', overflowY: 'auto', padding: '36px 44px' }}
      >
        <button className="btn-close-modal" onClick={onClose} aria-label="Close article">
          <X size={20} />
        </button>

        {/* Reader Utility Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color, #eee)', paddingBottom: '16px', marginBottom: '24px' }}>
          <div className="category-badge" style={{ margin: 0, fontSize: '13px', fontWeight: 800 }}>
            {article.category || "NEWS"} {isDeepDive && "💎 PREMIUM"}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Audio Reader */}
            <button 
              onClick={toggleAudio} 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: isPlayingAudio ? '#dc2626' : 'var(--text-secondary)' }}
            >
              {isPlayingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingAudio ? "Pause Audio" : "Listen (2 min)"}</span>
            </button>

            {/* Font Resizer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-secondary, #f5f5f5)', borderRadius: '6px', padding: '3px 10px' }}>
              <Type size={14} />
              <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} style={{ fontWeight: 700, padding: '2px 6px' }}>A-</button>
              <button onClick={() => setFontSize(Math.min(26, fontSize + 2))} style={{ fontWeight: 700, padding: '2px 6px' }}>A+</button>
            </div>

            {/* Bookmark */}
            <button onClick={() => setIsBookmarked(!isBookmarked)} style={{ color: isBookmarked ? '#dc2626' : 'var(--text-secondary)' }}>
              <Bookmark size={18} fill={isBookmarked ? '#dc2626' : 'none'} />
            </button>

            {/* Share */}
            <button onClick={handleShare} style={{ color: 'var(--text-secondary)' }}>
              <Share2 size={18} />
            </button>
            {copied && <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 700 }}>Link Copied!</span>}
          </div>
        </div>

        {/* Article Headline */}
        <h1 style={{ fontFamily: "var(--font-headline, Georgia, serif)", fontSize: '36px', lineHeight: 1.22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
          {article.title}
        </h1>

        {/* Metadata Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', fontFamily: 'var(--font-sans)' }}>
          <span style={{ fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', textDecoration: 'underline' }}>
            {article.author || "THE DAILY BRIEF BUREAU"}
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            {article.time || "Just now"}
          </span>
        </div>

        {/* Featured Image if available */}
        {article.imageUrl && (
          <div style={{ marginBottom: '28px' }}>
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              style={{ width: '100%', borderRadius: '8px', maxHeight: '480px', objectFit: 'cover' }} 
            />
            {article.imageCaption && (
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '10px', fontStyle: 'italic' }}>
                {article.imageCaption}
              </p>
            )}
          </div>
        )}

        {/* Content Paragraphs with Paywall Gating */}
        <div style={{ fontFamily: "var(--font-body, Georgia, serif)", fontSize: `${fontSize}px`, lineHeight: 1.7, color: 'var(--text-primary)' }}>
          {paragraphs.slice(0, isGated ? 1 : paragraphs.length).map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '24px' }}>
              {paragraph}
            </p>
          ))}

          {/* Gated Paywall Banner for Deep Dives */}
          {isGated && (
            <div style={{ position: 'relative', marginTop: '24px', minHeight: '260px' }}>
              {/* Blurred teaser snippet */}
              <div style={{ filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none', opacity: 0.5 }}>
                <p style={{ marginBottom: '16px' }}>
                  Our quantitative models show a 78% shift in capital allocation towards private AI infrastructure networks. Across sovereign wealth funds in Dresden, Tokyo, and Abu Dhabi, government mandates are rewriting national industrial policies...
                </p>
                <p style={{ marginBottom: '16px' }}>
                  The 50-page breakdown includes full data tables, regulatory risk maps, and executive forecasts through 2030...
                </p>
              </div>

              {/* Paywall Overlay Card */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, #ffffff 85%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '30px 20px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}>
                <div style={{ background: '#fef2f2', border: '1px solid rgba(220,38,38,0.2)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <Lock size={26} color="#dc2626" />
                </div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>
                  Deep Dives 💎 Member Exclusive
                </h3>
                <p style={{ fontSize: '14px', color: '#555', maxWidth: '460px', marginBottom: '18px', lineHeight: 1.45 }}>
                  This investigative report and raw dataset are restricted to registered Daily Brief members. Please log in or sign up to continue reading.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    onClick={onOpenLogin}
                    style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '12px 24px', fontWeight: 800, fontSize: '14px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Lock size={16} />
                    <span>Log In to Unlock Story</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onLoginSuccess) {
                        onLoginSuccess({ email: 'demo@dailybrief.com', name: 'Member Subscriber', isPremium: true });
                      }
                    }}
                    style={{ background: '#111', color: '#fff', border: 'none', padding: '12px 20px', fontWeight: 700, fontSize: '13px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <UserCheck size={16} />
                    <span>1-Click Free Member Access</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
