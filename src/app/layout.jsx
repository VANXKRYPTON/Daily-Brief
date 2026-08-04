'use client';

import React, { useState } from 'react';
import './globals.css';
import { Header } from '../components/Header';
import { SearchOverlay } from '../components/SearchOverlay';
import { NewsletterModal } from '../components/NewsletterModal';
import { NavDrawer } from '../components/NavDrawer';
import { Footer } from '../components/Footer';

export default function RootLayout({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>DAILY BRIEF | Independent Tech, Business & Global News</title>
        <meta name="description" content="Daily Brief brings you authoritative intelligence on artificial intelligence, sovereign tech, global markets, and energy transitions." />
      </head>
      <body suppressHydrationWarning>
        <Header 
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNewsletter={() => setIsNewsletterOpen(true)}
          onOpenMenu={() => setIsMenuOpen(!isMenuOpen)}
          onCloseMenu={() => setIsMenuOpen(false)}
          isMenuOpen={isMenuOpen}
        />
        
        {children}

        <Footer />

        {isSearchOpen && (
          <SearchOverlay onClose={() => setIsSearchOpen(false)} />
        )}

        {isNewsletterOpen && (
          <NewsletterModal onClose={() => setIsNewsletterOpen(false)} />
        )}
      </body>
    </html>
  );
}
