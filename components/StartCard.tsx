"use client";
import { useRef } from "react";

export function StartCard() {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={ref}
            className="
        text-center
        mb-12
        h-screen
        flex
        flex-col
        items-center
        justify-center
        snap-center
      ">
            <h2 className="text-4xl font-bold mb-4">
                <span>Skills</span> & <span>Technologies</span>
            </h2>
            <p className="text-lg text-base-content/70">
                Tools and frameworks I work with
            </p>
        </div>
    );
}
