import { getLikedPlaylist, getPlaylist } from "@/utils/actions";
import Library from "./_components/Library";

const MobileLibrary = async () => {
  const { userPlaylists } = await getPlaylist();
  const likedPlaylist = await getLikedPlaylist();
  return (
    <div className="p-4">
      <Library likedPlaylist={likedPlaylist} playlists={userPlaylists} />
    </div>
  );
};

export default MobileLibrary;
