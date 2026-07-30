export type TransitionKind =
  | "wipe"
  | "ripple"
  | "scatter"
  | "collapse"
  | "columns"

export type StyleKind = "drift" | "grain" | "swell" | "streak" | null

export type Scene = {
  kind:
    | "symbol"
    | "symbol-grid"
    | "symbol-stagger"
    | "symbol-stream"
    | "symbol-radial"
    | "symbol-weave"
  palette: number
  style?: StyleKind
  transition: TransitionKind
}

export const scenes: Scene[] = [
  { kind: "symbol", transition: "wipe", palette: 0, style: "drift" },
  { kind: "symbol-grid", transition: "columns", palette: 1, style: "grain" },
  { kind: "symbol-stagger", transition: "scatter", palette: 2, style: "swell" },
  { kind: "symbol-stream", transition: "wipe", palette: 3, style: "streak" },
  { kind: "symbol-radial", transition: "ripple", palette: 4, style: "swell" },
  { kind: "symbol-weave", transition: "collapse", palette: 5, style: "grain" },
]

export const palettes: [string, string][] = [
  ["#8aa9ff", "#1f45f5"],
  ["#ffd166", "#e5484d"],
  ["#b8f2c9", "#0f8a5f"],
  ["#ffc2e2", "#c81d77"],
  ["#c7d2fe", "#4338ca"],
  ["#fde68a", "#b45309"],
]

export function cellMotion(
  kind: TransitionKind,
  t: number,
  direction: number,
  random: number
) {
  const u = Math.sin(clamp(t) * Math.PI)

  switch (kind) {
    case "wipe":
      return { scale: 1, dx: u * 0.16 * -direction, dy: 0 }
    case "ripple":
      return { scale: 1 - u * 0.1, dx: 0, dy: u * -0.13 }
    case "scatter":
      return {
        scale: 1,
        dx: u * 0.18 * Math.cos(random * Math.PI * 2),
        dy: u * 0.18 * Math.sin(random * Math.PI * 2),
      }
    case "collapse":
      return { scale: 1 - u * 0.18, dx: 0, dy: 0 }
    case "columns":
      return { scale: 1, dx: 0, dy: u * 0.22 }
  }
}

export function styleField(
  scene: Scene,
  columns: number,
  rows: number,
  t: number,
  output: Float32Array,
  previous?: Scene
) {
  const centerX = (columns - 1) / 2
  const centerY = (rows - 1) / 2
  const maxRadius = Math.hypot(columns, rows) / 2
  const flip = 0.32

  const stateAt = (
    style: StyleKind | undefined,
    x: number,
    y: number
  ) => {
    switch (style) {
      case "drift": {
        const a = Math.sin(x * 0.41 + y * 0.23)
        const b = Math.sin(x * 0.17 - y * 0.53 + 2.1)
        return smooth((a + b) * 0.5, -0.15, 0.75)
      }
      case "grain": {
        const noise =
          hash2(x, y) * 0.55 +
          hash2(x + 1, y) * 0.15 +
          hash2(x, y + 1) * 0.15 +
          hash2(x + 1, y + 1) * 0.15
        return smooth(noise, 0.34, 0.86)
      }
      case "swell": {
        const distance = Math.hypot(x - centerX, y - centerY) / maxRadius
        const warp =
          Math.sin(Math.atan2(y - centerY, x - centerX) * 3) * 0.14
        return smooth(1 - (distance + warp), 0.28, 0.92)
      }
      case "streak": {
        const streak = Math.sin(x * 0.28 + y * 0.62)
        const cut = Math.sin(x * 0.09 - y * 0.11 + 1.3) * 0.5 + 0.5
        return smooth(streak * cut, -0.05, 0.7)
      }
      default:
        return 0
    }
  }

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      let order = 0

      switch (scene.style) {
        case "drift":
          order =
            (x / columns) * 0.75 + Math.sin(y * 0.5) * 0.12 + 0.12
          break
        case "grain":
          order =
            (x / columns) * 0.55 +
            (y / rows) * 0.25 +
            hash2(x, y) * 0.2
          break
        case "swell":
          order = Math.hypot(x - centerX, y - centerY) / maxRadius
          break
        case "streak":
          order = (x / columns) * 0.8 + (y / rows) * 0.2
          break
      }

      const from = stateAt(previous?.style ?? scene.style, x, y)
      const to = stateAt(scene.style, x, y)
      const progress = clamp((t - order * (1 - flip)) / flip)
      const eased = progress * progress * (3 - 2 * progress)

      output[y * columns + x] = from + (to - from) * eased
    }
  }
}

