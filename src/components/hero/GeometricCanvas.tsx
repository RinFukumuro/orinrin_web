"use client";

import { useEffect, useRef } from "react";

interface Leaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: "leaf" | "petal" | "dot";
  color: string;
  wobblePhase: number;
  wobbleSpeed: number;
}

interface WindLine {
  x: number;
  y: number;
  length: number;
  opacity: number;
  speed: number;
  yOffset: number;
}

export default function GeometricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let leaves: Leaf[] = [];
    let windLines: WindLine[] = [];
    let time = 0;

    // Wind state: starts calm, then bursts
    const CALM_DURATION = 90; // ~1.5s at 60fps
    const BURST_START = 90;
    const BURST_PEAK = 150;
    const SUSTAINED = 240;
    let windStrength = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const isMobile = window.innerWidth < 768;
    const leafCount = isMobile ? 35 : 70;
    const windLineCount = isMobile ? 8 : 18;

    const greens = [
      "rgba(16, 185, 129,",  // emerald-500
      "rgba(5, 150, 105,",   // emerald-600
      "rgba(4, 120, 87,",    // emerald-700
      "rgba(52, 211, 153,",  // emerald-400
      "rgba(110, 231, 183,", // emerald-300
      "rgba(34, 120, 60,",   // forest green
      "rgba(85, 166, 48,",   // leaf green
    ];

    const createLeaf = (scattered: boolean): Leaf => {
      const types: Leaf["type"][] = ["leaf", "leaf", "petal", "dot", "dot"];
      return {
        x: scattered
          ? Math.random() * canvas.width
          : canvas.width * 0.3 + Math.random() * canvas.width * 0.4,
        y: scattered
          ? Math.random() * canvas.height
          : canvas.height + Math.random() * 100,
        vx: 0,
        vy: 0,
        size: Math.random() * 10 + 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0,
        type: types[Math.floor(Math.random() * types.length)],
        color: greens[Math.floor(Math.random() * greens.length)],
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.04 + 0.02,
      };
    };

    const createWindLine = (): WindLine => ({
      x: -200 - Math.random() * 400,
      y: Math.random() * canvas.height,
      length: Math.random() * 120 + 60,
      opacity: 0,
      speed: Math.random() * 6 + 4,
      yOffset: (Math.random() - 0.5) * 0.8,
    });

    const drawLeaf = (l: Leaf) => {
      if (l.opacity < 0.01) return;
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rotation);
      ctx.globalAlpha = l.opacity;

      if (l.type === "leaf") {
        // Organic leaf shape
        ctx.beginPath();
        ctx.moveTo(0, -l.size);
        ctx.bezierCurveTo(
          l.size * 0.8, -l.size * 0.5,
          l.size * 0.6, l.size * 0.5,
          0, l.size
        );
        ctx.bezierCurveTo(
          -l.size * 0.6, l.size * 0.5,
          -l.size * 0.8, -l.size * 0.5,
          0, -l.size
        );
        ctx.fillStyle = `${l.color} ${l.opacity})`;
        ctx.fill();
        // Leaf vein
        ctx.beginPath();
        ctx.moveTo(0, -l.size * 0.8);
        ctx.lineTo(0, l.size * 0.8);
        ctx.strokeStyle = `${l.color} ${l.opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      } else if (l.type === "petal") {
        // Small rounded petal
        ctx.beginPath();
        ctx.ellipse(0, 0, l.size * 0.4, l.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${l.color} ${l.opacity * 0.7})`;
        ctx.fill();
      } else {
        // Tiny dot / spore
        ctx.beginPath();
        ctx.arc(0, 0, l.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `${l.color} ${l.opacity * 0.6})`;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawWindLine = (w: WindLine) => {
      if (w.opacity < 0.01) return;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(w.x, w.y);
      // Slight curve for organic feel
      ctx.quadraticCurveTo(
        w.x + w.length * 0.5,
        w.y + w.yOffset * 20,
        w.x + w.length,
        w.y + w.yOffset * 10
      );
      ctx.strokeStyle = `rgba(167, 243, 208, ${w.opacity * 0.25})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate wind strength over time
      if (time < CALM_DURATION) {
        // Calm phase - near stillness
        windStrength = Math.sin(time * 0.02) * 0.02;
      } else if (time < BURST_PEAK) {
        // Burst phase - wind rushes in with easing
        const t = (time - BURST_START) / (BURST_PEAK - BURST_START);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        windStrength = eased * 1.0;
      } else if (time < SUSTAINED) {
        // Settling into sustained breeze
        const t = (time - BURST_PEAK) / (SUSTAINED - BURST_PEAK);
        windStrength = 1.0 - t * 0.6; // settle to 0.4
      } else {
        // Gentle ongoing breeze with subtle gusts
        windStrength = 0.4 + Math.sin(time * 0.008) * 0.15 + Math.sin(time * 0.023) * 0.08;
      }

      // Update and draw wind lines
      for (const w of windLines) {
        if (time > CALM_DURATION) {
          w.x += w.speed * windStrength;
          w.y += w.yOffset * windStrength;
          w.opacity = Math.min(windStrength * 0.8, 0.6);

          if (w.x > canvas.width + 200) {
            w.x = -200 - Math.random() * 300;
            w.y = Math.random() * canvas.height;
          }
        }
        drawWindLine(w);
      }

      // Update and draw leaves
      for (const l of leaves) {
        // Fade in leaves
        if (time < CALM_DURATION) {
          // During calm: very subtle presence
          l.opacity = Math.min(l.opacity + 0.003, 0.15);
        } else {
          // After wind: full opacity
          const targetOpacity =
            l.type === "dot" ? 0.4 : l.type === "petal" ? 0.5 : 0.6;
          l.opacity += (targetOpacity - l.opacity) * 0.03;
        }

        // Wind force
        const windForceX = windStrength * (2.5 + Math.sin(l.wobblePhase) * 0.8);
        const windForceY = windStrength * (-1.2 + Math.cos(l.wobblePhase * 0.7) * 0.5);

        l.vx += windForceX * 0.04;
        l.vy += windForceY * 0.04;

        // Gravity (very slight)
        l.vy += 0.01;

        // Wobble
        l.wobblePhase += l.wobbleSpeed;
        l.vx += Math.sin(l.wobblePhase) * 0.05 * windStrength;
        l.vy += Math.cos(l.wobblePhase * 1.3) * 0.03 * windStrength;

        // Damping
        l.vx *= 0.97;
        l.vy *= 0.97;

        l.x += l.vx;
        l.y += l.vy;
        l.rotation += l.rotationSpeed * (1 + windStrength * 3);

        // Wrap around
        if (l.x > canvas.width + 50) {
          l.x = -50;
          l.y = Math.random() * canvas.height;
        }
        if (l.x < -50) l.x = canvas.width + 50;
        if (l.y < -50) l.y = canvas.height + 50;
        if (l.y > canvas.height + 50) {
          l.y = -50;
          l.x = Math.random() * canvas.width;
        }

        drawLeaf(l);
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    leaves = Array.from({ length: leafCount }, (_, i) =>
      createLeaf(i < leafCount * 0.6)
    );
    windLines = Array.from({ length: windLineCount }, createWindLine);

    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
