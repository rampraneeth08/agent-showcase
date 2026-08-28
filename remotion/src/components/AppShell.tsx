import React from "react";
import { AGENTS, C, FONT } from "../theme";
import { Avatar } from "./Avatar";

export const Dot: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 7,
}) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: size,
      background: color,
      display: "inline-block",
    }}
  />
);

const Sidebar: React.FC = () => (
  <div
    style={{
      width: 338,
      borderRight: `1px solid ${C.border}`,
      padding: "34px 24px 0 24px",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        fontSize: 11,
        letterSpacing: 1.4,
        fontWeight: 700,
        color: C.muted,
        marginBottom: 22,
      }}
    >
      AI EMPLOYEES
    </div>
    {AGENTS.map((a, i) => (
      <div
        key={a.name}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: i === 0 ? "11px 14px" : "11px 14px",
          margin: i === 0 ? "0 -6px 16px -6px" : "0 -6px 17px -6px",
          border:
            i === 0 ? `1.6px solid ${C.ink}` : "1.6px solid transparent",
          borderRadius: 12,
        }}
      >
        <Avatar size={40} />
        <div>
          <div style={{ fontSize: 15.5, fontWeight: 700, color: C.ink }}>
            {a.name}
          </div>
          <div style={{ fontSize: 13, color: "#8b8b86", marginTop: 3 }}>
            {a.role}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const AppShell: React.FC<{
  agent: string;
  children: React.ReactNode;
  blur?: number;
}> = ({ agent, children, blur = 0 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: C.page,
      fontFamily: FONT,
      filter: blur ? `blur(${blur}px)` : undefined,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 18,
        top: 32,
        width: 1244,
        height: 724,
        background: C.window,
        borderRadius: 18,
        boxShadow: "0 24px 60px rgba(20,20,15,0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* browser chrome */}
      <div
        style={{
          height: 65,
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 11, paddingLeft: 24 }}>
          <Dot color="#ff5f57" size={11} />
          <Dot color="#febc2e" size={11} />
          <Dot color="#28c840" size={11} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 442,
            width: 418,
            height: 34,
            borderRadius: 17,
            background: C.urlPill,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            fontSize: 13,
            color: "#5b5b57",
          }}
        >
          <svg width="11" height="13" viewBox="0 0 24 24" fill="none">
            <rect
              x="5"
              y="11"
              width="14"
              height="10"
              rx="2"
              stroke="#7a7a76"
              strokeWidth="2"
            />
            <path
              d="M8 11V8a4 4 0 018 0v3"
              stroke="#7a7a76"
              strokeWidth="2"
            />
          </svg>
          kaligan-website.com
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar />
        {/* main panel */}
        <div style={{ flex: 1, padding: "20px 22px 20px 22px", minWidth: 0 }}>
          <div
            style={{
              height: "100%",
              background: C.panel,
              borderRadius: 14,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "20px 24px",
              }}
            >
              <Avatar size={46} radius={14} />
              <div>
                <div style={{ fontSize: 23, fontWeight: 700, color: C.ink }}>
                  {agent}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: C.green,
                    marginTop: 4,
                  }}
                >
                  <Dot color={C.green} size={7} />
                  Online
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  padding: "9px 20px",
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: C.ink,
                }}
              >
                Scan
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0 24px 14px 24px",
                borderBottom: `1px solid #e8e7e0`,
              }}
            >
              <Dot color={C.green} size={7} />
              <span style={{ fontSize: 14, color: "#6f6f6a" }}>Active:</span>
              <span style={{ fontSize: 14.5, fontWeight: 700, color: C.ink }}>
                Sales &amp; Growth
              </span>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  background: "#0b1120",
                  color: "#fff",
                  borderRadius: 18,
                  padding: "9px 22px",
                  fontSize: 13.5,
                  fontWeight: 700,
                }}
              >
                Call
              </div>
              <div
                style={{
                  color: "#6f6f6a",
                  fontSize: 13.5,
                  fontWeight: 600,
                  padding: "9px 8px",
                }}
              >
                Reset
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);
