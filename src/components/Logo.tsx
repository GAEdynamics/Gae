interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export function Logo({ className = '', variant = 'dark' }: LogoProps) {
  return (
    <img
      src="/GAE_DYNAMICS_LOGO copy copy.png"
      alt="GAE Dynamics"
      className={[
        'h-9 w-auto',
        variant === 'light' ? 'brightness-0 invert' : '',
        className,
      ].join(' ')}
    />
  );
}
