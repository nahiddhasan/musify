import PlayListBanner from "@/app/playlist/_components/PlayListBanner";
import PlaylistPlayPause from "@/components/PlaylistPlayPause";
import { getAuthSession } from "@/utils/auth";
import { getLikedPlSongs } from "@/utils/data";
import { redirect } from "next/navigation";
import { CiCircleList } from "react-icons/ci";
import LikedPlaylistItems from "./LikedPlaylistItems";

const LikedSongs = async ({ params }) => {
  const { id } = params;
  const session = await getAuthSession();
  if (!session) {
    return redirect("/");
  }

  const playlist = await getLikedPlSongs(id);

  return (
    <div className="p-4">
      <PlayListBanner
        title={playlist.title}
        coverImage={playlist.image}
        user={session.user}
        type={"PlayList"}
      />
      <div className="flex items-center justify-between mb-4 mt-2">
        <PlaylistPlayPause playlist={playlist} />
        <div>
          <CiCircleList size={30} className="cursor-pointer" />
        </div>
      </div>
      <LikedPlaylistItems playlist={playlist} />
    </div>
  );
};

export default LikedSongs;
