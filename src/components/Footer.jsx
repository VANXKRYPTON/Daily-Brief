import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{ background: 'var(--bg-dark-accent)', color: '#f8fafc', padding: '60px 24px 30px', marginTop: '80px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ maxW: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', fontWeight: 900, marginBottom: '12px' }}>
            DAILY BRIEF
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '360px', lineHeight: 1.6 }}>
            Independent digital news & global intelligence. Delivering high-impact reporting across tech, markets, geopolitics, and deep-tech innovation.
          </p>
        </div>

        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.8px' }}>Sections</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#cbd5e1' }}>
            <li><Link href="/">Top Stories</Link></li>
            <li><Link href="/">Tech & AI</Link></li>
            <li><Link href="/">Global Affairs</Link></li>
            <li><Link href="/">Markets & Economy</Link></li>
            <li><Link href="/">Science & Climate</Link></li>
          </ul>
        </div>

        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.8px' }}>Opinion & Deep Dives</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#cbd5e1' }}>
            <li><Link href="/">Editorial Columns</Link></li>
            <li><Link href="/">Special Investigations</Link></li>
            <li><Link href="/">Audio Briefings</Link></li>
            <li><Link href="/edition">Digital Edition</Link></li>
          </ul>
        </div>

        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.8px' }}>Company</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#cbd5e1' }}>
            <li><Link href="/">About Daily Brief</Link></li>
            <li><Link href="/">Journalism Ethics</Link></li>
            <li><Link href="/">Careers</Link></li>
            <li><Link href="/">Press Room</Link></li>
          </ul>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--container-max)', margin: '24px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
        <span>© 2026 Daily Brief Media Network. All rights reserved.</span>
        <span>Built with Next.js App Router</span>
      </div>
    </footer>
  );
}
