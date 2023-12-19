import { getSongs } from "@/utils/actions";
import SingleSong from "./SingleSong";

const MainContent = async () => {
  const songs = await getSongs();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4 -z-0">
      {songs.map((song) => (
        <SingleSong key={song.id} songs={songs} song={song} />
      ))}
    </div>
  );
};

export default MainContent;
