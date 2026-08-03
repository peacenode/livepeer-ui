export function FoundationVennAnimation() {
  return (
    <div
      className="relative w-full"
      style={{ paddingBottom: "63.2911%" }}
      aria-hidden="true"
    >
      <FoundationOrbit className="left-0" gradientId="foundation-comet-left" />
      <FoundationOrbit
        className="right-0 rotate-180"
        gradientId="foundation-comet-right"
      />

      <svg
        className="pointer-events-none absolute inset-0 size-full"
        viewBox="0 0 158 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="foundation-lens-hatch"
            width="1.6"
            height="1.6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="1.6"
              stroke="rgba(15, 23, 20, 0.34)"
              strokeWidth="0.35"
            />
          </pattern>
          <radialGradient
            id="foundation-lens-green"
            cx="79"
            cy="50"
            r="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(5, 92, 57, 0.52)" />
            <stop offset="45%" stopColor="rgba(10, 104, 66, 0.2)" />
            <stop offset="100%" stopColor="rgba(10, 104, 66, 0)" />
          </radialGradient>
          <radialGradient
            id="foundation-lens-blue"
            cx="90"
            cy="50"
            r="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(8, 91, 124, 0.44)" />
            <stop offset="55%" stopColor="rgba(10, 75, 105, 0.18)" />
            <stop offset="100%" stopColor="rgba(10, 75, 105, 0)" />
          </radialGradient>
          <clipPath id="foundation-clip-left">
            <circle cx="50" cy="50" r="48.2" />
          </clipPath>
          <clipPath id="foundation-clip-right">
            <circle cx="108" cy="50" r="48.2" />
          </clipPath>
        </defs>

        <g clipPath="url(#foundation-clip-left)">
          <g clipPath="url(#foundation-clip-right)">
            <rect
              className="foundation-lens-green"
              width="158"
              height="100"
              fill="url(#foundation-lens-green)"
            />
            <rect
              className="foundation-lens-blue"
              width="158"
              height="100"
              fill="url(#foundation-lens-blue)"
              style={{ mixBlendMode: "multiply" }}
            />
            <rect
              width="158"
              height="100"
              fill="url(#foundation-lens-hatch)"
            />
          </g>
        </g>
      </svg>

      <style>{`
        .foundation-orbit-spinner {
          position: absolute;
          inset: -1px;
          border-radius: 9999px;
          animation: foundation-venn-spin 10s linear infinite;
        }

        .foundation-lens-green {
          transform-origin: 79px 50px;
          animation: foundation-lens-breathe 7.5s ease-in-out infinite;
        }

        .foundation-lens-blue {
          transform-origin: 79px 50px;
          animation: foundation-lens-drift 9.5s ease-in-out infinite;
        }

        @keyframes foundation-venn-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes foundation-lens-breathe {
          0%, 100% { opacity: 0.55; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        @keyframes foundation-lens-drift {
          0%, 100% {
            opacity: 0.4;
            transform: translate(-6px, 4px) scale(0.95);
          }
          33% {
            opacity: 0.95;
            transform: translate(5px, -3px) scale(1.1);
          }
          66% {
            opacity: 0.7;
            transform: translate(-2px, -5px) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .foundation-orbit-spinner,
          .foundation-lens-green,
          .foundation-lens-blue {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

function FoundationOrbit({
  className,
  gradientId,
}: {
  className: string
  gradientId: string
}) {
  return (
    <div
      className={`absolute top-0 aspect-square w-[63.2911%] rounded-full border border-dashed border-foreground/30 ${className}`}
    >
      <div className="foundation-orbit-spinner">
        <svg
          className="absolute inset-0 size-full overflow-visible"
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 50 0.1 A 49.9 49.9 0 0 1 88.23 17.92"
            stroke={`url(#${gradientId})`}
            strokeLinecap="round"
            strokeWidth="0.55"
          />
          <defs>
            <linearGradient
              id={gradientId}
              x1="50"
              y1="0.1"
              x2="88.23"
              y2="17.92"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#111815" />
              <stop offset="1" stopColor="#111815" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
