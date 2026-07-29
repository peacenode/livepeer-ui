import type { SocialAvatar as SocialAvatarConfig } from "@/lib/social-assets"

const symbolTiles = [
  [0, 0.944092],
  [28.4692, 19.0045],
  [56.8936, 37.0667],
  [28.4692, 55.0819],
  [0, 73.1212],
  [0, 37.0667],
] as const

export function SocialAvatar({ avatar }: { avatar: SocialAvatarConfig }) {
  return (
    <main
      className="grid place-items-center overflow-hidden"
      style={{ width: avatar.width, height: avatar.height }}
      data-avatar-id={avatar.id}
      data-avatar-size={`${avatar.width}x${avatar.height}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        width={avatar.width}
        height={avatar.height}
        role="img"
        aria-label="Livepeer"
      >
        <defs>
          <linearGradient
            id="social-avatar-green"
            x1="0"
            y1="0"
            x2=".342"
            y2="1"
          >
            <stop offset="0" stopColor="#00bd7e" />
            <stop
              offset="0"
              stopColor="color(display-p3 0.04 0.74 0.49)"
            />
            <stop offset=".32" stopColor="#00bd7e" />
            <stop
              offset=".32"
              stopColor="color(display-p3 0.04 0.74 0.49)"
            />
            <stop offset="1" stopColor="#00935c" />
            <stop
              offset="1"
              stopColor="color(display-p3 0.02 0.58 0.36)"
            />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="200" fill="#000" />

        <g
          fill="url(#social-avatar-green)"
          transform="translate(136.9 96) scale(2.3371)"
        >
          {symbolTiles.map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="15.4995"
              height="15.4995"
            />
          ))}
        </g>
      </svg>
      <style>{"nextjs-portal { display: none !important; }"}</style>
    </main>
  )
}
