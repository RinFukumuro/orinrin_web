"use client";

export function MeshGradientBg({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <div className="orb orb-blue w-[500px] h-[500px] -top-[200px] -left-[100px] animate-float-slow" />
      <div className="orb orb-purple w-[400px] h-[400px] top-[30%] -right-[100px] animate-float" />
      <div className="orb orb-cyan w-[350px] h-[350px] bottom-[10%] left-[20%] animate-float-slow" />
    </div>
  );
}

export function GlowOrb({
  className = "",
  color = "blue",
  size = 300,
}: {
  className?: string;
  color?: "blue" | "purple" | "cyan";
  size?: number;
}) {
  return (
    <div
      className={`orb orb-${color} animate-pulse-glow ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}

export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

export function GradientDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-px ${className}`}
      style={{
        background: "linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.3), rgba(168, 85, 247, 0.3), transparent)",
      }}
      aria-hidden="true"
    />
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-3 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
      {children}
    </p>
  );
}
