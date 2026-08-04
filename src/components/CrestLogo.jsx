import React from 'react';

export const CrestLogo = ({ className = "brand-crest" }) => (
  <svg 
    className={className} 
    viewBox="0 0 160 80" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: '44px', width: 'auto', display: 'inline-block', verticalAlign: 'middle' }}
  >
    <g fill="currentColor">
      {/* Central Shield with Crown */}
      <path d="M 68 22 C 68 14, 92 14, 92 22 L 92 45 C 92 58, 80 67, 80 67 C 80 67, 68 58, 68 45 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M 72 26 L 88 26 L 88 42 L 72 42 Z" fill="#b90014" opacity="0.9" />
      <circle cx="80" cy="34" r="4" fill="#ffffff" />
      {/* Crown / Sunburst top emblem */}
      <path d="M 80 6 L 83 14 L 90 9 L 86 17 L 93 20 L 85 22 L 80 14 L 75 22 L 67 20 L 74 17 L 70 9 L 77 14 Z" fill="currentColor" />
      {/* Left Elephant Heraldic Animal */}
      <path d="M 28 50 C 20 48, 14 40, 16 30 C 18 22, 28 18, 40 24 C 46 27, 52 34, 55 42 C 48 44, 44 47, 36 47 C 34 51, 30 56, 25 56 C 23 52, 25 50, 28 50 Z" />
      <path d="M 30 26 C 24 24, 20 30, 24 36 C 28 40, 32 37, 30 26 Z" fill="currentColor" />
      <path d="M 16 36 C 10 38, 8 46, 12 50 C 16 52, 20 48, 18 42 Z" fill="currentColor" />
      {/* Right Elephant Heraldic Animal */}
      <path d="M 132 50 C 140 48, 146 40, 144 30 C 142 22, 132 18, 120 24 C 114 27, 108 34, 105 42 C 112 44, 116 47, 124 47 C 126 51, 130 56, 135 56 C 137 52, 135 50, 132 50 Z" />
      <path d="M 130 26 C 136 24, 140 30, 136 36 C 132 40, 128 37, 130 26 Z" fill="currentColor" />
      <path d="M 144 36 C 150 38, 152 46, 148 50 C 144 52, 140 48, 142 42 Z" fill="currentColor" />
      {/* Scroll Banner Base */}
      <path d="M 20 60 Q 80 72 140 60 L 134 53 Q 80 63 26 53 Z" fill="currentColor" />
    </g>
  </svg>
);

