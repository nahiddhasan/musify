"use client";
import setPlayPause from "@/globalStates/setPlayPause";
import setSongDetails from "@/globalStates/setSongDetails";
import Image from "next/image";
import Link from "next/link";
import PlayPause from "./PlayPause";

const SingleSong = ({ song, songs }) => {
  const songsPl = {
    id: "songPl",
    songs,
  };
  const { activeSong, playlist } = setSongDetails();
  const { isPlaying } = setPlayPause();
  const currentlyPlaying = song?.id === activeSong?.id;
  const currentPl = playlist?.id === songsPl.id;
  return (
    <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-zinc-800/40 cursor-pointer hover:bg-zinc-800 transition p-3">
      <Link
        href={`/track/${song.id}`}
        className="h-full w-full relative aspect-square overflow-hidden rounded-sm"
      >
        <Image
          src={song.image || "/img/music.svg"}
          alt="cover image"
          fill
          className="object-cover"
        />
      </Link>
      <Link
        href={`/track/${song.id}`}
        className="flex flex-col items-start w-full pt-2 md:pt-4 gap-y-1"
      >
        <p className="text-sm md:text-base font-semibold truncate w-full">
          {song.title}
        </p>
        <p className="text-neutral-400 text-sm pb-2 w-full truncate">
          {song.artist.name}
        </p>
      </Link>
      <div
        className={`absolute bottom-24 right-5 translate translate-y-1/4 group-hover:translate-y-0 group-hover:scale-100 ${
          currentlyPlaying && currentPl && isPlaying
            ? "lg:scale-100 lg:translate-y-0"
            : "lg:scale-0"
        } transition duration-200`}
      >
        <PlayPause song={song} playlist={songsPl} />
      </div>
    </div>
  );
};
export default SingleSong;
