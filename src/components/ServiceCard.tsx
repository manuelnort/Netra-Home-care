import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/services";
import { photos } from "@/lib/photos";
import { ServiceIcon } from "./icons";

export function ServiceCard({ service, headingLevel = 3 }: { service: Service; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="service-card">
      <H>
        <Link href={`/services/${service.slug}/`}>{service.name}</Link>
        <ArrowUpRight size={18} aria-hidden />
      </H>
      <p>{service.summary}</p>
      <div className="service-card-photo">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
        <img src={photos[service.slug].src} alt="" loading="lazy" />
        <span className="mini">
          <ServiceIcon name={service.icon} size={18} />
        </span>
      </div>
    </article>
  );
}
