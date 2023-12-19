"use client";

import { useEffect, useRef } from "react";

const Audio = ({
  onEnded,
  onTimeUpdate,
  onLoadedData,
  audioSrc,
  mute,
  isPlaying,
  volume,
  setMute,
  seek,
}) => {
  const audioRef = useRef();

  if (audioRef.current) {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  useEffect(() => {
    audioRef.current.currentTime = seek;
  }, [seek]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
    if (volume > 0) {
      setMute(false);
    }
    if (volume <= 0) {
      setMute(true);
    }
  }, [volume]);

  return (
    <audio
      src={audioSrc}
      ref={audioRef}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
      muted={mute}
    >
      Your browser does not support audio
    </audio>
  );
};

export default Audio;
