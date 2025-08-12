import React, { useState, useRef } from 'react'

export type GlassCardProps = React.PropsWithChildren<{
  className?: string
  style?: React.CSSProperties
  as?: 'div' | 'button' | 'a'
  onClick?: React.MouseEventHandler
}>

export default function GlassCard({ children, className = '', style, as = 'div', ...rest }: GlassCardProps) {
  const [isClicked, setIsClicked] = useState(false)
  const isAnimating = useRef(false)
  const Tag: any = as

  const baseStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.07)',
    borderRadius: 32,
    boxShadow: '3px 3px 35px 16px rgba(79,76,76,0.24), inset 1px 1px 5px -1px rgba(255,255,255,0.5)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.06)',
    color: 'white',
    transform: isClicked ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 150ms ease-in-out',
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isAnimating.current) return // blocca nuovi click se animazione in corso

    isAnimating.current = true
    setIsClicked(true)

    setTimeout(() => {
      setIsClicked(false)
      isAnimating.current = false
    }, 150)

    if (rest.onClick) rest.onClick(e)
  }

  return (
    <Tag
      style={{ ...baseStyle, ...style }}
      className={`select-none rounded-[32px] overflow-hidden ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Tag>
  )
}