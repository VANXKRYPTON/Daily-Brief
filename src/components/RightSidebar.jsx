import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Edit3 } from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { EDITORIALS, RIGHT_LEAD_STORY, LATEST_NEWS } from '../data/newsData';

export const RightSidebar = ({ onArticleClick }) => {
  const [activeLeadIndex, setActiveLeadIndex] = useState(0);

  return (
    <aside className="right-column">
      {/* Editorial Block with Crest */}
      <div className="editorial-widget">
        <CrestLogo className="editorial-crest-img" />
        {EDITORIALS.map((ed) => (
          <div key={ed.id} className="editorial-item">
            <h3 
              className="editorial-title" 
              onClick={() => onArticleClick({ ...ed, category: "EDITORIAL", author: "THE EDITORIAL BOARD", content: ed.snippet })}
            >
              {ed.title}
            </h3>
          </div>
        ))}

        <button className="btn-editorial-lang">
          <span>READ OUR EDITORIALS IN</span>
          <span style={{ fontWeight: 800, textDecoration: 'underline' }}>हिंदी</span>
        </button>
      </div>

      {/* LEAD Story Box with Thumbnail & Navigation Arrows */}
      <div className="lead-widget">
        <div className="lead-header">
          <div className="category-badge" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>LEAD</span>
            <Edit3 size={14} color="#900000" />
          </div>

          <div className="nav-arrows">
            <button className="btn-circle-arrow" aria-label="Previous Lead">
              <ChevronLeft size={14} />
            </button>
            <button className="btn-circle-arrow" aria-label="Next Lead">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="lead-content-row">
          <div className="lead-text-box">
            <h3 
              className="lead-title" 
              onClick={() => onArticleClick(RIGHT_LEAD_STORY)}
            >
              {RIGHT_LEAD_STORY.title}
            </h3>
            <div className="author-attribution">
              {RIGHT_LEAD_STORY.author}
            </div>
          </div>

          <img 
            src={RIGHT_LEAD_STORY.thumbnailUrl} 
            alt="Lead Story" 
            className="lead-thumbnail"
            onClick={() => onArticleClick(RIGHT_LEAD_STORY)} 
          />
        </div>
      </div>

      {/* Latest News Real-Time Timeline */}
      <div className="latest-news-widget">
        <div className="latest-news-header" onClick={() => onArticleClick(LATEST_NEWS[0])}>
          <span>Latest News</span>
          <ArrowRight size={18} />
        </div>

        {LATEST_NEWS.map((item) => (
          <div key={item.id} className="latest-item">
            <div className="latest-time">{item.timeAgo}</div>
            <h4 
              className="latest-item-title" 
              onClick={() => onArticleClick({ ...item, author: "NEWS WIRE", content: item.title + " - Detailed updates coming in shortly." })}
            >
              {item.title}
            </h4>
          </div>
        ))}
      </div>
    </aside>
  );
};
