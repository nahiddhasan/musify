"use client";
import setPlayPause from "@/globalStates/setPlayPause";
import setSongDetails from "@/globalStates/setSongDetails";
import Image from "next/image";
import Link from "next/link";
import PlaylistPlayPause from "./PlaylistPlayPause";

const SinglePlaylist = ({ playlist }) => {
  const { playlist: pl } = setSongDetails();
  const { isPlaying } = setPlayPause();
  const isCurrentlyPlaying = playlist.id === pl?.id;
  return (
    <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-zinc-800/40 cursor-pointer hover:bg-zinc-800 transition p-3">
      <div className="h-full w-full relative aspect-square overflow-hidden rounded-sm">
        <Image
          src={playlist.image || "/img/music.svg"}
          alt="pl image"
          fill
          className="object-cover"
        />
      </div>
      <Link
        href={`/playlist/${playlist.id}`}
        className="flex flex-col items-start w-full pt-2 md:pt-4 gap-y-1"
      >
        <p className="text-sm md:text-base font-semibold truncate w-full">
          {playlist.title}
        </p>
        <p className="text-neutral-400 text-sm pb-2 w-full truncate">
          {playlist.creator.name}
        </p>
        <p className="text-neutral-400 text-sm pb-2 w-full truncate">
          {playlist.desc}
        </p>
      </Link>
      <div
        className={`absolute bottom-24 right-5 translate translate-y-1/4 group-hover:translate-y-0 group-hover:scale-100 
        ${
          isCurrentlyPlaying && isPlaying
            ? "lg:scale-100 lg:translate-y-0"
            : "lg:scale-0"
        }
          transition duration-200`}
      >
        {/* <PlayPause playlist={playlist} /> */}
        <PlaylistPlayPause playlist={playlist} />
      </div>
    </div>
  );
};

export default SinglePlaylist;

// ${currentlyPlaying && isPlaying ? "scale-100 translate-y-0" : "scale-0"}
