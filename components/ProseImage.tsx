import Image from "@/components/Image";

type ProseImageValue = {
  alt?: string;
  caption?: string;
} & Record<string, unknown>;

export default function ProseImage({ value }: { value: ProseImageValue }) {
  return (
    <figure className="my-6">
      <Image src={value} alt={value?.alt || " "} width={2000} height={1600} />
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm text-base-content/70">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
