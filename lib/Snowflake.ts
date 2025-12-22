"use client";
// Schneeflocken-Klasse
export class Snowflake {
    x: number;
    y: number;
    radius: number;
    speed: number;
    opacity: number;
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;

    constructor(canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * (this.canvas?.width ?? 0);
        this.y = Math.random() * (this.canvas?.height ?? 0);
        this.radius = Math.random() * 3 + 1;
        this.speed = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
    }

    fall() {
        this.y += this.speed;
        if (this.y > (this.canvas?.height ?? 0)) {
            this.y = -this.radius;
            this.x = Math.random() * (this.canvas?.width ?? 0);
        }
    }

    draw() {
        if (!this.ctx) return;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        this.ctx.fill();
    }
}
