import { likedPlaylistAction, playlistAction } from "@/utils/data";
import Library from "./_components/Library";

const MobileLibrary = async () => {
  const { userPlaylists } = await playlistAction();
  const likedPlaylist = await likedPlaylistAction();
  return (
    <div className="p-4">
      <Library likedPlaylist={likedPlaylist} playlists={userPlaylists} />
    </div>
  );
};

export default MobileLibrary;
