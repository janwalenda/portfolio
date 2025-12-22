"use client";
import { SeasonEvent } from "@/sanity.types";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { useMessageDisplayedStore } from "@/store/messageDisplayed";
import { Snowflake } from "../lib/Snowflake";

export default function WinterOverlay({ seasonEvent }: { seasonEvent?: SeasonEvent }) {
  const [isMounted, setIsMounted] = useState(false);
  const { messageDisplayed, setMessageDisplayed } = useMessageDisplayedStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();


    // Schneeflocken erstellen
    const snowflakes: Snowflake[] = [];

    for (let i = 0; i < 150; i++) {
      snowflakes.push(new Snowflake(canvas, ctx));
    }

    // Animationsschleife
    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach(snowflake => {
        snowflake.fall();
        snowflake.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" />
      <Modal backdrop open={!messageDisplayed} onClose={() => setMessageDisplayed(true)}>
        <form method="dialog" className="flex items-center justify-end">
          <Button type="submit" size={"sm"}>
            <Icon icon="mdi:close" />
          </Button>
        </form>
        <h3>{seasonEvent?.title}</h3>
        <p>{seasonEvent?.message}</p>
      </Modal>
    </>
  )
}