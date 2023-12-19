import Banner from "@/components/Banner";
import MainContent from "@/components/MainContent";
import { Suspense } from "react";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <div className="p-4 mt-2 mb-7 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Newest Songs</h1>
          <span className="hover:underline cursor-pointer">See all</span>
        </div>
        <Suspense fallback={<p>Loading songs...</p>}>
          <MainContent />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
