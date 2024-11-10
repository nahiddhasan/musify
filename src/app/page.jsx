import Banner from "@/components/Banner";
import MusicLoader from "@/components/loader/MusicLoader";
import NewestSongs from "@/components/NewestSongs";
import PlaylistContent from "@/components/PlaylistContent";
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
