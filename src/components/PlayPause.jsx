"use client";
import setPlayPause from "@/globalStates/setPlayPause";
import setSongDetails from "@/globalStates/setSongDetails";
import { FaPause, FaPlay } from "react-icons/fa6";

const PlayPause = ({ song, playlist }) => {
  const {
    onOpen,
    setActiveSong,
    activeSong,
    setPlaylist,
    playlist: pl,
  } = setSongDetails();
  const { isPlaying, setPlay, setPause } = setPlayPause();

  const handlePlay = () => {
    if (isPlaying && (isCurrentyPlaying || isPl)) {
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

  const isCurrentyPlaying = song?.id === activeSong?.id;
  const isPl = playlist?.id === pl?.id;

  return (
    <div
      className={
        "p-2 rounded-full bg-green-500 hover:bg-green-500 hover:scale-105 transition cursor-pointer text-black"
      }
    >
      {isPlaying && isCurrentyPlaying ? (
        <FaPause size={24} onClick={handlePlay} />
      ) : (
        <FaPlay onClick={handlePlay} size={24} />
      )}
    </div>
  );
};

export default PlayPause;
