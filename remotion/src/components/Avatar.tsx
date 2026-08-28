import React from "react";

export const Avatar: React.FC<{ size: number; radius?: number }> = ({
  size,
  radius,
}) => {
  const inner = size * 0.5;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius ?? size * 0.28,
        background: "linear-gradient(160deg,#1b2140 0%,#0d1226 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={inner} height={inner} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2.6 20.4 7v10L12 21.4 3.6 17V7L12 2.6Z"
          stroke="#ffffff"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <path
          d="M3.6 7 12 11.6 20.4 7M12 11.6v9.8"
          stroke="#ffffff"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
