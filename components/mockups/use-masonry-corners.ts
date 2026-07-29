"use client"

import {
  type CSSProperties,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"

type CornerStyleMap = Record<string, CSSProperties>

const roundedCorner = "var(--radius-sm)"
const squareCorner = "0px"
const positionTolerance = 2

function sameStyles(a: CornerStyleMap, b: CornerStyleMap) {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function useMasonryCorners(): {
  containerRef: RefObject<HTMLDivElement | null>
  cornerStyles: CornerStyleMap
} {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cornerStyles, setCornerStyles] = useState<CornerStyleMap>({})

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const masonryContainer: HTMLDivElement = container

    let frame = 0

    function measure() {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const items = Array.from(
          masonryContainer.querySelectorAll<HTMLElement>(
            "[data-masonry-item]"
          )
        ).map((element) => ({
          element,
          id: element.dataset.masonryItem ?? "",
          rect: element.getBoundingClientRect(),
        }))

        const columns: typeof items[] = []

        for (const item of items.sort((a, b) => a.rect.left - b.rect.left)) {
          const column = columns.find(
            (candidate) =>
              Math.abs(candidate[0].rect.left - item.rect.left) <=
              positionTolerance
          )

          if (column) {
            column.push(item)
          } else {
            columns.push([item])
          }
        }

        columns.sort((a, b) => a[0].rect.left - b[0].rect.left)
        columns.forEach((column) =>
          column.sort((a, b) => a.rect.top - b.rect.top)
        )

        const nextStyles: CornerStyleMap = {}

        columns.forEach((column, columnIndex) => {
          const previousColumn = columns[columnIndex - 1]
          const nextColumn = columns[columnIndex + 1]
          const previousBottom =
            previousColumn?.[previousColumn.length - 1].rect.bottom
          const nextBottom = nextColumn?.[nextColumn.length - 1].rect.bottom

          column.forEach((item, itemIndex) => {
            const isTop = itemIndex === 0
            const isBottom = itemIndex === column.length - 1
            const isFirstColumn = columnIndex === 0
            const isLastColumn = columnIndex === columns.length - 1
            const bottomLeftExposed =
              isFirstColumn ||
              previousBottom === undefined ||
              previousBottom <= item.rect.bottom + positionTolerance
            const bottomRightExposed =
              isLastColumn ||
              nextBottom === undefined ||
              nextBottom <= item.rect.bottom + positionTolerance

            nextStyles[item.id] = {
              borderTopLeftRadius:
                isTop && isFirstColumn ? roundedCorner : squareCorner,
              borderTopRightRadius:
                isTop && isLastColumn ? roundedCorner : squareCorner,
              borderBottomLeftRadius:
                isBottom && bottomLeftExposed ? roundedCorner : squareCorner,
              borderBottomRightRadius:
                isBottom && bottomRightExposed ? roundedCorner : squareCorner,
            }
          })
        })

        setCornerStyles((current) =>
          sameStyles(current, nextStyles) ? current : nextStyles
        )
      })
    }

    const observer = new ResizeObserver(measure)
    observer.observe(masonryContainer)
    masonryContainer
      .querySelectorAll<HTMLElement>("[data-masonry-item]")
      .forEach((item) => observer.observe(item))
    window.addEventListener("resize", measure)
    measure()

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  return { containerRef, cornerStyles }
}
