"use client";
import Modal from "@/components/Modal";
import PlayPause from "@/components/PlayPause";
import setUpdatePlaylist from "@/globalStates/setUpdatePlaylist";
import useOutsideClick from "@/hooks/outSideClick";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiCircleList, CiEdit } from "react-icons/ci";
import { FiMinusCircle } from "react-icons/fi";
import { IoIosMore, IoIosShareAlt } from "react-icons/io";

const PlayListActions = ({ playlist }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const owner = session?.user.id === playlist?.creatorId;
  const updateModal = setUpdatePlaylist();

  const moreRef = useOutsideClick(() => {
    setMoreOpen(false);
  });

  const handleRemovePlaylist = async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/playlist/${id}`, {
        method: "DELETE",
      });
      toast.success("Deleteted...");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleCancel = () => {
    setOpenDeleteConfirm(false);
    setMoreOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-4 mt-2">
      <div className="flex items-center gap-4 relative">
        {playlist.songs.length > 0 && <PlayPause playlist={playlist} />}
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
                  updateModal.onOpen();
                  setMoreOpen(false);
                }}
                className=" flex items-center gap-2 w-full cursor-pointer rounded-sm p-2 hover:bg-zinc-700 transition"
              >
                <CiEdit size={18} />
                Edit Playlist
              </div>
              <div
                onClick={() => setOpenDeleteConfirm(true)}
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

          {openDeleteConfirm && (
            <Modal
              onClose={() => setOpenDeleteConfirm(false)}
              title={"Confirm Delete"}
            >
              <div className="flex gap-2 items-center justify-center h-[150px]">
                <button
                  onClick={handleCancel}
                  className="px-6 p-2 text-lg hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRemovePlaylist(playlist.id)}
                  className="px-4 p-3 text-xl bg-green-700 rounded-full hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
      <div>
        <CiCircleList size={30} className=" cursor-pointer" />
      </div>
    </div>
  );
};

export default PlayListActions;
