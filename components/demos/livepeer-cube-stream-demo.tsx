import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"

export default function LivepeerCubeStreamDemo() {
  return (
    <div className="relative h-[350px] w-full overflow-hidden bg-background">
      <LivepeerCubeStream />
      <div className="relative z-10 flex h-full items-center p-8">
        <h2 className="max-w-sm text-4xl font-light">Open inference network.</h2>
      </div>
    </div>
  )
}
