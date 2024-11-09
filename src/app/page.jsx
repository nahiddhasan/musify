import Banner from "@/components/Banner";
import NewestSongs from "@/components/NewestSongs";
import PlaylistContent from "@/components/PlaylistContent";
import MusicLoader from "@/components/loader/MusicLoader";
import { Suspense } from "react";

const Home = () => {
  return (
    <div className="">
      <Banner />
      {/* <Suspense fallback={<MusicLoader />}>
        <TopArtists />
      </Suspense> */}
      <Suspense fallback={<MusicLoader />}>
        <NewestSongs />
      </Suspense>
      <Suspense fallback={<MusicLoader />}>
        <PlaylistContent />
      </Suspense>
    </div>
  );
};

export default Home;
