const MusicLoader = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4 -z-0">
      {Array(10)
        .fill(1)
        .map((i, index) => (
          <div
            key={index}
            className=" flex flex-col items-center justify-center rounded-md bg-zinc-800/40 p-3"
          >
            <div className="bg-zinc-700 h-full w-full relative aspect-square rounded-sm animate-pulse"></div>
            <div className="flex flex-col items-start w-full pt-2 md:pt-4 gap-y-1">
              <p className="w-full h-5 bg-zinc-700 rounded-md animate-pulse "></p>
              <p className="w-1/2 h-5 bg-zinc-700 rounded-md animate-pulse"></p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MusicLoader;
