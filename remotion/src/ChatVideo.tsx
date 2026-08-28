import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AppShell } from "./components/AppShell";
import {
  Bubbles,
  Connecting,
  InputBar,
  MessageArea,
  Msg,
  Suggested,
  TypingBubble,
} from "./components/ChatBody";
import { C } from "./theme";

const AGENT = "Vani";

const MSGS: Msg[] = [
  {
    from: "agent",
    at: 130,
    text: "Hi! I'm Vani, your customer support assistant. Ask me anything about your order, delivery or returns.",
  },
  {
    from: "user",
    at: 330,
    text: "My order #48219 has not arrived yet. Can you check the status?",
  },
  {
    from: "agent",
    at: 400,
    text: "I've checked it - your parcel is out for delivery and will reach you by 7 PM today.",
  },
  {
    from: "user",
    at: 570,
    text: "Can you send me the tracking link as well?",
  },
  {
    from: "agent",
    at: 640,
    text: "Done. I've sent the tracking link to your registered email and phone number.",
  },
  { from: "user", at: 770, text: "Thank you" },
  {
    from: "agent",
    at: 840,
    text: "Happy to help! Have a great day.",
  },
];

const TYPING: { start: number; end: number; text: string }[] = [
  { start: 210, end: 325, text: MSGS[1].text },
  { start: 460, end: 565, text: MSGS[3].text },
  { start: 700, end: 765, text: "Thank you" },
];

const DOTS = [
  { at: 360, until: 400 },
  { at: 600, until: 640 },
  { at: 800, until: 840 },
];

export const ChatVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  const typing = TYPING.find((t) => frame >= t.start && frame < t.end);
  const typed = typing
    ? typing.text.slice(
        0,
        Math.round(
          interpolate(
            frame,
            [typing.start, typing.end - 8],
            [0, typing.text.length],
            { extrapolateRight: "clamp" },
          ),
        ),
      )
    : "";

  const showDots = DOTS.some((d) => frame >= d.at && frame < d.until);
  const suggestedOpacity = interpolate(frame, [140, 165, 320, 340], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C.page, opacity: fadeIn }}>
      <AppShell agent={AGENT}>
        <MessageArea>
          {frame < 130 ? (
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
    </AbsoluteFill>
  );
};
