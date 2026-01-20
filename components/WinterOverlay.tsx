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
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();


    // Schneeflocken erstellen
    const snowflakes: Snowflake[] = [];

    for (let i = 0; i < 80; i++) {
      snowflakes.push(new Snowflake(canvas, ctx));
    }

    // Animationsschleife
    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

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
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-10" />
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