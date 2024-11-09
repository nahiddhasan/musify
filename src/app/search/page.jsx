"use client";
import LikeSong from "@/components/LikeSong";
import setPlayPause from "@/globalStates/setPlayPause";
import setSongDetails from "@/globalStates/setSongDetails";
import fetcher from "@/utils/fetcher";
import debounce from "debounce";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import useSWR from "swr";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const { setActiveSong, setPlaylist, activeSong, onOpen } = setSongDetails();
  const { isPlaying, setPlay, setPause } = setPlayPause();

  const handleChange = debounce((e) => {
    const value = e.target.value.trim();
    setSearch(value.length > 2 ? value : "");
  }, 500);

  const {
    data: searchData,
    isLoading,
    error,
  } = useSWR(
    search
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/tracks?search=${search}&skip=0&take=10`
      : null,
    fetcher
  );

  const searchPl = {
    id: "searchPl",
    songs: searchData?.songs || [],
  };

  const handlePlay = (id, index) => {
    if (isPlaying && id === activeSong?.id) {
      setPause();
    } else {
      setPlaylist(searchPl);
      setActiveSong(searchPl.songs[index]);
      setPlay();
      onOpen();
    }
  };

  if (error) {
    return <div>Error fetching search results.</div>;
  }

  return (
    <div className="p-4 flex items-center flex-col">
      <div className="flex items-center w-full md:w-1/2 ring-1 ring-zinc-600 rounded-full justify-between px-2">
        <input
          className="p-2 bg-transparent border-none outline-none"
          type="text"
          onChange={handleChange}
          placeholder="Search..."
        />
        <span className="p-2">
          <GoSearch size={20} />
        </span>
      </div>
      {/* search data */}
      <div className="my-4 w-full md:w-1/2">
        {isLoading
          ? "Loading..."
          : searchData?.songs?.map((music, index) => (
              <div
                key={music.id}
                className="flex-1 flex justify-between items-center hover:bg-zinc-700 rounded-md p-2"
              >
                <div className="flex items-center gap-2">
                  <div className="h-[40px] w-[40px] relative aspect-square overflow-hidden rounded-md">
                    <Image
                      src={music.image || "/img/music.svg"}
                      alt={`${music.title} cover`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/track/${music.id}`}
                      className="capitalize truncate"
                    >
                      {music.title}
                    </Link>
                    <p className="text-sm truncate">{music.artist.name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <LikeSong songId={music.id} />
                  <button
                    onClick={() => handlePlay(music.id, index)}
                    aria-label={
                      isPlaying && music.id === activeSong?.id
                        ? "Pause"
                        : "Play"
                    }
                  >
                    {isPlaying && music.id === activeSong?.id ? (
                      <FaPause size={18} />
                    ) : (
                      <FaPlay size={18} />
                    )}
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SearchPage;
