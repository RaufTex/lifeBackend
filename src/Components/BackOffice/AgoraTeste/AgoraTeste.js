/* eslint-disable react-hooks/exhaustive-deps */
import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect } from "react";
//import { useUserAuth } from "../../context/UserAuthContext";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
//import BottomNav from "../bottom-nav/bottom-nav.component";

function AgoraTeste() {
  let rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
  };
  //const { user } = useUserAuth();
  let options = {
    appId: "c90015364b5643f4b42b4ce5dae71dcd",
    channel: "Teste",
    token:
      "006c90015364b5643f4b42b4ce5dae71dcdIABkWkoHLUfAupu4OTr8BzbDzo8BfADgSY56XQCrFYYiiQtmdScAAAAAEACgcVr/Jdt6YgEAAQAk23pi",
    uid: 0,
  };

  const handleJoin = async () => {
    console.log("agorateste 25",rtc);
    await rtc.client.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    const localPlayerContainer = document.createElement("div");
    localPlayerContainer.id = options.uid;
    // localPlayerContainer.textContent = "You ";
    localPlayerContainer.style.width = "320px";
    localPlayerContainer.style.height = "180px";
    localPlayerContainer.style.marginBottom = "5px";
    document.body.append(localPlayerContainer);
    rtc.localVideoTrack.play(localPlayerContainer);
    console.log("publish success!");
  };

  const handleLeave = async () => {
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();
    rtc.client.remoteUsers.forEach((user) => {
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });
    await rtc.client.leave();
  };

  useEffect(() => {
    const temp = async () => {
      rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      rtc.client.on("user-published", async (user, mediaType) => {
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          const remoteVideoTrack = user.videoTrack;
          const remotePlayerContainer = document.createElement("div");
          remotePlayerContainer.id = user.uid.toString();
          // remotePlayerContainer.textContent =
          //   "Remote user " + user.uid.toString();
          remotePlayerContainer.style.width = "320px";
          remotePlayerContainer.style.height = "180px";
          remotePlayerContainer.style.paddingBottom = "5px";
          document.body.append(remotePlayerContainer);
          remoteVideoTrack.play(remotePlayerContainer);
        }
        if (mediaType === "audio") {
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack.play();
        }
        rtc.client.on("user-unpublished", (user) => {
          const remotePlayerContainer = document.getElementById(user.uid);
          remotePlayerContainer.remove();
        });
      });
    };
    temp();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h2>Video Call Room</h2>
        <div className="row">
          <div>
            <button
              style={{
                margin: "0.5rem",
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: "green",
                color: "white",
                fontSize: "0.8rem",
              }}
              type="button"
              onClick={handleJoin}
            >
              <CallIcon /> JOIN CALL
            </button>
            <button
              style={{
                margin: "0.5rem",
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: "red",
                color: "white",
                fontSize: "0.8rem",
              }}
              type="button"
              onClick={handleLeave}
            >
              <CallEndIcon /> LEAVE CALL
            </button>
          </div>
        </div>
      </div>
      {/* <BottomNav /> */}
    </>
  );
}

export default AgoraTeste;