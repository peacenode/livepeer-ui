export type TransitionKind =
  | "wipe"
  | "ripple"
  | "scatter"
  | "collapse"
  | "columns"

export type StyleKind = "drift" | "grain" | "swell" | "streak" | null

export type Scene = {
  kind: "text" | "rings" | "checker" | "bars" | "columns" | "boxes"
  palette: number
  style?: StyleKind
  transition: TransitionKind
  value?: string
}

export const scenes: Scene[] = [
  { kind: "text", value: "A", transition: "wipe", palette: 0, style: "drift" },
  { kind: "rings", transition: "ripple", palette: 1, style: "grain" },
  { kind: "columns", transition: "columns", palette: 2, style: "streak" },
  { kind: "checker", transition: "scatter", palette: 3, style: "swell" },
  { kind: "boxes", transition: "collapse", palette: 4, style: "grain" },
  { kind: "bars", transition: "wipe", palette: 5, style: "drift" },
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
  rows: number,
  fontFamily: string
) {
  const output = new Uint8Array(columns * rows).fill(1)
  const centerX = (columns - 1) / 2
  const centerY = (rows - 1) / 2

  if (scene.kind === "checker") {
    const block = Math.max(2, Math.round(columns / 14))
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        if ((Math.floor(x / block) + Math.floor(y / block)) % 2 === 0) {
          output[y * columns + x] = 0
        }
      }
    }
    return output
  }

  if (scene.kind === "bars") {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        if (Math.floor((x + y) / 3) % 2 === 0) {
          output[y * columns + x] = 0
        }
      }
    }
    return output
  }

  if (scene.kind === "columns") {
    const blockWidth = 4
    const blockHeight = 3
    for (let y = 0; y < rows; y += 1) {
      const shift =
        Math.floor(y / blockHeight) % 2 === 0 ? 0 : blockWidth / 2
      for (let x = 0; x < columns; x += 1) {
        if (Math.floor((x + shift) / blockWidth) % 2 === 0) {
          output[y * columns + x] = 0
        }
      }
    }
    return output
  }

  if (scene.kind === "boxes") {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const distance = Math.max(
          Math.abs(x - centerX),
          Math.abs(y - centerY)
        )
        if (Math.floor(distance / 2.5) % 2 === 0) {
          output[y * columns + x] = 0
        }
      }
    }
    return output
  }

  if (scene.kind === "rings") {
    const maxRadius = Math.hypot(columns, rows) / 2
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const distance =
          Math.hypot(x - centerX, y - centerY) / maxRadius
        if (Math.floor(distance * 6) % 2 === 0) {
          output[y * columns + x] = 0
        }
      }
    }
    return output
  }

  const canvas = document.createElement("canvas")
  canvas.width = columns
  canvas.height = rows
  const context = canvas.getContext("2d", { willReadFrequently: true })
  const text = (scene.value ?? "").trim()
  if (!context || !text) return output

  context.fillStyle = "#000"
  context.fillRect(0, 0, columns, rows)
  context.fillStyle = "#fff"
  context.textAlign = "center"
  context.textBaseline = "middle"

  let fontSize = rows * 0.8
  context.font = `700 ${fontSize}px ${fontFamily}`
  const maxWidth = columns * 0.36
  const firstMeasurement = context.measureText(text)
  if (firstMeasurement.width > maxWidth) {
    fontSize *= maxWidth / firstMeasurement.width
    context.font = `700 ${fontSize}px ${fontFamily}`
  }

  const maxHeight = rows * 0.58
  const measurement = context.measureText(text)
  const glyphHeight =
    measurement.actualBoundingBoxAscent +
    measurement.actualBoundingBoxDescent
  if (glyphHeight > maxHeight) {
    fontSize *= maxHeight / glyphHeight
    context.font = `700 ${fontSize}px ${fontFamily}`
  }

  context.fillText(text, columns / 2, rows / 2 + rows * 0.02)
  const pixels = context.getImageData(0, 0, columns, rows).data
  for (let index = 0; index < columns * rows; index += 1) {
    if (pixels[index * 4] > 110) output[index] = 0
  }

  return output
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
