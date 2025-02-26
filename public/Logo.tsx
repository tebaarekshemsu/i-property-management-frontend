import Image from "next/image"

export function Logo() {
    return (
      <div className="flex items-center">
        <Image src="/logo.svg" alt="I Property Solution" width={32} height={32} className="mr-2" />
        <span className="text-lg font-bold">I Property Solution</span>
      </div>
    )
  }
    