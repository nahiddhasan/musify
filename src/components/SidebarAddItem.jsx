"use client";
import setAddMusic from "@/globalStates/setAddMusicModal";
import setLoginModal from "@/globalStates/setLoginModal";
import useOutsideClick from "@/hooks/outSideClick";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiPlus } from "react-icons/hi2";

const SidebarAddItem = ({ colapse, status }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const authModal = setLoginModal();
  const addMusicModal = setAddMusic();
  const sidebarAddRef = useOutsideClick(() => {
    setOpen(false);
  });

  const handleCreateLibrary = async () => {
    if (status === "unauthenticated") {
      return authModal.onOpen();
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlist`,
        {
          method: "POST",
          body: JSON.stringify({
            title: "Untitled Playlist",
          }),
        }
      );
      const data = await res.json();
      setOpen(false);
      router.push(`/playlist/${data.id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className={` rounded-full hover:bg-zinc-700/50 p-1 cursor-pointer hover:text-white text-zinc-300 transition ${
          colapse && "hidden"
        }`}
      >
        <HiPlus size={20} />
      </div>
      <div
        ref={sidebarAddRef}
        className={`${
          open
            ? "flex transition-all duration-300"
            : "hidden transition-all duration-300"
        } z-10 absolute top-[calc(100%+8px)] right-0 bg-zinc-800 shadow-md rounded-sm w-max p-1 flex-col`}
      >
        {status === "authenticated" && (
          <button
            onClick={() => addMusicModal.onOpen()}
            type="button"
            className="hover:bg-zinc-700 transition px-3 p-2 rounded-sm cursor-pointer"
          >
            Add New Song
          </button>
        )}
        <button
          onClick={handleCreateLibrary}
          type="button"
          className="hover:bg-zinc-700 transition px-3 p-2 rounded-sm cursor-pointer"
        >
          Create New Library
        </button>
      </div>
    </div>
  );
};

export default SidebarAddItem;
