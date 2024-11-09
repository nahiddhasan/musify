"use client";
import setSongDetails from "@/globalStates/setSongDetails";
import useIsMobile from "@/hooks/useIsMobile";
import LeftSidebar from "./LeftSidebar";
import MobileBottombar from "./MobileBottombar";
import RightSidebar from "./RightSidebar";
import MobilePlayer from "./player/MobilePlayer";
import Player from "./player/Player";
const Sidebar = ({ children }) => {
  const { activeSong } = setSongDetails();
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col text-white w-full mx-auto h-full ">
      <div
        className={`flex gap-2 p-1 md:p-2  ${
          activeSong ? "h-[calc(100%-60px)]" : "h-full"
        }`}
      >
        {/* leftbar */}
        <LeftSidebar />
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
        <div className="hidden md:flex items-center justify-center bg-lime-500">
          {!isMobile && <Player />}
        </div>
        {/* mobile playler  */}
        {isMobile && <MobilePlayer />}
      </div>

      {/* mobile bottombar  */}
      <MobileBottombar />
    </div>
  );
};

export default Sidebar;
