"use client";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }: { url: string }) => {
  return (
    <ReactPlayer
      style={{ borderRadius: 10 }}
      muted
      url={url}
      width="100%"
      height="100%"
      controls={true}
    />
  );
};

export default VideoPlayer;
