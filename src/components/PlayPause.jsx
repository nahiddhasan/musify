"use client";
import setPlayPause from "@/globalStates/setPlayPause";
import setSongDetails from "@/globalStates/setSongDetails";
import { FaPause, FaPlay } from "react-icons/fa6";

const PlayPause = ({ song, playlist }) => {
  const { onOpen, setActiveSong, activeSong, setPlaylist } = setSongDetails();
  const { isPlaying, setPlay, setPause } = setPlayPause();

  const currentlyPlaying = song?.id === activeSong?.id;
  // const isPlaying = false;

  const handlePlay = () => {
    if (isPlaying && currentlyPlaying) {
      setPause();
    } else {
      onOpen();
      setPlaylist(playlist);
      setPlay();
      if (!song) {
        setActiveSong(playlist.songs[0]);
      } else {
        setActiveSong(song);
      }
    }
  };

  return (
    <div
      className={
        "p-2 rounded-full bg-green-500 hover:bg-green-500 hover:scale-105 transition cursor-pointer text-black"
      }
    >
      {isPlaying && currentlyPlaying ? (
        <FaPause size={24} onClick={handlePlay} />
      ) : (
        <FaPlay onClick={handlePlay} size={24} />
      )}
    </div>
  );
};

export default PlayPause;
