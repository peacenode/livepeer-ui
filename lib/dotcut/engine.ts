import {
  cellDelay,
  cellMotion,
  palettes,
  rasterize,
  scenes,
  styleField,
} from "@/lib/dotcut/scenes"

const defaultColumns = 42

export type DotCutParams = {
  brush: number
  columns: number
  fill: number
  hold: number
  morph: number
}

export const dotCutDefaults: DotCutParams = {
  columns: defaultColumns,
  hold: 600,
  morph: 520,
  brush: 1.6,
  fill: 1,
}

export class DotCut {
  readonly params = { ...dotCutDefaults }

  private host: HTMLElement
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D | null
  private columns = defaultColumns
  private rows = 12
  private pitch = 10
  private offsetX = 0
  private offsetY = 0
  private target = new Uint8Array(0)
  private live = new Float32Array(0)
  private from = new Float32Array(0)
  private delay = new Float32Array(0)
  private random = new Float32Array(0)
  private progress = new Float32Array(0)
  private direction = new Float32Array(0)
  private bore = new Float32Array(0)
  private styleProgress = 0
  private sceneIndex = 0
  private previousScene = 0
  private phase: "hold" | "morph" = "hold"
  private phaseTime = 0
  private paletteMix = 1
  private previousPalette = 0
  private pointer: { x: number; y: number } | null = null
  private animationFrame = 0
  private lastTime = 0
  private running = false
  private devicePixelRatio = 1
  private resizeObserver: ResizeObserver | null = null
  private disposed = false
  constructor(
    host: HTMLElement,
    sceneIndex = 0
  ) {
    this.host = host
    this.sceneIndex = Math.max(
      0,
      Math.min(scenes.length - 1, Math.round(sceneIndex))
    )
    this.previousScene = this.sceneIndex
    this.previousPalette = scenes[this.sceneIndex].palette

    this.canvas = document.createElement("canvas")
    this.canvas.style.cssText =
      "display:block;width:100%;height:100%;touch-action:none"
    this.canvas.setAttribute("aria-hidden", "true")
    host.appendChild(this.canvas)

    this.context = this.canvas.getContext("2d")
    this.resize()
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(host)
  }

  get ok() {
    return this.context !== null
  }

  setPointer(pointer: { x: number; y: number } | null) {
    this.pointer = pointer
    if (!this.running) this.draw(0)
  }

  toCell(x: number, y: number) {
    return {
      x: (x - this.offsetX) / this.pitch,
      y: (y - this.offsetY) / this.pitch,
    }
  }

  start() {
    if (this.running || !this.ok || this.disposed) return
    this.running = true
    this.lastTime = performance.now()

    const tick = (now: number) => {
      if (!this.running) return
      const delta = Math.min((now - this.lastTime) / 1000, 1 / 30)
      this.lastTime = now
      this.draw(delta)
      this.animationFrame = requestAnimationFrame(tick)
    }

    this.animationFrame = requestAnimationFrame(tick)
  }

