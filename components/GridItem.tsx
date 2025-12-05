import { Card, CardAction, CardBody } from "./ui/card";
import { imageURL } from "@/lib/imageURL";
import { Image } from "next-sanity/image";
import { getGridByID } from "@/sanity/lib/page/getGridByID";
import CardGrid from "./CardGrid";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default async function GridItem({ id }: { id: string }) {
  const grid = await getGridByID(id);

  console.log(grid);

  if (!grid) {
    return null;
  }

  return (
    <CardGrid className="p-4 gap-4">
      {grid.components?.map(component => {
        if (!component) {
          return null;
        }
        switch (component._type) {
          case "card": {
            return (
              <Card key={component._id} className="border-2 border-base-content">
                {component.mainImage && (
                  <figure className="border-b-2 bg-neutral-100">
                    <Image
                      src={imageURL(component.mainImage).width(1200).height(600).url()}
                      alt={component.title || ''}
                      width={1200}
                      height={600}
                    />
                  </figure>
                )}
                <CardBody>
                  <h3 className="text-xl font-bold">{component.title}</h3>
                  <div className="w-20 h-1 bg-primary rounded-box" />
                  <p>{component.description}</p>
                  <CardAction>
                    {component.action && component.action.map(action => {
                      if (!action) {
                        return null;
                      }
                      switch (action._type) {
                        case "link": {
                          return (
                            <Link key={action._id} href={action.url || ''} className="btn btn-primary">
                              {action.icon && <Icon icon={action.icon.name || ''} />}
                              {action.title || ''}
                            </Link>
                          )
                        }
                        default: {
                          return null;
                        }
                      }
                    })}
                  </CardAction>
                </CardBody>
              </Card>
            )
          }

          default: {
            return null;
          }
        }
      })}
    </CardGrid>
  )
}