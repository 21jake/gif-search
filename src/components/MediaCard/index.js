import React from 'react';

import './style.css';

function MediaCard({ item }) {
  const { images, title, url } = item;
  const { downsized_medium } = images;

  return (
    <a className="MediaCard row" href={url} target="_blank" rel="noopener noreferrer">
      <div className="col-12 col-md-4">
        <img className="img-fluid w-100" src={downsized_medium.url} alt="thumbnail" />
      </div>
      <div className="col-12 col-md-8">
        <h3>{title}</h3>
      </div>
    </a>
  )
}

export default MediaCard;
