import { useState } from "react";

/**
 * Image with a graceful fallback chain.
 *
 * `src`         -> primary URL (stable, unhashed path under /images).
 * `fallbackSrc` -> optional legacy path (served by Flask from /static/images).
 *
 * If the primary URL 404s (for example while a CDN is mid-deploy) the
 * component swaps to the fallback instead of showing a broken image.
 */
export default function SmartImage({
  src,
  fallbackSrc,
  alt,
  className = "",
  ...rest
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    setFailed(true);
  };

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-slate-200 dark:bg-slate-800 ${className}`}
      />
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...rest}
    />
  );
}
