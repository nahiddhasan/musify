import { getLikedPlaylist, getPlaylist } from "@/utils/actions";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Player from "./player/Player";

const Sidebar = async ({ children }) => {
  const playlists = await getPlaylist();
  const likedPlaylist = await getLikedPlaylist();

  return (
    <div className="flex flex-col text-white max-w-[1366px] mx-auto h-full ">
      <div className="flex gap-2 p-2 h-full">
        {/* leftbar */}
        <LeftSidebar playlists={playlists} likedPlaylist={likedPlaylist} />
        <main className="flex-1 bg-zinc-900 rounded-md h-full overflow-hidden overflow-y-auto no-scrollbar">
          {children}
        </main>
        {/* right side */}
        <RightSidebar playlists={playlists} />
      </div>
      {/* player controler */}
      <Player />
    </div>
  );
};

export default Sidebar;
