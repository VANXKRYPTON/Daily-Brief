import React from 'react';

export const MiddleFeed = ({ stories, onArticleClick }) => {
  return (
    <section className="middle-column col-divider">
      {stories.map((story) => (
        <article key={story.id} className="feed-card">
          <div className="category-badge">
            {story.isLive ? (
              <span className="live-indicator">
                <span className="pulse-dot"></span>
                LIVE
              </span>
            ) : (
              <span>{story.category}</span>
            )}
          </div>

          <div className="card-title-row">
            <h2 
              className="feed-title" 
              onClick={() => onArticleClick(story)}
            >
              {story.title}
            </h2>

            {story.authorAvatar && (
              <img 
                src={story.authorAvatar} 
                alt={story.author} 
                className="author-avatar" 
              />
            )}
          </div>

          <div className="author-attribution">
            {story.author}
          </div>
        </article>
      ))}
    </section>
  );
};
