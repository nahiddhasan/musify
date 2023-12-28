import { getLikedPlaylist, getPlaylist } from "@/utils/actions";
import LeftSidebar from "./LeftSidebar";
import MobileBottombar from "./MobileBottombar";
import RightSidebar from "./RightSidebar";
import MobilePlayer from "./player/MobilePlayer";
import Player from "./player/Player";

const Sidebar = async ({ children }) => {
  const { userPlaylists } = await getPlaylist();
  const likedPlaylist = await getLikedPlaylist();

  return (
    <div className="flex flex-col text-white max-w-[1366px] mx-auto h-full ">
      <div className="flex gap-2 p-1 md:p-2 h-full">
        {/* leftbar */}
        <LeftSidebar playlists={userPlaylists} likedPlaylist={likedPlaylist} />
        <main className="flex-1 bg-zinc-900 rounded-md h-[calc(100%-48px)] md:h-full overflow-hidden overflow-y-auto no-scrollbar">
          {children}
        </main>
        {/* right side */}
        <div className="hidden md:block">
          <RightSidebar />
        </div>
      </div>
      {/* player controler */}
      <div>
        {/* desktop player  */}
        <div className="hidden md:block">
          <Player />
        </div>
        {/* mobile playler  */}
        <MobilePlayer />
      </div>

      {/* mobile bottombar  */}
      <MobileBottombar />
    </div>
  );
};

export default Sidebar;