export function rasterize(
  scene: Scene,
  columns: number,
  rows: number
) {
  const output = new Uint8Array(columns * rows).fill(1)
  const centerX = (columns - 1) / 2
  const centerY = (rows - 1) / 2

  if (scene.kind === "symbol") {
    const unit = Math.max(2.4, Math.min(rows / 5.8, columns / 11))
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        if (inSymbol(x, y, centerX, centerY, unit, 0)) {
          output[y * columns + x] = 0
        }
      }
    }
    return output
  }

  if (scene.kind === "symbol-grid") {
    const tileWidth = 7
    const tileHeight = 8
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const localX = mod(x - 1, tileWidth)
        const localY = mod(y - 1, tileHeight)
        if (inMicroSymbol(localX, localY)) {
          output[y * columns + x] = 0
        }
      }
    }
    return output
  }

  if (scene.kind === "symbol-stagger") {
    const tileWidth = 8
    const tileHeight = 7
    for (let y = 0; y < rows; y += 1) {
      const band = Math.floor(y / tileHeight)
      const shift = band % 2 === 0 ? 0 : tileWidth / 2
      for (let x = 0; x < columns; x += 1) {
        const localX = mod(x + shift - 1, tileWidth)
        const localY = mod(y - 1, tileHeight)
        if (inMicroSymbol(localX, localY)) {
          output[y * columns + x] = 0
        }
      }
    }
    return output
  }

  if (scene.kind === "symbol-stream") {
    const origins = [
      [-18, 7, -0.42],
      [-8, -2, -0.42],
      [2, 7, -0.42],
      [12, -2, -0.42],
      [22, 7, -0.42],
    ] as const
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const carved = origins.some(([originX, originY, rotation]) =>
          inSymbol(
            x,
            y,
            centerX + originX,
            centerY + originY,
            1.1,
            rotation
          )
        )
        if (carved) output[y * columns + x] = 0
      }
    }
    return output
  }

  if (scene.kind === "symbol-radial") {
    const marks: Array<[number, number, number]> = []
    const ringRadius = Math.min(rows * 0.33, columns * 0.18)
    const count = 8
    for (let index = 0; index < count; index += 1) {
      const angle = (index / count) * Math.PI * 2
      marks.push([
        centerX + Math.cos(angle) * ringRadius,
        centerY + Math.sin(angle) * ringRadius,
        angle + Math.PI / 2,
      ])
    }
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        if (
          marks.some(([markX, markY, rotation]) =>
            inSymbol(x, y, markX, markY, 0.72, rotation)
          )
        )
          output[y * columns + x] = 0
      }
    }
    return output
  }

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const tileX = Math.floor((x + y * 0.72) / 8)
      const tileY = Math.floor((y - x * 0.18) / 7)
      const rotation = (tileX + tileY) % 2 === 0 ? 0 : Math.PI
      const originX = tileX * 8 - tileY * 1.2 + 3
      const originY = tileY * 7 + tileX * 1.45 + 3
      if (inSymbol(x, y, originX, originY, 0.74, rotation)) {
        output[y * columns + x] = 0
      }
    }
  }
  return output
}

const symbolBlocks = [
  [-1, -2],
  [-1, 0],
  [-1, 2],
  [0, -1],
  [0, 1],
  [1, 0],
] as const

function inSymbol(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  unit: number,
  rotation: number
) {
  const cosine = Math.cos(-rotation)
  const sine = Math.sin(-rotation)
  const dx = x - centerX
  const dy = y - centerY
  const localX = dx * cosine - dy * sine
  const localY = dx * sine + dy * cosine
  const blockSize = unit * 0.78

  return symbolBlocks.some(
    ([blockX, blockY]) =>
      Math.abs(localX - blockX * unit * 1.25) <= blockSize / 2 &&
      Math.abs(localY - blockY * unit * 1.25) <= blockSize / 2
  )
}

function inMicroSymbol(x: number, y: number) {
  return (
    (x === 1 && (y === 1 || y === 3 || y === 5)) ||
    (x === 3 && (y === 2 || y === 4)) ||
    (x === 5 && y === 3)
  )
}

function mod(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor
}

export function cellDelay(
  kind: TransitionKind,
  x: number,
  y: number,
  columns: number,
  rows: number,
  random: number
) {
  const fx = columns > 1 ? x / (columns - 1) : 0
  const fy = rows > 1 ? y / (rows - 1) : 0

  switch (kind) {
    case "wipe":
      return clamp((fx * 0.75 + fy * 0.25) * 0.85 + random * 0.15)
    case "ripple":
      return clamp(
        (Math.hypot(fx - 0.5, fy - 0.5) / 0.707) * 0.9 +
          random * 0.1
      )
    case "scatter":
      return random
    case "collapse":
      return clamp(
        (1 - Math.hypot(fx - 0.5, fy - 0.5) / 0.707) * 0.85 +
          random * 0.15
      )
    case "columns":
      return clamp(fx * 0.9 + random * 0.1)
  }
}

function smooth(value: number, edge0: number, edge1: number) {
  const t = clamp((value - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

function hash2(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return value - Math.floor(value)
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}
