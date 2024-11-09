"use client";
import PlaylistPlayPause from "@/components/PlaylistPlayPause";
import setDeletePlaylist from "@/globalStates/setDeletePlaylist";
import setUpdatePlaylist from "@/globalStates/setUpdatePlaylist";
import useOutsideClick from "@/hooks/outSideClick";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { CiCircleList, CiEdit } from "react-icons/ci";
import { FiMinusCircle } from "react-icons/fi";
import { IoIosMore, IoIosShareAlt } from "react-icons/io";

const PlayListActions = ({ playlist }) => {
  const { data: session } = useSession();
  const [moreOpen, setMoreOpen] = useState();
  const owner = session?.user.id === playlist?.creatorId;

  const { onOpen: updateOnOpen } = setUpdatePlaylist();
  const { onOpen: deleteOnOpen } = setDeletePlaylist();

  const moreRef = useOutsideClick(() => {
    setMoreOpen(false);
  });

  return (
    <div className="flex items-center justify-between mb-4 mt-2">
      <div className="flex items-center gap-4 relative">
        {playlist.songs.length > 0 && <PlaylistPlayPause playlist={playlist} />}
        <IoIosMore
          onClick={() => setMoreOpen(!moreOpen)}
          size={30}
          className=" cursor-pointer"
        />
        <div
          ref={moreRef}
          className={`${
            moreOpen
              ? "block opacity-100 transition"
              : "hidden opacity-0 transition"
          } absolute left-full bottom-[calc(100%-5px)] bg-zinc-800 rounded-sm p-1 z-10 w-[250px] ring-1 ring-zinc-700/30 shadow-md`}
        >
          {owner && (
            <>
              <div
                onClick={() => {
                  updateOnOpen(playlist.id);
                  setMoreOpen(false);
                }}
                className=" flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition"
              >
                <CiEdit size={18} />
                Edit Playlist
              </div>
              <div
                onClick={() => deleteOnOpen(playlist.id)}
                className="flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition"
              >
                <FiMinusCircle size={18} />
                Remove Playlist
              </div>
            </>
          )}
          <div className="flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition">
            <IoIosShareAlt size={18} />
            Share
          </div>
        </div>
      </div>
      <div>
        <CiCircleList size={30} className=" cursor-pointer" />
      </div>
    </div>
  );
};

export default PlayListActions;
