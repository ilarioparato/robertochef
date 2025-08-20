import React, { useState, useRef } from "react"

type AsTag = "div" | "button" | "a"

export type GlassCardProps = {
  as?: AsTag
  className?: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler
  children?: React.ReactNode
}

export default function GlassCard({
  as = "div",
  className = "",
  style,
  onClick,
  children
}: GlassCardProps) {
  const [pressed, setPressed] = useState(false)
  const animating = useRef(false)

  const BaseTag = as

  const baseStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: 32,
    boxShadow:
      "3px 3px 20px 1px rgba(79, 76, 76, 0.1), inset 1px 1px 5px -1px rgba(255,255,255,0.5)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "white",
    transform: pressed ? "scale(1.05)" : "scale(1)",
    transition: "transform 150ms ease-in-out",
    ...style
  }

  const handleClick: React.MouseEventHandler = e => {
    if (animating.current) return
    animating.current = true
    setPressed(true)
    setTimeout(() => {
      setPressed(false)
      animating.current = false
    }, 150)
    onClick?.(e)
  }

  return (
    <BaseTag
      style={baseStyle}
      className={`select-none rounded-[32px] overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
    </BaseTag>
  )
}