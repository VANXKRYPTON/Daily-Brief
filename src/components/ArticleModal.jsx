import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play,
  Volume2, 
  VolumeX, 
  Bookmark, 
  Share2, 
  Clock, 
  Lock,
  UserCheck
} from 'lucide-react';

export const ArticleModal = ({ article, onClose, isLoggedIn, onOpenLogin, onLoginSuccess }) => {
  if (!article) return null;

  const [zoomLevel, setZoomLevel] = useState(1.0); // 0.7 to 1.8 document zoom scale
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [audioProgress, setAudioProgress] = useState(0); // 0 to 100%
  const [elapsedTimeStr, setElapsedTimeStr] = useState('0:00');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const utteranceRef = useRef(null);
  const startTimeRef = useRef(null);
  const progressTimerRef = useRef(null);

  const paragraphs = (article.content || article.excerpt || "Full article text loading...").split('\n\n');
  const isDeepDive = article.category?.toUpperCase()?.includes('DEEP DIVE') || 
                     article.slug?.includes('deep-dive') ||
                     article.isDeepDive;
  const isGated = isDeepDive && !isLoggedIn;

  // Lock background scroll when modal is open & listen for Ctrl + / Ctrl - keyboard shortcuts
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          setZoomLevel(prev => Math.min(1.8, +(prev + 0.15).toFixed(2)));
        } else if (e.key === '-') {
          e.preventDefault();
          setZoomLevel(prev => Math.max(0.7, +(prev - 0.15).toFixed(2)));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  // Get numeric rate from speed string
  const getRate = (speedStr) => {
    switch(speedStr) {
      case '1.25x': return 1.25;
      case '1.5x': return 1.5;
      case '2.0x': return 2.0;
      default: return 1.0;
    }
  };

  // Toggle AI Voiceover Audio Reader
  const toggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert("Text-to-speech audio reader is not supported in this browser.");
      return;
    }

    if (isPlayingAudio) {
      // Stop speech
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    } else {
      window.speechSynthesis.cancel();

      const textToRead = `${article.title}. By ${article.author || 'The Daily Brief Bureau'}. ${paragraphs.slice(0, isGated ? 1 : paragraphs.length).join('. ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utteranceRef.current = utterance;

      const rate = getRate(playbackSpeed);
      utterance.rate = rate;
      utterance.pitch = 1.0;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))) || voices.find(v => v.lang.startsWith('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      const totalChars = textToRead.length;

      utterance.onboundary = (event) => {
        if (event.charIndex !== undefined && totalChars > 0) {
          const progress = Math.min(100, Math.round((event.charIndex / totalChars) * 100));
          setAudioProgress(progress);
        }
      };

      utterance.onend = () => {
        setIsPlayingAudio(false);
        setAudioProgress(100);
        setElapsedTimeStr('5:00');
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);

      // Start time tracking
      startTimeRef.current = Date.now();
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      
      let secondsPlayed = 0;
      progressTimerRef.current = setInterval(() => {
        secondsPlayed += 1;
        const mins = Math.floor(secondsPlayed / 60);
        const secs = (secondsPlayed % 60).toString().padStart(2, '0');
        setElapsedTimeStr(`${mins}:${secs}`);

        // Estimate progress over 5 minutes if boundary events aren't supported by browser
        const estProgress = Math.min(99, Math.round((secondsPlayed / 300) * 100));
        setAudioProgress(prev => Math.max(prev, estProgress));
      }, 1000);
    }
  };

  // Change Playback Speed dynamically
  const handleSpeedChange = () => {
    const speeds = ['1.0x', '1.25x', '1.5x', '2.0x'];
    const currentIdx = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIdx + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);

    if (isPlayingAudio && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setTimeout(() => {
        toggleAudio();
      }, 100);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            {/* Functional Text Resizer Pill (A- / A+ / Keyboard Ctrl+ / Ctrl-) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-secondary, #f5f5f5)', borderRadius: '6px', padding: '4px 12px' }}>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(0.7, +(prev - 0.15).toFixed(2)))} 
                style={{ fontWeight: 800, fontSize: '14px', padding: '2px 6px', color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}
                title="Decrease Text & Document Size (Ctrl - or A-)"
              >
                A-
              </button>
              <span style={{ color: 'var(--border-color, #ccc)', fontSize: '12px' }}>|</span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(1.8, +(prev + 0.15).toFixed(2)))} 
                style={{ fontWeight: 800, fontSize: '14px', padding: '2px 6px', color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}
                title="Increase Text & Document Size (Ctrl + or A+)"
              >
                A+
              </button>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px', fontFamily: 'var(--font-mono)' }}>
                {Math.round(zoomLevel * 100)}%
              </span>
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

        {/* Article Headline with Dynamic Zoom Scaling */}
        <h1 style={{ 
          fontFamily: "var(--font-headline, Georgia, serif)", 
          fontSize: `${Math.round(36 * zoomLevel)}px`, 
          lineHeight: 1.22, 
          fontWeight: 800, 
          color: 'var(--text-primary)', 
          marginBottom: '16px',
          transition: 'font-size 0.2s ease'
        }}>
          {article.title}
        </h1>

        {/* Metadata Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: `${Math.round(14 * zoomLevel)}px`, color: 'var(--text-muted)', marginBottom: '20px', fontFamily: 'var(--font-sans)', transition: 'font-size 0.2s ease' }}>
          <span style={{ fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', textDecoration: 'underline' }}>
            {article.author || "THE DAILY BRIEF BUREAU"}
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            {article.time || "Just now"}
          </span>
        </div>

        {/* Real Functional AI Voiceover News Player Card */}
        <div style={{
          background: 'linear-gradient(135deg, var(--bg-dark-accent, #0f172a) 0%, #1e293b 100%)',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '16px 22px',
          marginBottom: '28px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '18px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 300px' }}>
            {/* Play / Pause Voiceover Audio Button */}
            <button 
              onClick={toggleAudio} 
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: isPlayingAudio ? 'var(--accent-crimson, #dc2626)' : 'var(--accent-emerald, #059669)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                boxShadow: isPlayingAudio ? '0 0 18px rgba(220, 38, 38, 0.6)' : '0 0 18px rgba(5, 150, 105, 0.6)',
                flexShrink: 0,
                transition: 'transform 0.15s ease'
              }}
              title={isPlayingAudio ? "Stop AI Voiceover" : "Play AI Voiceover News"}
            >
              {isPlayingAudio ? <VolumeX size={22} /> : <Play size={22} style={{ marginLeft: '2px' }} />}
            </button>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: isPlayingAudio ? '#f87171' : 'var(--accent-emerald, #34d399)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{isPlayingAudio ? "🎙️ READING NEWS ALOUD..." : "DAILY BRIEF AI VOICEOVER • LISTEN TO ARTICLE"}</span>
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '420px' }}>
                {article.title}
              </div>
            </div>
          </div>

          {/* Audio Progress Slider Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 240px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              {elapsedTimeStr}
            </span>
            <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.18)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
              <div style={{
                width: `${audioProgress}%`,
                height: '100%',
                background: isPlayingAudio ? 'linear-gradient(90deg, #dc2626 0%, #059669 100%)' : '#059669',
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>5:00</span>
          </div>

          {/* Playback Speed selector */}
          <button 
            onClick={handleSpeedChange}
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#cbd5e1',
              background: 'rgba(255,255,255,0.1)',
              padding: '5px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            title="Change AI Voiceover Speed"
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
              <p style={{ fontSize: `${Math.round(13 * zoomLevel)}px`, color: 'var(--text-muted)', marginTop: '10px', fontStyle: 'italic', transition: 'font-size 0.2s ease' }}>
                {article.imageCaption}
              </p>
            )}
          </div>
        )}

        {/* Content Paragraphs with Dynamic Font & Document Zoom Scaling */}
        <div style={{ fontFamily: "var(--font-body, Georgia, serif)", fontSize: `${Math.round(18 * zoomLevel)}px`, lineHeight: 1.7, color: 'var(--text-primary)', transition: 'font-size 0.2s ease' }}>
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
