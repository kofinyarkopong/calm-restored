type P = { className?: string };
export const ArrowRight = ({ className = "h-4 w-4" }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`btn-arrow ${className}`}>
    <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const PhoneIcon = ({ className = "h-4 w-4" }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
  </svg>
);
export const MailIcon = ({ className = "h-4 w-4" }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m4 7 8 6 8-6" strokeLinejoin="round" />
  </svg>
);
export const PinIcon = ({ className = "h-4 w-4" }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const Ornament = ({ className = "h-6 w-24" }: P) => (
  <svg aria-hidden viewBox="0 0 120 24" fill="none" className={className}>
    <path d="M0 12h46M74 12h46" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="60" cy="12" r="7" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="60" cy="12" r="9.5" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);
