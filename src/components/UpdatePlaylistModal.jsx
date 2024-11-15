"use client";
import setUpdatePlaylist from "@/globalStates/setUpdatePlaylist";
import fetcher from "@/utils/fetcher";
import { uploadImage } from "@/utils/upload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdEdit, MdErrorOutline } from "react-icons/md";
import useSWR, { useSWRConfig } from "swr";
import Modal from "./Modal";
import ButtonLoader from "./loader/ButtonLoader";

const UpdatePlaylistModal = () => {
  const { mutate } = useSWRConfig();
  const { isOpen, onClose, id } = setUpdatePlaylist();
  const { data: playlist, isLoading } = useSWR(
    isOpen ? `/api/playlists/${id}` : null,
    fetcher
  );

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState();
  const [image, setImage] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (playlist) {
      setDesc(playlist.desc);
      setTitle(playlist.title);
    }
  }, [playlist]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }
    try {
      setUpdating(true);
      const imageUrl = await uploadImage(image);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/playlists/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
          desc,
          image: imageUrl,
        }),
      });
      onClose();
      mutate("/api/playlists");
      router.refresh();
      setUpdating(false);
      toast.success("Updated...");
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong! Try again.");
    }
  };

  return (
    <div>
      {isOpen && (
        <Modal onClose={onClose} title={"Update Playlist"}>
          {isLoading ? (
            <ButtonLoader className="text-white text-5xl" />
          ) : (
            <form
              onSubmit={handleUpdate}
              className="flex flex-col gap-4 my-3 w-full"
            >
              {!title && (
                <span className="flex gap-2 items-center bg-red-500 rounded-sm px-2 p-1 text-sm">
                  <MdErrorOutline />
                  Playlist Name is required!
                </span>
              )}
              <div className="flex gap-2 items-center justify-center flex-col md:flex-row">
                <div className="w-[150px] group relative shadow-2xl">
                  <div className="flex flex-col items-center justify-center rounded-sm overflow-hidden bg-zinc-800 transition">
                    <div className="h-full w-full relative aspect-square overflow-hidden rounded-sm">
                      <Image
                        src={
                          (image && URL.createObjectURL(image)) ||
                          "/img/music.svg"
                        }
                        fill
                        alt="album-cover"
                      />
                    </div>
                    <div className="invisible transition bg-zinc-800/80 h-full w-full group-hover:visible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                      <input
                        type="file"
                        id="cover"
                        className="hidden"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <label
                        htmlFor="cover"
                        className=" text-center cursor-pointer h-full w-full flex items-center justify-center flex-col"
                      >
                        <MdEdit size={40} />
                        <span>Choose Photo</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[250px] flex flex-col gap-2 h-full">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`${
                      !title ? "border-red-500 border-b-2" : "border-none"
                    } text-white outline-none w-full  focus:outline-1 focus:ring-1 focus:ring-zinc-500 bg-zinc-800 rounded-sm px-2 p-1`}
                  />
                  <textarea
                    name=""
                    id=""
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="resize-none h-[110px] text-white w-full border-none outline-none  focus:outline-1 focus:ring-1 focus:ring-zinc-500 bg-zinc-800 rounded-sm px-2 p-1"
                    placeholder="Add an optional description"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updating || !title}
                className="disabled:cursor-not-allowed bg-white text-zinc-700 px-5 py-2 ring-1 w-max self-end rounded-full hover:scale-105 flex items-center justify-center min-w-[100px]"
              >
                {updating ? <ButtonLoader className="text-2xl" /> : "Update"}
              </button>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

export default UpdatePlaylistModal;
