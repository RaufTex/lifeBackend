import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";


export default function MediaPlayer(props)  {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    if (props.videoTrack) props.videoTrack.play(container.current);
    return () => {
      if (props.videoTrack) props.videoTrack.stop();
    };
  }, [container, props.videoTrack]);

  useEffect(() => {
    if (props.audioTrack) props.audioTrack.play();
    return () => {
      if (props.audioTrack) props.audioTrack.stop();
    };
  }, [props.audioTrack]);
  return (
    <div ref={container} className="video-player" style={{ width: "500px", height: "500px" }}></div>
  );
}

//export default MediaPlayer;





// import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
// import React, { useRef, useEffect } from "react";

// export interface VideoPlayerProps {
//   videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
//   audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
// }

// const MediaPlayer = (props: VideoPlayerProps) => {
//   const container = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     if (!container.current) return;
//     props.videoTrack?.play(container.current);
//     return () => {
//       props.videoTrack?.stop();
//     };
//   }, [container, props.videoTrack]);
//   useEffect(() => {
//     if(props.audioTrack){
//       props.audioTrack?.play();
//     }
//     return () => {
//       props.audioTrack?.stop();
//     };
//   }, [props.audioTrack]);
//   return (
//     <div ref={container}  className="video-player" style={{ width: "320px", height: "240px"}}></div>
//   );
// }

// export default MediaPlayer;