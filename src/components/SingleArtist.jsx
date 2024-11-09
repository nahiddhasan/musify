"use client";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

const SingleArtist = ({ artist }) => {
  return (
    <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-zinc-800/40 cursor-pointer hover:bg-zinc-800 transition p-3">
      <div className="h-full w-full relative aspect-square overflow-hidden rounded-full">
        <Image
          src={artist.image || "/img/noavatar.jpg"}
          alt="artist image"
          fill
          className="object-cover"
        />
      </div>
      <Link
        href={`/`}
        className="flex flex-col items-start w-full pt-2 md:pt-4 gap-y-1"
      >
        <p className="text-neutral-400 text-lg pb-2 w-full truncate">
          {artist.name}
        </p>
      </Link>
      <div className={`absolute bottom-24 right-5`}>
        <div
          className={
            "p-2 rounded-full bg-green-500 hover:bg-green-500 hover:scale-105 transition cursor-pointer text-black"
          }
        >
          <FaPlay size={24} />
        </div>
      </div>
    </div>
  );
};

export default SingleArtist;
