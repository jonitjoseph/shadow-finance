import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container sticky top-0 bg-opacity-80 backdrop-blur-md">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="items-center space-x-2 md:flex">
              <span className="hidden font-medium sm:inline-block">
                ShadowFinance
              </span>
            </Link>
          </div>
          <nav>
            <ConnectButton />
          </nav>
        </div>
      </header>
      <main className="m-4 mx-16 flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-medium sm:text-5xl md:text-6xl lg:text-7xl">
              Shadow Finance
            </h1>
            <p className="max-w-[42rem] leading-normal text-stone-500 sm:text-xl sm:leading-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="space-x-4 pt-4">
              <Link href="#" className={cn(buttonVariants({ size: "lg" }))}>
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24">
        <div className="flex flex-col items-center gap-4 px-8 md:gap-2 md:px-0">
          <span className="text-xl">⚙️🛠</span>
        </div>
      </div>
    </div>
  )
}
