"use client";

import { type SeasonEvent } from "@/sanity.types";
import dynamic from "next/dynamic";

const WinterOverlay = dynamic(() => import("./WinterOverlay"), { ssr: false });

export default function WinterOverlayClient({ seasonEvent }: { seasonEvent?: SeasonEvent }) {
  return <WinterOverlay seasonEvent={seasonEvent} />;
}
