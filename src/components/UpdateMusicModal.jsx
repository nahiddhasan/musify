"use client";
import setUpdateMusic from "@/globalStates/setUpdateMusicModal";
import { updateMusicValidate } from "@/utils/addMusicValidate";
import fetcher from "@/utils/fetcher";
import { uploadAudio2, uploadImage } from "@/utils/upload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdEdit, MdErrorOutline } from "react-icons/md";
import useSWR from "swr";
import Modal from "./Modal";
import ButtonLoader from "./loader/ButtonLoader";

const UpdateMusicModal = () => {
  const router = useRouter();
  const { onClose, isOpen, id } = setUpdateMusic();

  const { data: song, isLoading } = useSWR(
    isOpen ? `/api/tracks/${id}` : null,
    fetcher
  );
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [duration, setDuration] = useState(0);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const [errors, setErrors] = useState({});
  const [submiting, setSubmiting] = useState(false);

  // Set state based on fetched song data
  useEffect(() => {
    if (song) {
      setTitle(song.title);
      setLyrics(song.lyrics);
      setDuration(song.duration);
    }
  }, [song]);

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const rtnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const rtnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${rtnMinutes}.${rtnSeconds}`;
  };

  useEffect(() => {
    const audioDuration = () => {
      if (audio instanceof File) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const aaudio = new Audio(e.target.result);
          aaudio.addEventListener("loadedmetadata", () => {
            setDuration(aaudio.duration);
          });
        };
        reader.readAsDataURL(audio);
      }
    };

    audioDuration();
  }, [audio]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(updateMusicValidate(title, image, audio));
    if (Object.keys(errors).length !== 0) {
      return;
    }

    setSubmiting(true);

    // Check if we need to upload new audio or image, otherwise use the existing path
    let audioPath =
      audio instanceof File
        ? await uploadAudio2(audio, setProgress)
        : song.audioPath;
    let imagePath =
      image instanceof File ? await uploadImage(image) : song.image;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tracks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            duration: song.duration || calculateTime(duration),
            lyrics,
            audioPath,
            image: imagePath,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update music");
      }

      toast.success("Music updated successfully...");
      router.refresh();
      setSubmiting(false);
      onClose();
    } catch (error) {
      console.error("Error updating music:", error);
      toast.error("Something went wrong");
      setSubmiting(false);
    }
  };

  return (
    <div>
      {isOpen && (
        <Modal onClose={onClose} title={"Update Song"}>
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <ButtonLoader className="text-5xl " />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 my-3 w-full"
            >
              <div className="flex flex-col gap-1">
                {errors.title && (
                  <span className="flex gap-2 items-center bg-red-500 text-white rounded-sm px-2 p-1 text-sm">
                    <MdErrorOutline />
                    {errors.title}
                  </span>
                )}
                {errors.audio && (
                  <span className="flex gap-2 items-center bg-red-500 text-white rounded-sm px-2 p-1 text-sm">
                    <MdErrorOutline />
                    {errors.audio}
                  </span>
                )}
              </div>
              <div className="flex gap-2 items-center justify-center flex-col md:flex-row">
                <div className="min-w-[150px] group relative shadow-2xl">
                  <div className="flex flex-col items-center justify-center rounded-sm overflow-hidden bg-zinc-800 transition">
                    <div className="h-full w-full relative aspect-square overflow-hidden rounded-sm">
                      <Image
                        src={
                          image instanceof File
                            ? URL.createObjectURL(image)
                            : song.image || "/img/music.svg"
                        }
                        fill
                        alt="album-cover"
                        className="object-cover"
                      />
                    </div>
                    <div className="invisible transition bg-zinc-800/80 h-full w-full group-hover:visible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        id="cover"
                        className="hidden"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <label
                        htmlFor="cover"
                        className="text-white cursor-pointer h-full w-full flex items-center justify-center flex-col"
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
                      errors.title ? "border-red-500 border-b-2" : "border-none"
                    } text-white outline-none w-full  focus:outline-1 focus:ring-1 focus:ring-zinc-500 bg-zinc-800 rounded-sm px-2 p-1`}
                  />
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setAudio(e.target.files[0])}
                    className={`${
                      errors.audio ? "border-red-500 border-b-2" : "border-none"
                    } text-white outline-none w-full  focus:outline-1 focus:ring-1 focus:ring-zinc-500 bg-zinc-800 rounded-sm px-2 p-1`}
                  />
                  <textarea
                    name=""
                    id=""
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    className="resize-none  text-white w-full border-none outline-none  focus:outline-1 focus:ring-1 focus:ring-zinc-500 bg-zinc-800 rounded-sm px-2 p-1"
                    placeholder="Lyrics"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submiting}
                className="disabled:cursor-not-allowed bg-white text-zinc-700 px-5 py-2 ring-1 w-max self-end rounded-full hover:scale-105 flex items-center justify-center min-w-[100px]"
              >
                {progress > 0 ? (
                  <div className="h-6 w-6  rounded-full">
                    <svg
                      className="w-full h-full rotate-[-90deg]"
                      viewBox="0 0 36 36"
                    >
                      {/* Background Circle */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb" // Tailwind 'gray-200'
                        strokeWidth="4"
                      />
                      {/* Progress Circle */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4caf50" // Tailwind 'green-500'
                        strokeWidth="4"
                        strokeDasharray={`${progress}, 100`}
                      />
                    </svg>
                  </div>
                ) : submiting ? (
                  <ButtonLoader className="text-2xl" />
                ) : (
                  "Update"
                )}
              </button>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

export default UpdateMusicModal;
