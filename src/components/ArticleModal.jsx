import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play,
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
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
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
            {/* Audio Toggle Shortcut */}
            <button 
              onClick={toggleAudio} 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: isPlayingAudio ? '#dc2626' : 'var(--text-secondary)' }}
            >
              {isPlayingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingAudio ? "Pause Audio" : "Listen (5 min)"}</span>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', fontFamily: 'var(--font-sans)' }}>
          <span style={{ fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', textDecoration: 'underline' }}>
            {article.author || "THE DAILY BRIEF BUREAU"}
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            {article.time || "Just now"}
          </span>
        </div>

        {/* Prominent Embedded Audio News Player Banner inside Article Modal */}
        <div style={{
          background: 'linear-gradient(135deg, var(--bg-dark-accent, #0f172a) 0%, #1e293b 100%)',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '16px 22px',
          marginBottom: '28px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          gap: '18px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 300px' }}>
            <button 
              onClick={toggleAudio} 
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: isPlayingAudio ? 'var(--accent-crimson, #dc2626)' : 'var(--accent-emerald, #059669)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                border: 'none',
                cursor: 'pointer',
                boxShadow: isPlayingAudio ? '0 0 16px rgba(220, 38, 38, 0.5)' : '0 0 16px rgba(5, 150, 105, 0.5)',
                flexShrink: 0,
                transition: 'transform 0.15s ease'
              }}
              title={isPlayingAudio ? "Pause Audio News Digest" : "Play Audio News Digest"}
            >
              {isPlayingAudio ? <VolumeX size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
            </button>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-emerald, #34d399)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>
                DAILY BRIEF AUDIO DIGEST • LISTEN TO ARTICLE (5 MIN READ)
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '420px' }}>
                {article.title}
              </div>
            </div>
          </div>

          {/* Audio Progress Slider Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 240px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              {isPlayingAudio ? '1:14' : '0:00'}
            </span>
            <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,0.18)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
              <div style={{
                width: isPlayingAudio ? '35%' : '0%',
                height: '100%',
                background: isPlayingAudio ? 'linear-gradient(90deg, #059669 0%, #34d399 100%)' : '#34d399',
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>5:00</span>
          </div>

          {/* Playback Speed selector */}
          <button 
            onClick={() => {
              const speeds = ['1.0x', '1.25x', '1.5x', '2.0x'];
              const currentIdx = speeds.indexOf(playbackSpeed);
              setPlaybackSpeed(speeds[(currentIdx + 1) % speeds.length]);
            }}
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#cbd5e1',
              background: 'rgba(255,255,255,0.1)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer'
            }}
            title="Change Playback Speed"
          >
            {playbackSpeed}
          </button>
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
