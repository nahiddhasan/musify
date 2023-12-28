"use client";
import useOutsideClick from "@/hooks/outSideClick";
import fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { IoIosMore, IoIosShareAlt } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import useSWR from "swr";

const MoreOptions = ({ left, playlist, songId }) => {
  const { status } = useSession();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useOutsideClick(() => setMoreOpen(false));
  const router = useRouter();

  const { data: playlists, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlist`,
    fetcher
  );

  const handleAddToPlaylist = async (id, songIds) => {
    if (songIds.includes(songId)) {
      return toast.success("already exists in this playlist");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlist/${id}?songId=${songId}`,
      {
        method: "PATCH",
        body: JSON.stringify({}),
      }
    );
    const data = await res.json();
    toast.success(`Song Added to ${data.title}`);
    router.refresh();
  };

  const hanldeRemoveFromPlaylist = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlist/${id}?songId=${songId}`,
      {
        method: "PATCH",
        body: JSON.stringify({}),
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
            <div
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
                  : playlists.userPlaylists?.map((playlist) => (
                      <div
                        onClick={() =>
                          handleAddToPlaylist(playlist.id, playlist.songIds)
                        }
                        key={playlist.id}
                        className="flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition"
                      >
                        {playlist.title}
                      </div>
                    ))}
              </div>
            </div>
          </>
          {playlist?.songIds.includes(songId) && (
            <div
              onClick={() => hanldeRemoveFromPlaylist(playlist.id)}
              className="flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition"
            >
              <MdDelete size={18} />
              Remove From Playlist
            </div>
          )}

          <div className="flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition">
            <IoIosShareAlt size={18} />
            Share
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreOptions;
