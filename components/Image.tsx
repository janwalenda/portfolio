import { imageURL } from "@/lib/imageURL";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ImageProps = Omit<NextImageProps, "src"> & {
  src: SanityImageSource;
  width?: number;
  height?: number;
}

export default function Image({
  src,
  width,
  height,
  ...props
}: ImageProps) {
  const imgSrc = imageURL(src);

  if (width) {
    imgSrc.width(width)
  }

  if (height) {
    imgSrc.height(height);
  }

  return (
    <NextImage
      {...props}
      width={width}
      height={height}
      src={imgSrc.url()}
    />
  )
}