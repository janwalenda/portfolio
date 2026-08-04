"use client";

import { Icon } from "@iconify/react";
import { H2, H3 } from "./ui/heading";

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
    <section id="leistungen" className="w-full py-20 px-6 bg-base-100">
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
            <div key={service.title} className="card bg-base-200 border">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-2">
                  {service.icon?.name && (
                    <div className="p-3 rounded-box bg-primary/10">
                      <Icon
                        icon={service.icon.name}
                        className="size-8 text-primary"
                      />
                    </div>
                  )}
                  <H3 className="card-title text-xl">{service.title}</H3>
                </div>
                <p className="text-base-content/70">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
