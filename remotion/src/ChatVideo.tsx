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
    text: "Hi! I'm Vani, your customer support assistant. Ask me anything about plans, trials or billing.",
  },
  { from: "user", at: 325, text: "Is there a free trial?" },
  {
    from: "agent",
    at: 395,
    text: "Yes, you can try it free for 14 days with no credit card required.",
  },
  { from: "user", at: 575, text: "What happens after the trial ends?" },
  {
    from: "agent",
    at: 645,
    text: "You can choose a subscription plan when your trial ends. There's no automatic charge during the trial.",
  },
  { from: "user", at: 805, text: "Can I cancel anytime?" },
  {
    from: "agent",
    at: 875,
    text: "Yes. You can cancel your subscription anytime, with no lock-in.",
  },
  { from: "user", at: 1045, text: "Do I need to contact support to cancel?" },
  {
    from: "agent",
    at: 1115,
    text: "No. You can cancel directly from your account settings in just a few clicks.",
  },
  { from: "user", at: 1255, text: "Great, thank you!" },
  {
    from: "agent",
    at: 1325,
    text: "You're welcome! Let me know if you need any help getting started.",
  },
];

const TYPING: { start: number; end: number; text: string }[] = [
  { start: 210, end: 320, text: MSGS[1].text },
  { start: 450, end: 570, text: MSGS[3].text },
  { start: 700, end: 800, text: MSGS[5].text },
  { start: 930, end: 1040, text: MSGS[7].text },
  { start: 1170, end: 1250, text: MSGS[9].text },
];

const DOTS = [
  { at: 355, until: 395 },
  { at: 605, until: 645 },
  { at: 835, until: 875 },
  { at: 1075, until: 1115 },
  { at: 1285, until: 1325 },
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
  const suggestedOpacity = interpolate(frame, [140, 165, 310, 330], [0, 1, 1, 0], {
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
