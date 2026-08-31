import type { ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: RevealProps) {
  const { ref, shown } = useReveal();
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        'transition-all duration-700 ease-out-expo',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  );
}
