import React from "react";
import { C } from "../theme";
import { Avatar } from "./Avatar";

export type Msg = {
  from: "agent" | "user";
  text: string;
  at: number; // frame it appears
};

const Bubble: React.FC<{ m: Msg; agent: string; appear: number }> = ({
  m,
  agent,
  appear,
}) => {
  const isAgent = m.from === "agent";
  return (
    <div
      style={{
        opacity: appear,
        transform: `translateY(${(1 - appear) * 10}px)`,
        marginBottom: 20,
      }}
    >
      {isAgent && (
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: "#8f8f8a",
            marginBottom: 8,
          }}
        >
          {agent}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: isAgent ? "flex-start" : "flex-end",
        }}
      >
        <div
          style={{
            maxWidth: 640,
            background: isAgent ? C.bubbleAgent : C.bubbleUser,
            borderRadius: 12,
            padding: "16px 20px",
            fontSize: 15,
            lineHeight: 1.5,
            color: "#26262b",
          }}
        >
          {m.text}
          {!isAgent && (
            <div
              style={{
                fontSize: 11.5,
                color: "#96968f",
                textAlign: "right",
                marginTop: 10,
              }}
            >
              6:06 AM
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const TypingBubble: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 20,
    }}
  >
    <Avatar size={30} radius={10} />
    <div
      style={{
        background: C.bubbleAgent,
        borderRadius: 14,
        padding: "12px 16px",
        display: "flex",
        gap: 5,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: 6,
            background: "#a5a5a0",
            display: "block",
          }}
        />
      ))}
    </div>
  </div>
);

export const MessageArea: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <div
    style={{
      flex: 1,
      minHeight: 0,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "22px 24px 4px 24px",
    }}
  >
    {children}
  </div>
);

export const Bubbles: React.FC<{
  msgs: Msg[];
  frame: number;
  agent: string;
}> = ({ msgs, frame, agent }) => (
  <>
    {msgs
      .filter((m) => frame >= m.at)
      .map((m, i) => (
        <Bubble
          key={i}
          m={m}
          agent={agent}
          appear={Math.min(1, (frame - m.at) / 8)}
        />
      ))}
  </>
);

export const Suggested: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div style={{ opacity, marginBottom: 14 }}>
    <div
      style={{
        fontSize: 11.5,
        letterSpacing: 1.2,
        fontWeight: 700,
        color: "#a3a39d",
        margin: "10px 0 14px 0",
      }}
    >
      SUGGESTED QUESTIONS
    </div>
    {["How do I track my order?", "How do returns work?"].map((q) => (
      <div
        key={q}
        style={{
          background: "#fff",
          border: `1px solid ${C.border}`,
          borderRadius: 24,
          padding: "15px 22px",
          fontSize: 14.5,
          color: "#2b2b30",
          marginBottom: 12,
        }}
      >
        {q}
      </div>
    ))}
  </div>
);

export const InputBar: React.FC<{ value: string }> = ({ value }) => {
  const active = value.length > 0;
  return (
    <div
      style={{
        borderTop: `1px solid #e8e7e0`,
        padding: "18px 24px",
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: C.panel,
      }}
    >
      <div
        style={{
          flex: 1,
          background: C.input,
          borderRadius: 24,
          padding: "14px 22px",
          fontSize: 15,
          color: active ? "#26262b" : "#8f8f8a",
        }}
      >
        {active ? value : "Type a message..."}
      </div>
      <div
        style={{
          background: active ? "#0b1120" : "#a9a9a3",
          color: "#fff",
          borderRadius: 24,
          padding: "14px 34px",
          fontSize: 15,
          fontWeight: 700,
        }}
      >
        Send
      </div>
    </div>
  );
};

export const Connecting: React.FC<{ agent: string; spin: number }> = ({
  agent,
  spin,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${spin}deg)` }}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="#d6d6d0"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M12 3a9 9 0 019 9"
        stroke="#9a9a94"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
    <span style={{ fontSize: 15, fontWeight: 700, color: "#8f8f8a" }}>
      Connecting to {agent}...
    </span>
  </div>
);
