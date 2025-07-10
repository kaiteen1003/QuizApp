"use client";

import Image from "next/image";

interface Props {
  imageSrc: string;
  altText: string;
}

export default function ImageSlider({ imageSrc, altText }: Props) {
  return (
    <div className="relative w-[300px] h-[300px] border">
      <Image src={imageSrc} alt={altText} fill className="object-contain" />
    </div>
  );
}
