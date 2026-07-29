import { Fragment } from "react"

import type { SocialAvatar as SocialAvatarConfig } from "@/lib/social-assets"

const tiles = [
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
      className="relative isolate grid place-items-center overflow-hidden rounded-full bg-black"
      style={{
        width: avatar.width,
        height: avatar.height,
        containerType: "size",
      }}
      data-avatar-id={avatar.id}
      data-avatar-size={`${avatar.width}x${avatar.height}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, color(display-p3 0.015 0.11 0.07) 0%, color(display-p3 0.006 0.035 0.022) 44%, black 78%)",
        }}
      />
      <BeveledLivepeerSymbol />
      <style>{"nextjs-portal { display: none !important; }"}</style>
    </main>
  )
}

function BeveledLivepeerSymbol() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-5 -5 83 99"
      className="relative z-10 h-[72cqh] w-auto translate-x-[7.5%] overflow-visible"
      role="img"
      aria-label="Livepeer"
    >
      <defs>
        {tiles.map(([x, y], index) => (
          <Fragment key={`${x}-${y}`}>
            <linearGradient
              id={`avatar-face-${index}`}
              x1={x}
              y1={y}
              x2={x + 15.5}
              y2={y + 15.5}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="color(display-p3 0.12 1 0.68)" />
              <stop
                offset=".42"
                stopColor="color(display-p3 0.01 0.82 0.53)"
              />
              <stop offset="1" stopColor="color(display-p3 0 0.48 0.3)" />
            </linearGradient>
            <linearGradient
              id={`avatar-rim-${index}`}
              x1={x}
              y1={y}
              x2={x + 15.5}
              y2={y + 15.5}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="color(display-p3 0.48 1 0.79)" />
              <stop
                offset=".48"
                stopColor="color(display-p3 0.015 0.7 0.44)"
              />
              <stop offset="1" stopColor="color(display-p3 0 0.2 0.12)" />
            </linearGradient>
          </Fragment>
        ))}
      </defs>

      <g>
        {tiles.map(([x, y], index) => {
          const farX = x + 15.5
          const farY = y + 15.5
          const innerX = x + 0.3
          const innerY = y + 0.3
          const innerFarX = farX - 0.3
          const innerFarY = farY - 0.3

          return (
            <g key={`${x}-${y}`}>
              <polygon
                points={`${x},${y} ${farX},${y} ${innerFarX},${innerY} ${innerX},${innerY}`}
                fill={`url(#avatar-rim-${index})`}
              />
              <polygon
                points={`${farX},${y} ${farX},${farY} ${innerFarX},${innerFarY} ${innerFarX},${innerY}`}
                fill={`url(#avatar-rim-${index})`}
              />
              <polygon
                points={`${x},${farY} ${farX},${farY} ${innerFarX},${innerFarY} ${innerX},${innerFarY}`}
                fill={`url(#avatar-rim-${index})`}
              />
              <polygon
                points={`${x},${y} ${innerX},${innerY} ${innerX},${innerFarY} ${x},${farY}`}
                fill={`url(#avatar-rim-${index})`}
              />
              <rect
                x={innerX}
                y={innerY}
                width="14.9"
                height="14.9"
                fill={`url(#avatar-face-${index})`}
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}
