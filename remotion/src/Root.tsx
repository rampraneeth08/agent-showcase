import { Composition } from "remotion";
import { ChatVideo } from "./ChatVideo";
import { VoiceVideo } from "./VoiceVideo";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="chat"
      component={ChatVideo}
      durationInFrames={1450}
      fps={25}
      width={1280}
      height={800}
    />
    <Composition
      id="voice"
      component={VoiceVideo}
      durationInFrames={1400}
      fps={25}
      width={1280}
      height={800}
    />
  </>
);
