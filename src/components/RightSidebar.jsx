"use client";
import setPlayPause from "@/globalStates/setPlayPause";
import setSongDetails from "@/globalStates/setSongDetails";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import LikeSong from "./LikeSong";
import MoreOptions from "./MoreOptions";

const RightSidebar = () => {
  const { onClose, isOpen, activeSong, playlist, setActiveSong } =
    setSongDetails();
  const { setPlay } = setPlayPause();

  const nextToPlaySong = () => {
    if (playlist?.songs?.length === 0 || !playlist || !activeSong) {
      return null;
    }
    const currentIndex = playlist?.songs?.findIndex(
      (song) => song.id === activeSong.id
    );
    if (currentIndex === playlist?.songs?.length - 1) {
      const next = playlist?.songs[0];
      return next;
    }

    const next = playlist?.songs[currentIndex + 1];
    return next;
  };

  const nextSong = nextToPlaySong();

  const handlePlay = (id) => {
    const currentIndex = playlist?.songs?.findIndex((song) => song.id === id);
    setActiveSong(playlist?.songs[currentIndex]);
    setPlay();
  };

  return (
    <aside
      className={`${
        isOpen
          ? "w-[300px] transition-all duration-300"
          : "w-0 hidden transition-all duration-300"
      } bg-zinc-900 p-4 rounded-md h-full`}
    >
      <div className="flex items-center justify-between overflow-hidden">
        <h1 className="w-4/5 font-semibold truncate whitespace-nowrap text-lg capitalize overflow-hidden">
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
        <div className="py-4 flex items-center justify-between ">
          <div className="flex flex-col w-[80%] overflow-hidden">
            <Link
              href={`/track/${activeSong?.id}`}
              className="text-2xl truncate whitespace-nowrap font-semibold capitalize hover:underline  overflow-hidden"
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
          <div className="flex items-center gap-2 ">
            <LikeSong songId={activeSong?.id} />
            <MoreOptions songId={activeSong?.id} />
          </div>
        </div>
        {/* queue songs  */}
        {playlist?.songs && playlist.songs.length > 1 && (
          <div className="w-full bg-zinc-700 rounded-md p-2 ">
            <h1 className="p-1 text-xl mb-2">Next in queue</h1>
            <div className="group relative flex items-center gap-2 hover:bg-zinc-600 p-2 rounded-md">
              <div className="h-[50px] w-[50px] relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={nextSong?.image || "/img/music.svg"}
                  alt="cover image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="">
                <Link
                  href={`/track/${nextSong?.id}`}
                  className="capitalize truncate hover:underline"
                >
                  {nextSong?.title}
                </Link>
                <p className="text-sm hover:underline truncate">
                  {nextSong?.artist?.name}
                </p>
              </div>
              <button
                className=" absolute left-[90%] hidden group-hover:block top-1/2 -translate-y-1/2"
                onClick={() => handlePlay(nextSong?.id)}
              >
                <FaPlay size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;
