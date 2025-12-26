"use client";
import { getDocumentHeight } from "@/lib/getDocumentHeight";
import { getDocumentWidth } from "@/lib/getDocumentWidth";
import Konva from "konva";
import { useEffect, useRef } from "react";
import { Circle } from "react-konva";

export default function Snowflake() {
  const snowflakeRef = useRef<Konva.Circle>(null);

  // Store random values in refs so they persist across re-renders
  const speedRef = useRef(Math.random() * 3 + 1);
  const radiusRef = useRef(Math.random() * 3 + 1);
  const opacityRef = useRef(Math.random() * 0.8 + 0.2);
  const startXRef = useRef(Math.random() * (getDocumentWidth() ?? 0));
  const startYRef = useRef(Math.random() * (getDocumentHeight() ?? 0));

  useEffect(() => {
    const snowflake = snowflakeRef.current;
    if (!snowflake) return;

    const animation = new Konva.Animation((frame) => {
      const timeDiff = frame?.timeDiff ?? 0;
      const currentY = snowflake.y();
      const dist = (timeDiff / 10) * speedRef.current;

      let newY = currentY + dist;

      // Check if snowflake is out of view
      const height = getDocumentHeight() ?? 0;

      if (newY > height) {
        newY = -radiusRef.current; // Reset to top
        snowflake.x(Math.random() * (getDocumentWidth() ?? 0)); // Randomize X
      }

      snowflake.y(newY);
    }, snowflake.getLayer());

    animation.start();

    return () => {
      animation.stop();
    }
  }, []);

  return (
    <Circle ref={snowflakeRef}
      radius={radiusRef.current}
      fill="white"
      opacity={opacityRef.current}
      x={startXRef.current}
      y={startYRef.current}
    />
  )
}