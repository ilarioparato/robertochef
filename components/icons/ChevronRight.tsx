// components/icons/ChevronRight.tsx
import React from "react";

type ChevronRightProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function ChevronRight({
  size = 24,
  color = "currentColor",
  className = "",
}: ChevronRightProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}