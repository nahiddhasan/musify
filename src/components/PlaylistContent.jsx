import { getUserPlaylists } from "@/utils/data";
import SinglePlaylist from "./SinglePlaylist";

const PlaylistContent = async () => {
  const allPlaylists = await getUserPlaylists(0, 10);

  return (
    <div className="p-4 mt-2 mb-7 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Playlists</h1>
        <span className="hover:underline cursor-pointer">See all</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4 -z-0">
        {allPlaylists &&
          allPlaylists.map((playlist) => (
            <SinglePlaylist key={playlist.id} playlist={playlist} />
          ))}
      </div>
    </div>
  );
};

export default PlaylistContent;
