"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { portfolioData } from "@/app/data/portfolioData";

interface PhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  vrZ: number;
  isDragging: boolean;
  startX: number;
  startY: number;
  lastMouseX: number;
  lastMouseY: number;
  isFlipped: boolean;
}

export default function LanyardBadge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dpImages =
    portfolioData.profile.dpImages && portfolioData.profile.dpImages.length > 0
      ? portfolioData.profile.dpImages
      : [portfolioData.profile.avatar || "/images/DP/DP1.jpeg"];

  const [dpIndex, setDpIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDpIndex((prev) => (prev + 1) % dpImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [dpImages.length]);

  const physics = useRef<PhysicsState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    vrZ: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    isFlipped: false
  });

  const anchorPoint = { x: 80, y: 0 };
  const cardOrigin = { x: 80, y: 75 }; // where cord meets clasp

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cord drawing on canvas
  const drawCord = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const p = physics.current;
    const endX = cardOrigin.x + p.x;
    const endY = cardOrigin.y + p.y;

    // Draw realistic braided lanyard strap
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(anchorPoint.x, anchorPoint.y);

    // Natural catenary curve
    const cpX = (anchorPoint.x + endX) / 2 + p.x * 0.2;
    const cpY = (anchorPoint.y + endY) / 2 + 5;
    ctx.quadraticCurveTo(cpX, cpY, endX, endY);

    // Cord shadow
    ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Cord main body
    ctx.beginPath();
    ctx.moveTo(anchorPoint.x, anchorPoint.y);
    ctx.quadraticCurveTo(cpX, cpY, endX, endY);
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Subtle metallic clasp at end
    ctx.beginPath();
    ctx.arc(endX, endY, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#94a3b8";
    ctx.fill();
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }, []);

  // Physics loop (pendulum & spring)
  useEffect(() => {
    if (!mounted) return;

    let animId: number;

    const updatePhysics = () => {
      const p = physics.current;
      const card = cardRef.current;

      if (!p.isDragging) {
        // Restoring spring force towards origin
        const k = 0.045; // spring constant
        const damping = 0.91; // damping

        const ax = -k * p.x;
        const ay = -k * p.y;

        p.vx = (p.vx + ax) * damping;
        p.vy = (p.vy + ay) * damping;

        p.x += p.vx;
        p.y += p.vy;

        // Angle tilt proportional to horizontal offset
        const targetRotZ = (p.x / 80) * 22;
        p.rotationZ += (targetRotZ - p.rotationZ) * 0.12;

        const targetRotY = (p.x / 80) * 18 + (p.isFlipped ? 180 : 0);
        p.rotationY += (targetRotY - p.rotationY) * 0.14;

        const targetRotX = -(p.y / 60) * 15;
        p.rotationX += (targetRotX - p.rotationX) * 0.12;
      }

      // Apply transform to DOM element
      if (card) {
        const transX = p.x;
        const transY = p.y;
        const rotX = p.rotationX;
        const rotY = p.rotationY;
        const rotZ = p.rotationZ;

        card.style.transform = `translate3d(${transX}px, ${transY}px, 0px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
      }

      drawCord();
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [mounted, drawCord]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const p = physics.current;
    p.isDragging = true;
    p.startX = e.clientX;
    p.startY = e.clientY;
    p.lastMouseX = e.clientX;
    p.lastMouseY = e.clientY;
    p.vx = 0;
    p.vy = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const p = physics.current;
    if (!p.isDragging) return;

    const dx = e.clientX - p.lastMouseX;
    const dy = e.clientY - p.lastMouseY;

    // Direct drag with bounded displacement
    p.x = Math.max(-65, Math.min(65, p.x + dx));
    p.y = Math.max(-20, Math.min(75, p.y + dy));

    p.vx = dx * 1.2;
    p.vy = dy * 1.2;

    p.rotationZ = (p.x / 65) * 25;
    p.rotationY = (p.x / 65) * 28 + (p.isFlipped ? 180 : 0);
    p.rotationX = -(p.y / 65) * 18;

    p.lastMouseX = e.clientX;
    p.lastMouseY = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const p = physics.current;
    p.isDragging = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !flipped;
    setFlipped(next);
    physics.current.isFlipped = next;
    // Add small energetic jolt
    physics.current.vx += next ? 12 : -12;
  };

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 right-2 sm:right-[4vw] md:right-[2.5vw] lg:right-[4.5vw] z-[999] pointer-events-none w-[160px] h-[280px] select-none"
      style={{ perspective: 900 }}
    >
      {/* Dynamic braided canvas lanyard cord */}
      <canvas
        ref={canvasRef}
        width={160}
        height={100}
        className="absolute top-0 left-0 w-full h-[100px] pointer-events-none"
      />

      {/* 3D Hanging Badge Container */}
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="pointer-events-auto absolute top-[72px] left-[15px] w-[130px] h-[190px] cursor-grab active:cursor-grabbing touch-none transition-shadow will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "top center"
        }}
        title="Drag me or click to flip!"
      >
        {/* Metal eyelet / slot at the top of the ID card */}
        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-8 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700 border border-neutral-400 dark:border-neutral-600 flex items-center justify-center shadow-inner z-20">
          <div className="w-4 h-1.5 rounded-full bg-black/40"></div>
        </div>

        {/* Card Body - Front Side */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 shadow-xl backdrop-blur-md p-2.5 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2), 0 0 1px 1px rgba(255,255,255,0.4) inset"
          }}
        >
          {/* Holographic light sheen reflection */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-cyan-400/10 opacity-70"></div>

          {/* Top header with chip & branding */}
          <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/80 pb-1.5">
            <div className="flex items-center gap-1.5">
              <img
                src="/icons/logo.jpeg"
                alt="Logo"
                className="w-3.5 h-3.5 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
              />
              <span className="text-[9px] font-mono font-bold tracking-tight text-neutral-600 dark:text-neutral-400">
                PK-DEV
              </span>
            </div>
            <div className="w-4 h-3 rounded bg-amber-400/80 border border-amber-600/40 shadow-xs flex items-center justify-center">
              <div className="w-2 h-1.5 border-t border-b border-amber-800/40"></div>
            </div>
          </div>

          {/* Photo & Name */}
          <div className="flex flex-col items-center text-center my-1">
            <div className="relative w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 shadow-md">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                {dpImages.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Priyanshu K. Photo ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover object-[center_25%] transition-opacity duration-700 ${
                      idx === dpIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  />
                ))}
              </div>
            </div>
            <h4 className="mt-1.5 text-[11px] font-bold text-neutral-900 dark:text-white leading-tight">
              Priyanshu K.
            </h4>
            <p className="text-[8.5px] font-mono text-neutral-500 dark:text-neutral-400">
              Full-Stack Eng
            </p>
          </div>

          {/* Mini Barcode & Flip button */}
          <div className="pt-1.5 border-t border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-between">
            <div className="flex items-center gap-[1.5px] h-3.5 opacity-70">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2].map((w, i) => (
                <div
                  key={i}
                  className="h-full bg-neutral-900 dark:bg-neutral-200"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>
            <button
              onClick={toggleFlip}
              className="px-1.5 py-0.5 rounded text-[8px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors"
            >
              Flip ↻
            </button>
          </div>
        </div>

        {/* Card Body - Back Side */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-950 text-white shadow-xl p-2.5 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)"
          }}
        >
          {/* Magnetic Stripe */}
          <div className="absolute top-3 left-0 right-0 h-4 bg-neutral-800 border-y border-neutral-700/50"></div>

          <div className="mt-6 flex flex-col gap-1">
            <span className="text-[8px] font-mono text-neutral-400">CREDENTIALS</span>
            <div className="text-[9px] font-mono leading-tight text-neutral-200">
              <div>DSA: 700+ Solved</div>
              <div>Stack: MERN &amp; Next</div>
              <div>Bhopal, India</div>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-1.5 flex items-center justify-between">
            <span className="text-[7.5px] font-mono text-cyan-400">VERIFIED ID</span>
            <button
              onClick={toggleFlip}
              className="px-1.5 py-0.5 rounded text-[8px] font-mono font-medium bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
            >
              Front ↺
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
