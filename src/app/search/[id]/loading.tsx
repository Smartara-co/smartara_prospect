export default function SearchLoading() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center grid-theme"
      style={{ background: 'rgba(13, 21, 38, 0.97)' }}
    >
      {/* Scan lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent animate-scanLine"
          style={{ top: '30%' }}
        />
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/15 to-transparent animate-scanLine"
          style={{ top: '60%', animationDelay: '1.5s' }}
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-10 px-8 max-w-sm w-full">
        {/* S-mark with pulse ring */}
        <div className="relative flex items-center justify-center">
          <div className="animate-float">
            <svg width="72" height="72" viewBox="0 0 80 80" fill="none">
              <rect width="80" height="80" rx="20" fill="#182036" />
              <path
                d="M22 30C22 25.6 25.6 22 30 22H50C54.4 22 58 25.6 58 30C58 34.4 54.4 38 50 38H30C25.6 38 22 41.6 22 46C22 50.4 25.6 54 30 54H50C54.4 54 58 50.4 58 46"
                stroke="white"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <circle cx="22" cy="30" r="5" fill="#FF5C2E">
                <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="58" cy="46" r="5" fill="#00C9A7">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <div className="absolute inset-0 -m-4 rounded-3xl border border-orange/20 animate-pulseRing" />
        </div>

        {/* Labels */}
        <div className="text-center space-y-2">
          <p className="text-cream font-display font-bold text-xl">
            Preparing your results…
          </p>
          <p className="text-cream/40 text-sm font-sans">
            Almost there — your prospect list is loading.
          </p>
        </div>

        {/* Indeterminate progress bar */}
        <div className="w-full space-y-3">
          <div className="relative h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-orange to-teal rounded-full animate-indeterminate" />
          </div>
        </div>
      </div>
    </div>
  )
}
