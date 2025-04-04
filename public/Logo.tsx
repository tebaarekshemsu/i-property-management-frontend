import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/photo_2025-02-10_22-09-59.jpg"
        alt="I Property Solution"
        width={32}
        height={32}
        className="mr-2"
      />
      <span className="text-lg font-bold">I Property Solution</span>
    </div>
  );
}
