import React from "react";

type LogoProps = {
  className?: string;
};

const Logo = ({ className = "h-8 w-8" }: LogoProps) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    role="img"
    aria-label="CinemaVoyager logo"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="22" fill="#2563eb" />
    <ellipse
      cx="24"
      cy="24"
      rx="9"
      ry="22"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      opacity="0.75"
    />
    <line
      x1="2"
      y1="24"
      x2="46"
      y2="24"
      stroke="white"
      strokeWidth="1.5"
      opacity="0.75"
    />
    <path
      d="M8 14 Q24 21 40 14"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      opacity="0.75"
    />
    <path
      d="M8 34 Q24 27 40 34"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      opacity="0.75"
    />
    <polygon points="20,17 20,31 32,24" fill="white" />
  </svg>
);

export default Logo;
