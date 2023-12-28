import Banner from "@/components/Banner";
import MainContent from "@/components/MainContent";
import PlaylistContent from "@/components/PlaylistContent";
import MusicLoader from "@/components/loader/MusicLoader";
import { Suspense } from "react";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <Suspense fallback={<MusicLoader />}>
        <div className="p-4 mt-2 mb-7 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Newest Songs</h1>
            <span className="hover:underline cursor-pointer">See all</span>
          </div>
          <MainContent />
        </div>
      </Suspense>
      <Suspense fallback={<MusicLoader />}>
        <div className="p-4 mt-2 mb-7 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Playlists</h1>
            <span className="hover:underline cursor-pointer">See all</span>
          </div>
          <PlaylistContent />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
