import { playlistAction } from "@/utils/data";
import SinglePlaylist from "./SinglePlaylist";

const PlaylistContent = async () => {
  const { allPlaylists } = await playlistAction();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4 -z-0">
      {allPlaylists.map((playlist) => (
        <SinglePlaylist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistContent;
