import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import './style.css';

const placeholder = (
  <div
    style={{ backgroundColor: '#f2f2f2', height: 300, width: '100%', borderRadius: 4 }}
  />
);

function MediaCard({ item }) {
  const { images, title, url } = item;
  const { downsized_medium } = images;
  const src = downsized_medium.url

  return (
    <a className="MediaCard row" href={url} target="_blank" rel="noopener noreferrer">
      <div className="col-12 col-md-4">
        <ProgressiveImage src={src} placeholder="">
          {(src, loading) => {
            return loading ? placeholder : <img className="img-fluid w-100" src={src} alt="thumbnail" />;
          }}
        </ProgressiveImage>
      </div>
      <div className="col-12 col-md-8">
        <h3>{title}</h3>
      </div>
    </a>
  )
}

export default MediaCard;
