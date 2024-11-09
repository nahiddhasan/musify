import PlayListBanner from "@/app/playlist/_components/PlayListBanner";
import LikeSong from "@/components/LikeSong";
import MoreOptions from "@/components/MoreOptions";
import PlayPause from "@/components/PlayPause";
import { getAuthSession } from "@/utils/auth";
import { getSingleSong } from "@/utils/data";

import { CiCircleList } from "react-icons/ci";

const SongDetails = async ({ params }) => {
  const { id } = params;
  const session = await getAuthSession();
  const song = await getSingleSong(id);

  const isOwner = session && session.user.id === song.artistId;
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

          <MoreOptions songId={song.id} left={true} isOwner={isOwner} />
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
