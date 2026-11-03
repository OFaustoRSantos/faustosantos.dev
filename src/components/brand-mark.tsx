export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg className={`brand-mark ${className}`} viewBox="0 0 84 96" width="44" height="50" fill="none" aria-hidden="true">
      <path d="M12 22H58V40H32V47H50V64H32V88H12V22Z" fill="#b84e32" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m12 22 12-10v66L12 88V22Z" fill="#da7956" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m44 30-12 10h26l12-10H44Zm0 24L32 64h18l12-10H44Z" fill="#dfb69b" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 12h46v18H44v7h18v17H44v24H24V12Z" fill="#faf7ef" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M25 37h18M25 54h18M48 13v16M13 38l10-8M13 55l10-8M13 72l10-8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