  stop() {
    this.running = false
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame)
    this.animationFrame = 0
  }

  renderStill() {
    this.phase = "hold"
    this.phaseTime = 0
    this.paletteMix = 1
    this.applyScene(true)
    this.draw(0)
  }

  destroy() {
    this.disposed = true
    this.stop()
    this.resizeObserver?.disconnect()
    this.resizeObserver = null
    this.context = null
    this.canvas.remove()
  }

  private resize() {
    if (!this.context || this.disposed) return
    const width = this.host.clientWidth
    const height = this.host.clientHeight
    if (!width || !height) return

    this.devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    this.canvas.width = Math.round(width * this.devicePixelRatio)
    this.canvas.height = Math.round(height * this.devicePixelRatio)

    const margin = 0.75
    this.columns = Math.max(6, Math.round(this.params.columns))
    this.pitch = width / (this.columns + margin * 2)
    this.rows = Math.max(
      3,
      Math.floor((height - margin * 2 * this.pitch) / this.pitch)
    )
    this.offsetX = (width - this.columns * this.pitch) / 2
    this.offsetY = (height - this.rows * this.pitch) / 2

    const cellCount = this.columns * this.rows
    this.target = new Uint8Array(cellCount)
    this.live = new Float32Array(cellCount)
    this.from = new Float32Array(cellCount)
    this.delay = new Float32Array(cellCount)
    this.random = new Float32Array(cellCount)
    this.progress = new Float32Array(cellCount)
    this.direction = new Float32Array(cellCount)
    this.bore = new Float32Array(cellCount)

    for (let index = 0; index < cellCount; index += 1) {
      this.random[index] = hash(index * 1.37 + 0.5)
    }

    this.applyScene(true)
    if (!this.running) this.draw(0)
  }

  private applyScene(instant: boolean) {
    const scene = scenes[this.sceneIndex]
    const next = rasterize(
      scene,
      this.columns,
      this.rows
    )

    this.from.set(this.live)
    this.target = next

    for (let y = 0; y < this.rows; y += 1) {
      for (let x = 0; x < this.columns; x += 1) {
        const index = y * this.columns + x
        this.delay[index] = cellDelay(
          scene.transition,
          x,
          y,
          this.columns,
          this.rows,
          this.random[index]
        )
      }
    }

    if (instant) {
      for (let index = 0; index < next.length; index += 1) {
        this.live[index] = next[index]
      }
      this.from.set(this.live)
      styleField(
        scene,
        this.columns,
        this.rows,
        1,
        this.bore,
        scene
      )
    }
  }

  private advance() {
    this.previousScene = this.sceneIndex
    this.sceneIndex = (this.sceneIndex + 1) % scenes.length
    this.previousPalette =
      scenes[
        (this.sceneIndex - 1 + scenes.length) % scenes.length
      ].palette
    this.paletteMix = 0
    this.phase = "morph"
    this.phaseTime = 0
    this.styleProgress = 0
    this.applyScene(false)
  }

  private step(delta: number) {
    this.phaseTime += delta * 1000

    if (this.phase === "hold" && this.phaseTime >= this.params.hold) {
      this.advance()
    } else if (
      this.phase === "morph" &&
      this.phaseTime >= this.params.morph
    ) {
      this.phase = "hold"
      this.phaseTime = 0
    }

    const phaseProgress =
      this.phase === "morph"
        ? Math.min(1, this.phaseTime / this.params.morph)
        : 1
    const cellCount = this.columns * this.rows

    for (let index = 0; index < cellCount; index += 1) {
      const local = clamp(
        (phaseProgress - this.delay[index] * 0.72) / 0.28
      )
      const eased = 1 - Math.pow(1 - local, 3)
      this.live[index] =
        this.from[index] +
        (this.target[index] - this.from[index]) * eased

      const changing =
        this.from[index] !== this.target[index] &&
        this.phase === "morph"
      this.progress[index] = changing ? local : 0
      this.direction[index] =
        this.target[index] > this.from[index] ? 1 : -1
    }

    this.paletteMix = Math.min(1, this.paletteMix + delta * 2.2)
    this.styleProgress =
      this.phase === "morph"
        ? Math.min(
            1,
            this.styleProgress + delta / (this.params.morph / 1000)
          )
        : 1

    styleField(
      scenes[this.sceneIndex],
      this.columns,
      this.rows,
      this.styleProgress,
      this.bore,
      scenes[this.previousScene]
    )
  }

  private draw(delta: number) {
    const context = this.context
    if (!context) return
    this.step(delta)

    const scale = this.devicePixelRatio
    const scene = scenes[this.sceneIndex]
    const previousColors =
      palettes[this.previousPalette % palettes.length]
    const nextColors = palettes[scene.palette % palettes.length]
    const paletteProgress = easeInOut(this.paletteMix)
    const circle = mixHex(
      previousColors[0],
      nextColors[0],
      paletteProgress
    )
    const background = mixHex(
      previousColors[1],
      nextColors[1],
      paletteProgress
    )

    context.fillStyle = background
    context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    const pitch = this.pitch * scale
    const radius = pitch / 2
    const stroke = Math.max(1.1 * scale, radius * 0.3)
    const path = new Path2D()

    context.fillStyle = circle

    for (let y = 0; y < this.rows; y += 1) {
      for (let x = 0; x < this.columns; x += 1) {
        const index = y * this.columns + x
        let value = this.live[index]
        if (value <= 0.004) continue

        if (this.pointer && this.params.brush > 0) {
          const distance = Math.hypot(
            x + 0.5 - this.pointer.x,
            y + 0.5 - this.pointer.y
          )
          if (distance < this.params.brush) {
            value *= Math.min(
              1,
              Math.pow(distance / this.params.brush, 2)
            )
          }
        }
        if (value <= 0.004) continue

        const motion = cellMotion(
          scene.transition,
          this.progress[index],
          this.direction[index],
          this.random[index]
        )
        const centerX =
          this.offsetX * scale +
          (x + 0.5) * pitch +
          motion.dx * pitch
        const centerY =
          this.offsetY * scale +
          (y + 0.5) * pitch +
          motion.dy * pitch
        const outerRadius =
          radius *
          value *
          motion.scale *
          this.params.fill
        if (outerRadius <= 0.3) continue

        const bore =
          outerRadius > 3.2 * scale
            ? (outerRadius - stroke) * this.bore[index]
            : 0

        path.moveTo(centerX + outerRadius, centerY)
        path.arc(
          centerX,
          centerY,
          outerRadius,
          0,
          Math.PI * 2
        )

        if (bore > 0.4) {
          path.moveTo(centerX + bore, centerY)
          path.arc(
            centerX,
            centerY,
            bore,
            0,
            Math.PI * 2,
            true
          )
        }
      }
    }

    context.fill(path, "evenodd")
  }
}

function hash(value: number) {
  const result = Math.sin(value * 127.1 + 311.7) * 43758.5453
  return result - Math.floor(result)
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}

function easeInOut(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2
}

function mixHex(colorA: string, colorB: string, t: number) {
  const a = Number.parseInt(colorA.slice(1), 16)
  const b = Number.parseInt(colorB.slice(1), 16)
  const red = Math.round(
    ((a >> 16) & 255) * (1 - t) + ((b >> 16) & 255) * t
  )
  const green = Math.round(
    ((a >> 8) & 255) * (1 - t) + ((b >> 8) & 255) * t
  )
  const blue = Math.round(
    (a & 255) * (1 - t) + (b & 255) * t
  )
  return `rgb(${red},${green},${blue})`
}
