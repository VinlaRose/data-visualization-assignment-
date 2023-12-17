

import React, { useState } from 'react';
import './URLSharing.css'; 

const ShareButton = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000); 
  };

  return (
    <div className="share-container">
      <div className="input-container">
        <input className='url-input' type="text" value={url} readOnly />
        {isCopied ?  <span className={`copy-success `}>Copied!</span> : " " }
       
      </div>
      <button className='url-button' onClick={copyToClipboard}>Copy Link</button>
    </div>
  );
};

export default ShareButton;
