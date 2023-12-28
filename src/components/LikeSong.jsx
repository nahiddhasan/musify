"use client";
import setLoginModal from "@/globalStates/setLoginModal";
import fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import useSWR from "swr";
const LikeSong = ({ size = 24, songId }) => {
  const router = useRouter();
  const { status } = useSession();
  const loginModal = setLoginModal();

  const { data: isLiked, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/liked/isliked?songId=${songId}`,
    fetcher
  );

  const handleLike = async () => {
    if (status === "unauthenticated") {
      return loginModal.onOpen();
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/liked?songId=${songId}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    mutate();
    toast.success(data.messege);
    router.refresh();
  };

  return (
    <div>
      <button onClick={handleLike}>
        {isLiked ? (
          <IoMdHeart
            size={size}
            className="text-rose-600 cursor-pointer hover:scale-110 transition"
          />
        ) : (
          <IoMdHeartEmpty
            size={size}
            className=" cursor-pointer hover:scale-110 transition"
          />
        )}
      </button>
    </div>
  );
};

export default LikeSong;
