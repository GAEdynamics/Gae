import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  action,
}: SectionHeadingProps) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div className={['flex flex-col gap-4', alignCls].join(' ')}>
      {eyebrow && (
        <Reveal>
          <span
            className={[
              'eyebrow',
              dark ? 'text-ink-400' : 'text-ink-500',
            ].join(' ')}
          >
            <span className="inline-block h-px w-6 bg-ember-500" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          className={[
            'h-section max-w-3xl',
            dark ? 'text-white' : 'text-ink-900',
          ].join(' ')}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={160}>
          <p
            className={[
              'lead max-w-2xl',
              dark ? 'text-ink-400' : 'text-ink-500',
            ].join(' ')}
          >
            {description}
          </p>
        </Reveal>
      )}
      {action && (
        <Reveal delay={220}>
          <div className={align === 'center' ? 'mt-2' : 'mt-2'}>{action}</div>
        </Reveal>
      )}
    </div>
  );
}
