import { getSongs } from "@/utils/data";
import Link from "next/link";
import SingleSong from "./SingleSong";

const NewestSongs = async () => {
  const { songs } = await getSongs(0, 10);

  return (
    <div className="p-4 mt-2 mb-7 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Newest Songs</h1>
        <Link href={"/tracks"} className="hover:underline cursor-pointer">
          See all
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4 -z-0">
        {songs.length > 0 &&
          songs.map((song) => (
            <SingleSong key={song.id} songs={songs} song={song} />
          ))}
      </div>
    </div>
  );
};

export default NewestSongs;
