"use client";
import { SeasonEvent } from "@/sanity.types";
import { JSX, useEffect, useId, useRef, useState } from "react";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { useMessageDisplayedStore } from "@/store/messageDisplayed";
import { Stage, Layer } from 'react-konva';
import Snowflake from "./SnowFlake";
import { getDocumentWidth } from "../lib/getDocumentWidth";
import { getDocumentHeight } from "../lib/getDocumentHeight";
import Konva from "konva";

export default function WinterOverlay({ seasonEvent }: { seasonEvent?: SeasonEvent }) {
  const layerRef = useRef<Konva.Layer>(null);
  const { messageDisplayed, setMessageDisplayed } = useMessageDisplayedStore();
  const [isMounted, setIsMounted] = useState(false);
  const BATCH_COUNT = 80;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Stage width={getDocumentWidth()} height={getDocumentHeight()} className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
        <Layer ref={layerRef}>
          {Array.from({ length: BATCH_COUNT }, (_, i) => (
            <Snowflake key={i} />
          ))}
        </Layer>
      </Stage>
      <Modal backdrop open={!messageDisplayed} onClose={() => setMessageDisplayed(true)}>
        <form method="dialog" className="flex items-center justify-end">
          <Button type="submit" size={"sm"}>
            <Icon icon="mdi:close" />
          </Button>
        </form>
        <h3 className="text-2xl font-bold">{seasonEvent?.title}</h3>
        <p className="text-lg">{seasonEvent?.message}</p>
      </Modal>
    </>
  )
}