"use client";
import setDeletePlaylist from "@/globalStates/setDeletePlaylist";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import Modal from "./Modal";
import ButtonLoader from "./loader/ButtonLoader";

const DeletePlaylistModal = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { onClose, isOpen, id } = setDeletePlaylist();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlists/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update music");
      }

      toast.success("Music deleted successfully...");
      router.push("/");
      onClose();
      router.refresh();
      mutate("/api/playlists");

      setSubmitting(false);
    } catch (error) {
      console.log("Error updating music:", error);
      toast.error("Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div>
      {isOpen && (
        <Modal onClose={onClose} title={"Are You Sure?"}>
          <div className="flex flex-col gap-4">
            <h1 className="text-gray-200 text-sm ">
              This action cannot be undone. This will permanently delete your
              Playlist and remove from our servers.
            </h1>
            <div className="flex gap-4 self-end">
              <button onClick={onClose} className="text-white">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="disabled:cursor-not-allowed bg-white text-zinc-700 px-5 py-2 ring-1 w-max self-end rounded-full hover:scale-105 flex items-center justify-center min-w-[100px]"
              >
                {submitting ? <ButtonLoader className="text-2xl" /> : "Delete"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeletePlaylistModal;
