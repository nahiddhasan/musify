import PlayListBanner from "@/app/playlist/_components/PlayListBanner";
import LikeSong from "@/components/LikeSong";
import MoreOptions from "@/components/MoreOptions";
import PlayPause from "@/components/PlayPause";
import { getSingleSong } from "@/utils/actions";
import { CiCircleList } from "react-icons/ci";

const SongDetails = async ({ params }) => {
  const { id } = params;
  const song = await getSingleSong(id);

  return (
    <div className="p-4">
      <PlayListBanner
        title={song.title}
        coverImage={song.image}
        type={"Song"}
        user={song.artist}
      />
      {/* actions  */}
      <div className="flex items-center justify-between mb-4 mt-2">
        <div className="flex items-center gap-4">
          <PlayPause song={song} />
          <LikeSong size={30} songId={song.id} />

          <MoreOptions songId={song.id} left={true} />
        </div>
        <div>
          <CiCircleList size={30} className=" cursor-pointer" />
        </div>
      </div>
      {/* Songs Details  */}
      <div>
        <span className="font-semibold text-2xl">Lyrics</span>
        <p className="mt-3">{song.lyrics}</p>
      </div>
    </div>
  );
};

export default SongDetails;
