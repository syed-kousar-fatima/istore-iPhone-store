import { useEffect, useState } from 'react';

const illustrations = {
  phones: '<rect x="69" y="24" width="62" height="112" rx="13"/><rect x="75" y="31" width="50" height="91" rx="7"/><circle cx="100" cy="129" r="3"/>',
  laptops: '<rect x="47" y="37" width="106" height="72" rx="7"/><path d="M37 118h126l-10 12H47z"/>',
  tablets: '<rect x="54" y="24" width="92" height="112" rx="11"/><circle cx="100" cy="128" r="2"/>',
  watches: '<path d="M82 34l5-16h26l5 16m-34 90l-2 17h36l-3-17"/><rect x="70" y="37" width="60" height="80" rx="18"/>',
  buds: '<path d="M75 48a15 15 0 0 1 30 0v34H92V52h-8v23H75z"/><path d="M125 48a15 15 0 0 1 30 0v34h-13V52h-8v23h-9z"/>',
  headphones: '<path d="M54 91V75a46 46 0 0 1 92 0v16"/><rect x="48" y="82" width="22" height="42" rx="9"/><rect x="130" y="82" width="22" height="42" rx="9"/>',
  pouches: '<rect x="60" y="43" width="80" height="88" rx="13"/><path d="M78 43V31a22 22 0 0 1 44 0v12"/>',
  audio: '<rect x="66" y="28" width="68" height="108" rx="14"/><circle cx="100" cy="66" r="16"/><circle cx="100" cy="108" r="10"/>',
};

function makeFallback(category) {
  const illustration = illustrations[category] || illustrations.phones;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#29272c"/><stop offset="1" stop-color="#101115"/></linearGradient><radialGradient id="glow"><stop stop-color="#c5a77d" stop-opacity=".2"/><stop offset="1" stop-color="#c5a77d" stop-opacity="0"/></radialGradient></defs><rect width="200" height="160" fill="url(#bg)"/><circle cx="100" cy="80" r="80" fill="url(#glow)"/><g fill="none" stroke="#d1b58d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${illustration}</g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function StoreImage({ src, alt, category, className = '', ...props }) {
  const fallbackSrc = makeFallback(category);
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setImageSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <img
      {...props}
      className={`store-image ${className}`.trim()}
      src={imageSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
