import React from "react";
import { Img, staticFile } from "remotion";

export const Avatar: React.FC<{ size: number; radius?: number }> = ({
  size,
  radius,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius ?? size * 0.28,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <Img
      src={staticFile("logo.png")}
      style={{ width: size, height: size, objectFit: "cover", display: "block" }}
    />
  </div>
);
