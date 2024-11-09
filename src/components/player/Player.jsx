"use client";
import setPlayPause from "@/globalStates/setPlayPause";
import setSongDetails from "@/globalStates/setSongDetails";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import Audio from "./Audio";

const Player = () => {
  const [volume, setVolume] = useState(100);
  const [mute, setMute] = useState(false);
  const [duration, setDureation] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seek, setSeek] = useState(0);

  const { playlist, activeSong, setActiveSong, isOpen, onOpen, onClose } =
    setSongDetails();
  const { isPlaying, setPlay, setPause } = setPlayPause();

  const onPlayNext = () => {
    //check is playlist exist or not
    if (!playlist || playlist.songs.length === 0 || !playlist.songs) {
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
    if (!playlist || playlist.songs.length === 0 || !playlist.songs) {
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

  const handleMute = () => {
    if (mute) {
      setMute(false);
    } else {
      setMute(true);
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
        activeSong ? "flex" : "hidden"
      }  fixed left-0 bottom-0 h-16 w-full items-center justify-between px-4`}
    >
      {/* left  */}
      <div className="w-[25%] max-w-[250px] flex items-center gap-2">
        <div className="h-[40px] w-[40px] relative aspect-square overflow-hidden rounded-md">
          <Image
            src={activeSong?.image || "/img/music.svg"}
            alt="cover image"
            fill
            className="object-cover"
          />
        </div>
        <div className="truncate w-[calc(100%-60px)]">
          <Link
            href={`/track/${activeSong?.id}`}
            className="capitalize truncate"
          >
            {activeSong?.title}
          </Link>
          <p className="text-sm truncate">{activeSong?.artist?.name}</p>
        </div>
      </div>
      {/* center  */}
      <div className="w-[50%] max-w-[700px] flex flex-col justify-start items-center">
        {/* actions  */}
        <div className="flex items-center justify-center">
          <IoPlaySkipBack
            onClick={onPlayPrev}
            size={30}
            className="mr-4 cursor-pointer"
          />
          <Audio
            audioSrc={activeSong?.audioPath}
            onEnded={onPlayNext}
            mute={mute}
            setMute={setMute}
            volume={volume}
            isPlaying={isPlaying}
            seek={seek}
            onTimeUpdate={(event) => setCurrentTime(event.target.currentTime)}
            onLoadedData={(event) => setDureation(event.target.duration)}
          />

          <button onClick={handlePlay}>
            {isPlaying ? (
              <FaPauseCircle size={36} />
            ) : (
              <FaPlayCircle size={36} />
            )}
          </button>
          {/* <FaPauseCircle /> */}
          <IoPlaySkipForward
            onClick={onPlayNext}
            size={30}
            className="ml-4 cursor-pointer"
          />
        </div>
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
      {/* right  */}
      <div className="w-[25%] max-w-[250px] flex items-center justify-center gap-2 pl-2">
        {isOpen ? (
          <TbLayoutSidebarRightCollapseFilled
            className="text-green-400 cursor-pointer"
            size={22}
            onClick={() => onClose()}
          />
        ) : (
          <TbLayoutSidebarRightCollapse
            className="cursor-pointer"
            size={22}
            onClick={() => onOpen()}
          />
        )}

        {mute ? (
          <CiVolumeMute
            className="cursor-pointer"
            onClick={handleMute}
            size={24}
          />
        ) : (
          <CiVolumeHigh
            className="cursor-pointer"
            onClick={handleMute}
            size={24}
          />
        )}

        <input
          type="range"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="h-1 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Player;
