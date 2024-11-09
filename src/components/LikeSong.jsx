"use client";
import setLoginModal from "@/globalStates/setLoginModal";
import fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import useSWR, { useSWRConfig } from "swr";
const LikeSong = ({ size = 24, songId }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: session, status } = useSession();
  const loginModal = setLoginModal();

  const [optimisticLike, setOptimisticLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: isLiked, mutate: mutateIsliked } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/liked/isliked?songId=${songId}`,
    fetcher
  );

  useEffect(() => {
    if (session) {
      setOptimisticLike(isLiked);
    }
  }, [songId, isLiked]);

  const handleLikes = async (songId) => {
    if (status === "unauthenticated") {
      return loginModal.onOpen();
    }
    if (optimisticLike === null) return; // Don't toggle if not initialized

    const optimisticState = !optimisticLike;
    setIsLoading(true);

    // Immediately update the optimistic UI
    setOptimisticLike(optimisticState);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/liked?songId=${songId}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      mutateIsliked();
      router.refresh();
      mutate("/api/likedPlaylist");
      toast.success(data.messege);
    } catch (error) {
      // Revert state in case of an error
      setOptimisticLike(!optimisticState);
      toast.error("Failed to update Like");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <button
      disabled={isLoading || optimisticLike === null}
      onClick={() => handleLikes(songId)}
    >
      {optimisticLike ? (
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
  );
};

export default LikeSong;
