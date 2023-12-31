import PlaylistPlayPause from "@/components/PlaylistPlayPause";
import { getAuthSession } from "@/utils/auth";
import { likedPlaylistAction } from "@/utils/data";
import { redirect } from "next/navigation";
import { CiCircleList } from "react-icons/ci";
import PlayListBanner from "../playlist/_components/PlayListBanner";
import PlayListItems from "../playlist/_components/PlayListItems";

const LikedSongs = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/");
  }
  const playlist = await likedPlaylistAction();

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
          <CiCircleList size={30} className=" cursor-pointer" />
        </div>
      </div>
      <PlayListItems playlist={playlist} />
    </div>
  );
};

export default LikedSongs;
