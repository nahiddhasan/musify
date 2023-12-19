"use client";
import setAddMusic from "@/globalStates/setAddMusicModal";
import { addMusicValidate } from "@/utils/addMusicValidate";
import { uploadAudio, uploadImage } from "@/utils/upload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdEdit, MdErrorOutline } from "react-icons/md";
import Modal from "./Modal";

const AddMusicModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = setAddMusic();
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [duration, setDuration] = useState(0);
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [errors, setErrors] = useState({});
  const [submiting, setSubmiting] = useState(false);
  console.log(submiting);
  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const rtnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const rtnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${rtnMinutes}.${rtnSeconds}`;
  };

  useEffect(() => {
    const audioDuration = () => {
      if (audio) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const aaudio = new Audio(e.target.result);

          aaudio.addEventListener("loadedmetadata", () => {
            const duration = aaudio.duration;
            setDuration(duration);
          });
        };
        reader.readAsDataURL(audio);
      }
    };
    audioDuration();
  }, [audio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(addMusicValidate(title, image, audio));
    if (Object.keys(errors).length !== 0) {
      return;
    }
    setSubmiting(true);
    const audioPath = await uploadAudio(audio);
    const imagePath = await uploadImage(image);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/track`, {
        method: "POST",
        body: JSON.stringify({
          title,
          duration: calculateTime(duration),
          lyrics,
          audioPath,
          image: imagePath,
        }),
      });
      const data = await res.json();
      toast.success("Music Added succesfully...");
      setSubmiting(false);
      onClose();
      router.push(`/track/${data.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setSubmiting(false);
    }
  };
  return (
    <div>
      {isOpen && (
        <Modal onClose={onClose} title={"Upload New Song"}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-3">
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
            <div className="flex gap-2 items-center justify-center">
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
              <div className="w-[250px] flex flex-col gap-2 h-full">
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
              className="disabled:cursor-not-allowed bg-white text-zinc-700 px-5 py-2 ring-1 w-max self-end rounded-full hover:scale-105"
            >
              Add
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddMusicModal;
