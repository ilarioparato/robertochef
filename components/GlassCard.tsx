import React, { useState } from "react"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  clickableScale?: boolean // se vuoi disattivare l'effetto click
}

export default function GlassCard({
  children,
  className = "",
  style,
  onClick,
  clickableScale = true,
  ...rest
}: GlassCardProps) {
  const [pressed, setPressed] = useState(false)

  const baseStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.07)",
    borderRadius: 32,
    boxShadow:
      "3px 3px 35px 16px rgba(79,76,76,0.24), inset 1px 1px 5px -1px rgba(255,255,255,0.5)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "white",
    transition: "transform 140ms ease",
    transform: pressed && clickableScale ? "scale(1.05)" : "scale(1)",
    ...style
  }

  const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    if (clickableScale) {
      setPressed(true)
      setTimeout(() => setPressed(false), 140)
    }
    onClick?.(e)
  }

  return (
    <div
      style={baseStyle}
      className={`select-none rounded-[32px] overflow-hidden ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </div>
  )
}