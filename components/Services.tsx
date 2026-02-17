"use client";

import { Icon } from "@iconify/react";
import { H2 } from "./ui/heading";
import { Card, CardBody, CardTitle } from "./ui/card";

export interface ServiceItem {
  title: string | null;
  description: string | null;
  icon?: {
    name?: string;
  } | null;
}

interface ServicesProps {
  title?: string;
  subtitle?: string;
  services?: ServiceItem[];
}

export default function Services({ title, subtitle, services }: ServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-20 px-6 bg-base-100">
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <H2 className="text-4xl font-bold mb-4">{title}</H2>}
            {subtitle && (
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="bg-base-200 border items-center"
              modifier={"side"}
            >
              {service.icon?.name && (
                <figure className="p-3 rounded-box bg-primary/10 m-6 min-size-16">
                  
                  <Icon
                    icon={service.icon.name}
                    className="size-8 text-primary"
                  />
                </figure>
              )}
              <CardBody>
                <CardTitle>{service.title}</CardTitle>
                <p className="text-base-content/70">{service.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

