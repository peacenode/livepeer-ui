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
  { kind: "symbol", transition: "wipe", palette: 0 },
  { kind: "symbol-grid", transition: "columns", palette: 1 },
  { kind: "symbol-stagger", transition: "scatter", palette: 2 },
  { kind: "symbol-stream", transition: "wipe", palette: 3 },
  { kind: "symbol-radial", transition: "ripple", palette: 4 },
  { kind: "symbol-weave", transition: "collapse", palette: 5 },
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
  const canvas = document.createElement("canvas")
  canvas.width = columns
  canvas.height = rows
  const context = canvas.getContext("2d", {
    willReadFrequently: true,
  })
  if (!context) return output

  context.fillStyle = "#fff"
  for (const placement of symbolPlacements(scene.kind, columns, rows)) {
    drawOfficialSymbol(context, placement)
  }

  const pixels = context.getImageData(0, 0, columns, rows).data
  for (let index = 0; index < output.length; index += 1) {
    if (pixels[index * 4 + 3] > 110) output[index] = 0
  }
  return output
}

type SymbolPlacement = {
  rotation: number
  size: number
  x: number
  y: number
}

const symbolViewBox = { width: 72.393, height: 88.6207 }
const officialSymbolRects = [
  [0, 0.944092, 15.4995, 15.4995],
  [28.4692, 19.0045, 15.4995, 15.4995],
  [56.8936, 37.0667, 15.4994, 15.4994],
  [28.4692, 55.0819, 15.4995, 15.4995],
  [0, 73.1212, 15.4995, 15.4995],
  [0, 37.0667, 15.4995, 15.4994],
] as const

function symbolPlacements(
  kind: Scene["kind"],
  columns: number,
  rows: number
) {
  const centerX = columns / 2
  const centerY = rows / 2
  const marks: SymbolPlacement[] = []

  if (kind === "symbol") {
    const size = Math.min(rows * 0.76, columns * 0.42)
    return [
      {
        x: centerX,
        y: centerY,
        size,
        rotation: 0,
      },
    ]
  }

  if (kind === "symbol-grid" || kind === "symbol-stagger") {
    const size = 6
    const rowCount = Math.ceil(rows / size) + 2
    const columnCount = Math.ceil(columns / size) + 2

    for (let row = -1; row < rowCount; row += 1) {
      const stagger =
        kind === "symbol-stagger" && row % 2 !== 0 ? size / 2 : 0
      for (let column = -1; column < columnCount; column += 1) {
        marks.push({
          x: column * size + stagger + size / 2,
          y: row * size + size / 2,
          size,
          rotation: 0,
        })
      }
    }
    return marks
  }

  if (kind === "symbol-stream") {
    const size = 9
    const spacing = size * 1.15
    for (let index = -2; index <= 5; index += 1) {
      marks.push({
        x: index * spacing + centerX * 0.18,
        y: centerY + (index % 2 === 0 ? -size * 0.42 : size * 0.42),
        size,
        rotation: -0.46,
      })
    }
    return marks
  }

  if (kind === "symbol-radial") {
    const size = 7
    const radius = Math.max(size * 0.82, rows * 0.28)
    const count = 6
    for (let index = 0; index < count; index += 1) {
      const angle = (index / count) * Math.PI * 2
      marks.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size,
        rotation: angle + Math.PI / 2,
      })
    }
    return marks
  }

  const size = 6
  const rowCount = Math.ceil(rows / size) + 2
  const columnCount = Math.ceil(columns / size) + 2
  for (let row = -1; row < rowCount; row += 1) {
    for (let column = -1; column < columnCount; column += 1) {
      marks.push({
        x: column * size + size / 2,
        y: row * size + size / 2,
        size,
        rotation: (row + column) % 2 === 0 ? 0 : Math.PI,
      })
    }
  }
  return marks
}

function drawOfficialSymbol(
  context: CanvasRenderingContext2D,
  placement: SymbolPlacement
) {
  const scale = placement.size / symbolViewBox.height
  const renderedWidth = symbolViewBox.width * scale
  const renderedHeight = symbolViewBox.height * scale

  context.save()
  context.translate(placement.x, placement.y)
  context.rotate(placement.rotation)
  context.translate(-renderedWidth / 2, -renderedHeight / 2)
  context.scale(scale, scale)

  for (const [x, y, width, height] of officialSymbolRects) {
    context.fillRect(x, y, width, height)
  }
  context.restore()
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
