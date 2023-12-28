const PlaylistLoader = () => {
  return (
    <>
      {Array(5)
        .fill(1)
        .map((i, index) => (
          <div key={index} className={`flex items-center gap-2 rounded-sm p-2`}>
            <span
              className={`h-12 w-16 rounded-sm bg-zinc-600 flex items-center justify-center animate-pulse`}
            ></span>
            <div className={`flex flex-col w-full gap-2 `}>
              <span className="h-5 w-4/5 bg-zinc-600 rounded-sm animate-pulse"></span>
              <span className="h-5 w-1/2 bg-zinc-600 rounded-sm animate-pulse"></span>
            </div>
          </div>
        ))}
    </>
  );
};

export default PlaylistLoader;
