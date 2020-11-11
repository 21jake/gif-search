import React from 'react';
import './style.css';

function Loading({ loading }) {
  return (
    <div className="row d-flex justify-content-center">
      {loading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
    </div>
  )
}

export default Loading;