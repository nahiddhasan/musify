const PlSongsLoader = () => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4 h-[280px] ">
        <div className="w-[250px] shadow-md">
          <div className="flex flex-col items-center justify-center rounded-md bg-zinc-600/80 animate-pulse">
            <div className="h-full w-full relative aspect-square"></div>
          </div>
        </div>
        <div className="w-3/4 flex flex-col gap-2 h-full justify-center">
          <span className="w-1/2 h-6 bg-zinc-600"></span>
          <h1
            className={`text-7xl truncate font-bold mb-2 w-3/4 h-16 bg-zinc-600 animate-pulse`}
          ></h1>
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-full bg-zinc-600 animate-pulse"></span>
            <span className="w-1/3 h-6 bg-zinc-600 animate-pulse"></span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-full bg-zinc-600"></div>
        <div className="h-6 w-12 bg-zinc-600 rounded-sm"></div>
      </div>
      <div className="flex gap-2 flex-col">
        <div className="w-full h-9 bg-zinc-600 animate-pulse rounded-sm"></div>
        <div className="w-full h-9 bg-zinc-600 animate-pulse rounded-sm"></div>
        <div className="w-full h-9 bg-zinc-600 animate-pulse rounded-sm"></div>
      </div>
    </div>
  );
};

export default PlSongsLoader;
