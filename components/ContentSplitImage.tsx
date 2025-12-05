import { imageURL } from "@/lib/imageURL";
import { SplitImage } from "@/sanity.types";
import Image from "next/image";
import { Card, CardBody } from "./ui/card";
import { cn } from "@/lib/utils";
import { variant } from "@/lib/variant";

export default function ContentSplitImage({ content }: { content: SplitImage }) {
  return (
    <Card modifier={"side"} className={cn("md:w-9/12", variant({ variant: content.variant }))}>
      {content.orientation === "imageLeft" ? (
        <>
          <figure>
            <Image src={imageURL(content.image!).width(1200).height(600).url()}
              width={1200}
              height={600}
              alt=""
            />
          </figure>
          <CardBody className="p-4 flex items-center justify-center">
            <h3 className="text-2xl font-bold">{content.title}</h3>
          </CardBody>
        </>
      ) : (
        <>
          <CardBody className="p-4 flex items-center justify-center">
            <h3 className="text-2xl font-bold">{content.title}</h3>
          </CardBody>
          <figure>
            <Image src={imageURL(content.image!).width(1200).height(600).url()}
              width={1200}
              height={600}
              alt=""
            />
          </figure>
        </>
      )}
    </Card>
  )
}