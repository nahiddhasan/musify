"use client";
import setDeleteMusic from "@/globalStates/setDeleteMusicModal";
import setUpdateMusic from "@/globalStates/setUpdateMusicModal";
import useOutsideClick from "@/hooks/outSideClick";
import fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { IoIosMore, IoIosShareAlt } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import useSWR from "swr";

const MoreOptions = ({ left, playlist, songId, isOwner = false }) => {
  const { status } = useSession();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useOutsideClick(() => setMoreOpen(false));
  const router = useRouter();
  const { onOpen } = setUpdateMusic();
  const { onOpen: deleteOpen } = setDeleteMusic();

  const { data: playlists, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlists`,
    fetcher
  );

  const handleAddToPlaylist = async (id, songIds) => {
    if (songIds.includes(songId)) {
      return toast.success("already exists in this playlist");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlists/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          songId,
        }),
      }
    );
    const data = await res.json();
    toast.success(`Song Added to ${data.title}`);
    router.refresh();
  };

  const hanldeRemoveFromPlaylist = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlists/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          songId,
        }),
      }
    );
    const data = await res.json();
    toast.success(`Song Removed from ${data.title}`);
    router.refresh();
  };

  return (
    <div ref={moreRef} className="flex items-center gap-4 relative ">
      <IoIosMore
        onClick={() => setMoreOpen(!moreOpen)}
        size={26}
        className=" cursor-pointer"
      />
      {status === "authenticated" && (
        <div
          className={`${
            moreOpen
              ? "block opacity-100 transition"
              : "hidden opacity-0 transition"
          } absolute ${
            left && left ? "left-0" : "right-0"
          } bottom-[calc(100%+8px)] bg-zinc-800 rounded-sm p-1 z-10 w-[200px] ring-1 ring-zinc-700/30 shadow-md`}
        >
          <>
            <button
              onClick={() => {
                setMoreOpen(false);
              }}
              className="group relative flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition"
            >
              <FiPlus size={18} />
              <span>Add to Playlist</span>

              {/* hover items */}
              <div
                className={`drop-shadow-2xl hidden group-hover:block absolute ${
                  left && left ? "left-full" : "right-full"
                } top-0 bg-zinc-800 w-[200px] p-1 rounded-sm`}
              >
                {isLoading
                  ? "Loading..."
                  : playlists?.map((playlist) => (
                      <button
                        onClick={() =>
                          handleAddToPlaylist(playlist.id, playlist.songIds)
                        }
                        key={playlist.id}
                        className="flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition"
                      >
                        {playlist.title}
                      </button>
                    ))}
              </div>
            </button>
          </>
          {playlist?.songIds.includes(songId) && (
            <button
              onClick={() => hanldeRemoveFromPlaylist(playlist.id)}
              className="flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition"
            >
              <MdDelete size={18} />
              Remove From Playlist
            </button>
          )}

          {isOwner && (
            <>
              <button
                onClick={() => deleteOpen(songId)}
                className="flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition"
              >
                <MdDelete size={18} />
                Remove
              </button>
              <button
                onClick={() => onOpen(songId)}
                className="flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition"
              >
                <MdEdit size={18} />
                Update
              </button>
            </>
          )}
          <button className="flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition">
            <IoIosShareAlt size={18} />
            Share
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreOptions;
