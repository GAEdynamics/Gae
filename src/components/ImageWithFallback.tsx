import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={['relative overflow-hidden bg-ink-100', className].join(' ')}>
      <div
        className={[
          'absolute inset-0 bg-gradient-to-br from-ink-100 via-ink-200 to-ink-100 transition-opacity duration-700',
          loaded ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          backgroundSize: '200% 100%',
          animation: loaded ? undefined : 'shimmer 1.8s linear infinite',
        }}
      />
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        className={[
          'h-full w-full object-cover transition-all duration-700 ease-out-expo',
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-md',
          imgClassName,
        ].join(' ')}
      />
    </div>
  );
}
