"use client";
import setUpdatePlaylist from "@/globalStates/setUpdatePlaylist";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { MdEdit } from "react-icons/md";

const PlayListBanner = ({
  title,
  coverImage,
  user,
  desc,
  playlistId,
  creatorId,
  type,
}) => {
  const { data: session } = useSession();
  const playlistOwner = session?.user.id === creatorId;

  const { onOpen } = setUpdatePlaylist();
  const handleUpdate = () => {
    if (!playlistOwner) {
      return;
    }
    onOpen(playlistId);
  };
  return (
    <div className="flex items-center flex-col md:flex-row gap-4">
      <div className="w-[250px] group relative shadow-md z-10 overflow-hidden">
        <div className="flex flex-col items-center justify-center rounded-md overflow-hidden bg-zinc-800 transition">
          <div className="h-full w-full relative aspect-square overflow-hidden rounded-sm">
            <Image
              src={coverImage || "/img/music.svg"}
              fill
              alt="album-cover"
              className="object-cover"
            />
          </div>
        </div>
        {playlistOwner && (
          <div
            onClick={() => onOpen(playlistId)}
            className="invisible transition bg-zinc-800/80 h-full w-full group-hover:visible absolute top-0 left-0 cursor-pointer rounded-md"
          >
            <label
              htmlFor="cover"
              className=" text-center cursor-pointer h-full w-full flex items-center justify-center flex-col"
            >
              <MdEdit size={40} />
              <span>Choose Photo</span>
            </label>
          </div>
        )}
      </div>
      <div className="w-full md:w-3/4 flex flex-col gap-2 h-full justify-center">
        <span>{type}</span>
        <h1
          onClick={handleUpdate}
          className={`truncate text-3xl md:text-4xl lg:text-7xl whitespace-nowrap font-bold mb-2 ${
            playlistOwner && "cursor-pointer"
          }`}
        >
          {title}
        </h1>
        {desc && <span className="text-sm">{desc}</span>}
        <div className="flex items-center gap-2">
          <Image
            src={user?.image || "/img/noavatar.jpg"}
            height={25}
            width={25}
            alt="Profile"
            className="object-cover rounded-full"
          />
          <span>{user?.name}</span>
        </div>
      </div>
      {/* <UpdatePlaylist
        prevtitle={title}
        prevdesc={desc}
        previmage={coverImage}
        creatorId={creatorId}
        playlistId={playlistId}
        onClose={() => onClose()}
        isOpen={isOpen}
      /> */}
    </div>
  );
};

export default PlayListBanner;
