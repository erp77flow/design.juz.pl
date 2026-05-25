export function JuzLogoMark({ className = "size-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="juz-logo-title"
      className={className}
    >
      <title id="juz-logo-title">juz.pl</title>
      <rect width="64" height="64" rx="32" fill="url(#juz-logo-gradient)" />
      <path
        d="M34.9 12.7 17.8 34.4c-1.3 1.6-.1 4 2 4h10l-2.2 12.4c-.4 2.4 2.6 3.8 4.1 1.9l17-21.8c1.3-1.6.1-4-2-4H37l2-12.3c.5-2.4-2.6-3.8-4.1-1.9Z"
        stroke="white"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="juz-logo-gradient" x1="10" y1="7" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3BFF" />
          <stop offset={1} stopColor="#4113B8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function JuzLogo() {
  return (
    <div className="flex items-center gap-3" aria-label="juz.pl">
      <JuzLogoMark className="size-12 shadow-juz" />
      <span className="text-4xl font-extrabold tracking-normal text-foreground">
        juz<span className="text-primary">.pl</span>
      </span>
    </div>
  );
}
