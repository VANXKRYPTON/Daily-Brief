import React from 'react';

export const HeroStory = ({ story, onArticleClick }) => {
  if (!story) return null;

  return (
    <article className="hero-column col-divider">
      <div className="hero-image-wrapper" onClick={() => onArticleClick(story)}>
        <img 
          src={story.imageUrl} 
          alt={story.title} 
          className="hero-image" 
          loading="eager" 
        />
      </div>

      <div className="category-badge">{story.category}</div>

      <h1 className="hero-title" onClick={() => onArticleClick(story)}>
        {story.title}
      </h1>

      <p className="hero-excerpt">
        {story.excerpt}
      </p>

      <div className="author-attribution">
        {story.author}
      </div>
    </article>
  );
};
