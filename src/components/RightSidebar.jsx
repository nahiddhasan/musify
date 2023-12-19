"use client";
import setSongDetails from "@/globalStates/setSongDetails";
import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import LikeSong from "./LikeSong";
import MoreOptions from "./MoreOptions";

const RightSidebar = ({ playlists }) => {
  const { onClose, isOpen, activeSong, playlist } = setSongDetails();

  const nextSong = () => {
    if (playlist?.songs?.length === 0 || !playlist) {
      return;
    }

    const currentIndex = playlist.songs.findIndex(
      (song) => song.id === activeSong.id
    );

    if (currentIndex === playlist.songs.length - 1) {
      const next = playlist.songs[0];
      return next;
    }

    const next = playlist.songs[currentIndex + 1];
    return next;
  };

  return (
    <aside
      className={`${
        isOpen
          ? "w-[300px] transition-all duration-300"
          : "w-0 hidden transition-all duration-300"
      }  bg-zinc-900 p-4 rounded-md`}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg truncate capitalize">
          {activeSong?.title}
        </h1>
        <button
          className="hover:bg-zinc-700 text-zinc-300 hover:text-white  h-[25px] w-[25px] flex items-center justify-center rounded-full focus:outline-none"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
      </div>
      {/* current song details  */}
      <div className="py-2">
        <div className="flex flex-col items-center justify-center rounded-md overflow-hidden bg-zinc-800/40 hover:bg-zinc-800 transition">
          <div className="h-full w-full relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src={activeSong?.image || "/img/music.svg"}
              alt="cover image"
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* details  */}
        <div className="py-4 flex justify-between items-center">
          <div className="flex flex-col ">
            <Link
              href={`/track/${activeSong?.id}`}
              className="text-2xl font-semibold capitalize hover:underline"
            >
              {activeSong?.title}
            </Link>
            <Link
              href={`/artist/${activeSong?.artist.id}`}
              className="text-zinc-400 hover:underline font-semibold"
            >
              {activeSong?.artist.name}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LikeSong songId={activeSong?.id} />
            <MoreOptions playlists={playlists} songId={activeSong?.id} />
          </div>
        </div>
        {/* queue songs  */}
        {playlist.songs && playlist.songs.length > 1 && (
          <div className="w-full bg-zinc-700 rounded-md p-2 ">
            <h1 className="p-1 text-xl mb-2">Next in queue</h1>
            <div className="flex items-center gap-2 hover:bg-zinc-600 p-2 rounded-md">
              <div className="h-[50px] w-[50px] relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={nextSong()?.image || "/img/music.svg"}
                  alt="cover image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="">
                <Link
                  href={`/track/${nextSong()?.id}`}
                  className="capitalize truncate hover:underline"
                >
                  {nextSong()?.title}
                </Link>
                <p className="text-sm hover:underline truncate">
                  {nextSong()?.artist?.name}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;
