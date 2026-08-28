import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AppShell, Dot } from "./components/AppShell";
import { Avatar } from "./components/Avatar";
import {
  Bubbles,
  Connecting,
  InputBar,
  MessageArea,
  Msg,
  Suggested,
  TypingBubble,
} from "./components/ChatBody";
import { C, FONT } from "./theme";

const AGENT = "Vani";
const CALL_AT = 430;
const CARD_AT = 520;

const MSGS: Msg[] = [
  {
    from: "agent",
    at: 110,
    text: "Hi! I'm Vani, your customer support assistant. Ask me anything about plans, billing or your account.",
  },
  {
    from: "user",
    at: 300,
    text: "I'd like to change my subscription plan. Can you call me?",
  },
  {
    from: "agent",
    at: 375,
    text: "Of course - I'm calling you right now.",
  },
];

const TYPE = { start: 190, end: 295, text: MSGS[1].text };

type Line = { who: string; text: string; start: number; dur: number };

const LINES: Line[] = [
  {
    who: "Customer",
    text: "Hi, can I change my subscription plan?",
    start: 545,
    dur: 45,
  },
  {
    who: AGENT,
    text: "Of course. You can switch your plan anytime. Would you like to upgrade to the Pro plan?",
    start: 615,
    dur: 80,
  },
  {
    who: "Customer",
    text: "Yes, please. What will I get with the Pro plan?",
    start: 715,
    dur: 55,
  },
  {
    who: AGENT,
    text: "The Pro plan gives you access to additional features and higher usage limits. I can upgrade your account right away.",
    start: 790,
    dur: 90,
  },
  {
    who: "Customer",
    text: "Will I be charged immediately?",
    start: 900,
    dur: 40,
  },
  {
    who: AGENT,
    text: "Yes. You'll only be charged the prorated difference for the remainder of your current billing cycle.",
    start: 960,
    dur: 85,
  },
  {
    who: "Customer",
    text: "Okay, go ahead and upgrade me.",
    start: 1065,
    dur: 45,
  },
  {
    who: AGENT,
    text: "Done. Your plan has been upgraded to Pro, and the new features are available now.",
    start: 1130,
    dur: 85,
  },
  { who: "Customer", text: "Thank you!", start: 1235, dur: 30 },
  { who: AGENT, text: "You're welcome!", start: 1285, dur: 35 },
];


const CallPill: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: "absolute",
      top: 34,
      left: "50%",
      transform: "translateX(-50%)",
      opacity,
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "#fff",
      borderRadius: 30,
      padding: "9px 14px 9px 9px",
      boxShadow: "0 14px 34px rgba(20,20,15,0.14)",
      fontFamily: FONT,
    }}
  >
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 23,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 0 1px #ececea inset",
        flexShrink: 0,
      }}
    >
      <Avatar size={38} radius={13} />
    </div>
    <div style={{ lineHeight: 1.35 }}>
      <div style={{ fontSize: 14.5, fontWeight: 700, color: C.ink }}>
        {AGENT}
      </div>
      <div style={{ fontSize: 12.5, color: "#7d7d78" }}>+91 98765 43210</div>
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13.5,
        fontWeight: 700,
        color: "#3a3a3a",
        marginLeft: 8,
      }}
    >
      <Dot color="#6f6f6a" size={7} />
      Connected
    </div>
    <div
      style={{
        background: "#f2f1ec",
        borderRadius: 18,
        padding: "9px 20px",
        fontSize: 13.5,
        fontWeight: 700,
        color: C.ink,
      }}
    >
      End
    </div>
  </div>
);

const LiveCard: React.FC<{ frame: number; opacity: number }> = ({
  frame,
  opacity,
}) => {
  const visible = LINES.filter((l) => frame >= l.start);
  return (
    <div
      style={{
        position: "absolute",
        left: 320,
        top: 108,
        width: 640,
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 26px 60px rgba(20,20,15,0.16)",
        padding: "26px 28px 24px 28px",
        opacity,
        fontFamily: FONT,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 19, fontWeight: 700, color: C.ink }}>
          {AGENT} - Live Call
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "#eeede8",
            borderRadius: 14,
            padding: "5px 12px",
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: 0.8,
            color: "#3a3a3a",
          }}
        >
          <Dot color="#6f6f6a" size={6} />
          LIVE
        </div>
      </div>
      <div
        style={{
          marginTop: 22,
          maxHeight: 320,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {visible.map((l, i) => {
          const shown = l.text.slice(
            0,
            Math.round(
              interpolate(frame, [l.start, l.start + l.dur], [0, l.text.length], {
                extrapolateRight: "clamp",
              }),
            ),
          );
          return (
            <div key={i} style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#33333a",
                  marginBottom: 6,
                }}
              >
                {l.who}
              </div>
              <div
                style={{ fontSize: 15, lineHeight: 1.5, color: "#26262b" }}
              >
                {shown}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const VoiceVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const blur = interpolate(frame, [CALL_AT, CALL_AT + 20], [0, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typed =
    frame >= TYPE.start && frame < TYPE.end
      ? TYPE.text.slice(
          0,
          Math.round(
            interpolate(frame, [TYPE.start, TYPE.end - 8], [0, TYPE.text.length], {
              extrapolateRight: "clamp",
            }),
          ),
        )
      : "";

  const showDots = frame >= 335 && frame < 375;
  const suggestedOpacity = interpolate(
    frame,
    [120, 145, 290, 310],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const connectingOpacity = interpolate(
    frame,
    [CALL_AT, CALL_AT + 12, CARD_AT - 12, CARD_AT],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const callOpacity = interpolate(frame, [CARD_AT, CARD_AT + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C.page, opacity: fadeIn }}>
      <AppShell agent={AGENT} blur={blur}>
        <MessageArea>
          {frame < 110 ? (
            <div style={{ flex: 1, paddingTop: 8 }}>
              <Connecting agent={AGENT} spin={frame * 7} />
            </div>
          ) : null}
          <Bubbles msgs={MSGS} frame={frame} agent={AGENT} />
          {showDots ? <TypingBubble /> : null}
          {suggestedOpacity > 0.01 ? (
            <Suggested opacity={suggestedOpacity} />
          ) : null}
        </MessageArea>
        <InputBar value={typed} />
      </AppShell>

      {connectingOpacity > 0.01 ? (
        <div
          style={{
            position: "absolute",
            top: 52,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            borderRadius: 26,
            padding: "14px 30px",
            boxShadow: "0 14px 34px rgba(20,20,15,0.12)",
            opacity: connectingOpacity,
            fontFamily: FONT,
          }}
        >
          <Connecting agent={AGENT} spin={frame * 7} />
        </div>
      ) : null}

      {callOpacity > 0.01 ? (
        <>
          <LiveCard frame={frame} opacity={callOpacity} />
          <CallPill opacity={callOpacity} />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
