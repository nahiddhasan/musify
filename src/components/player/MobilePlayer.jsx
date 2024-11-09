"use client";
import setPlayPause from "@/globalStates/setPlayPause";
import setSongDetails from "@/globalStates/setSongDetails";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import Audio from "./Audio";

const MobilePlayer = () => {
  const [duration, setDureation] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seek, setSeek] = useState(0);

  const { playlist, activeSong, setActiveSong } = setSongDetails();
  const { isPlaying, setPlay, setPause } = setPlayPause();

  const onPlayNext = () => {
    //check is playlist exist or not
    if (playlist.songs.length === 0 || !playlist.songs) {
      return;
    }
    //check currently played songs index
    const currentIndex = playlist.songs.findIndex(
      (song) => song.id === activeSong.id
    );

    if (currentIndex === playlist.songs.length - 1) {
      setActiveSong(playlist.songs[0]);
    }
    const nextSong = playlist.songs[currentIndex + 1];
    //if no more next song
    if (nextSong === undefined) {
      return setActiveSong(playlist.songs[0]);
    }
    //set next song from playlist array
    setActiveSong(nextSong);
  };

  const onPlayPrev = () => {
    //check is playlist exist or not
    if (playlist.songs.length === 0 || !playlist.songs) {
      return;
    }
    //check currently played songs index
    const currentIndex = playlist.songs.findIndex(
      (song) => song.id === activeSong.id
    );
    const prevSong = playlist.songs[currentIndex - 1];
    //if no more prev song
    if (prevSong === undefined) {
      return setActiveSong(playlist.songs[playlist.songs.length - 1]);
    }
    //set prev song from playlist array
    setActiveSong(prevSong);
  };

  const handlePlay = () => {
    if (isPlaying) {
      setPause();
    } else {
      setPlay();
    }
  };

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const rtnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const rtnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${rtnMinutes}:${rtnSeconds}`;
  };
  return (
    <div
      className={`${
        activeSong ? "block" : "hidden"
      } md:hidden px-4 py-1 absolute left-0 bottom-12  bg-zinc-950 w-full`}
    >
      <div className="flex items-center justify-between w-full truncate">
        <div className="flex-[3] flex items-center gap-2">
          <div className="h-[30px] w-[30px] relative aspect-square overflow-hidden rounded-md">
            <Image
              src={activeSong?.image || "/img/music.svg"}
              alt="cover image"
              fill
              className="object-cover"
            />
          </div>
          <div className="">
            <Link
              href={`/track/${activeSong?.id}`}
              className="capitalize truncate"
            >
              {activeSong?.title}
            </Link>
            <p className="text-sm truncate">{activeSong?.artist?.name}</p>
          </div>
        </div>
        <div className="flex-[1] flex flex-col justify-start">
          {/* actions  */}
          <div className="flex items-center justify-center">
            <IoPlaySkipBack
              onClick={onPlayPrev}
              size={20}
              className="mr-4 cursor-pointer"
            />
            <Audio
              audioSrc={activeSong?.audioPath}
              onEnded={onPlayNext}
              isPlaying={isPlaying}
              volume={100}
              seek={seek}
              onTimeUpdate={(event) => setCurrentTime(event.target.currentTime)}
              onLoadedData={(event) => setDureation(event.target.duration)}
            />

            <button onClick={handlePlay}>
              {isPlaying ? (
                <FaPauseCircle size={24} />
              ) : (
                <FaPlayCircle size={24} />
              )}
            </button>
            {/* <FaPauseCircle /> */}
            <IoPlaySkipForward
              onClick={onPlayNext}
              size={20}
              className="ml-4 cursor-pointer"
            />
          </div>
        </div>
      </div>
      {/* seekbar  */}
      <div className="flex items-center w-full gap-1">
        <div className="flex text-sm">{calculateTime(currentTime)}</div>
        <input
          type="range"
          value={currentTime}
          min={0}
          max={duration}
          onChange={(e) => setSeek(e.target.value)}
          className="h-1 w-full"
        />
        <div className="flex text-sm">
          {duration && !isNaN(duration) && calculateTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;
