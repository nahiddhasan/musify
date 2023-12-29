import PlayListBanner from "@/app/playlist/_components/PlayListBanner";
import { getSinglePlaylist } from "@/utils/actions";
import { playlistAction } from "@/utils/data";
import { Suspense } from "react";
import PlayListActions from "../_components/PlayListActions";
import PlayListItems from "../_components/PlayListItems";

const PlayListPage = async ({ params }) => {
  const { id } = params;
  const playlist = await getSinglePlaylist(id);
  const playlists = await playlistAction();
  return (
    <div className="p-4 bg-gradient-to-t from-zinc-900 via-zinc-700/50 to-zinc-900">
      {/* playlist banner  */}
      <PlayListBanner
        title={playlist.title}
        desc={playlist.desc}
        coverImage={playlist.image}
        user={playlist.creator}
        playlistId={playlist.id}
        creatorId={playlist.creatorId}
        type={"PlayList"}
      />
      <PlayListActions playlist={playlist} />
      <Suspense fallback={<p>Loading Playlist songs...</p>}>
        <PlayListItems playlist={playlist} playlists={playlists} />
      </Suspense>
    </div>
  );
};

export default PlayListPage;
