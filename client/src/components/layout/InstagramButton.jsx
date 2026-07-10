export function InstagramButton() {
  return (
    <a
      href="https://www.instagram.com/nfinity_partner/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit our Instagram"
      title="Follow us on Instagram"
      style={{ animation: 'cardFloatSubtle 3.5s ease-in-out infinite', animationDelay: '0.4s', bottom: 'calc(5.875rem + env(safe-area-inset-bottom, 0px))' }}
      className="fixed right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-glow-lg transition-all duration-300 hover:scale-[1.08] hover:shadow-[0_0_32px_rgba(188,24,136,0.5)]"
    >
      {/* Instagram gradient background */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
        }}
      />

      {/* Instagram camera icon (Feather/Lucide pattern) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 h-[26px] w-[26px]"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    </a>
  );
}
