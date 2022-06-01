import React from "react";
import ButtonPlayMusicRunningContainer from "../../containers/ButtonPlayMusicRunningContainer/ButtonPlayMusicRunningContainer";


const MediaAudio = ({ post }) => {
  return (
    <ButtonPlayMusicRunningContainer
      className="absolute bg-neutral-900 bg-opacity-30 flex items-center justify-center inset-0"
      post={post}
    />
  );
};

export default MediaAudio;
