import AllTracks from "@/components/AllTracks";
import { getSongs } from "@/utils/data";
const TRACKS_PER_PAGE = 10;
const AllTracksPage = async () => {
  const { songs, totalSongs } = await getSongs(0, TRACKS_PER_PAGE);

  return (
    <div className="p-4 px-6">
      <h1 className="text-3xl font-bold">Newest Songs</h1>
      <AllTracks initialSongs={songs} totalSongs={totalSongs} />
    </div>
  );
};

export default AllTracksPage;
