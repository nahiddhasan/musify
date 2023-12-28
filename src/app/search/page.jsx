"use client";
import LikeSong from "@/components/LikeSong";
import setPlayPause from "@/globalStates/setPlayPause";
import setSongDetails from "@/globalStates/setSongDetails";
import debounce from "debounce";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";

const SearchPage = () => {
  const [search, setSearch] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const { setActiveSong, setPlaylist, activeSong, onOpen } = setSongDetails();
  const { isPlaying, setPlay, setPause } = setPlayPause();
  const searchPl = {
    id: "searchPl",
    songs: searchData,
  };
  const handleChange = debounce((e) => {
    if (e.target.value) {
      e.target.value.length > 2 && setSearch(e.target.value);
    } else {
      setSearch(null);
    }
  }, 500);

  useEffect(() => {
    const searchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/track?search=${search}`
      );
      const data = await res.json();
      setSearchData(data);
    };
    searchData();
  }, [search]);

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

  return (
    <div className="p-4 flex items-center flex-col">
      <div className="flex items-center w-full md:w-1/2 ring-1 ring-zinc-600 rounded-full justify-between px-2">
        <input
          className=" p-2 bg-transparent border-none outline-none"
          type="text"
          onChange={handleChange}
          placeholder="Search..."
        />
        <span className="p-2">
          <GoSearch size={20} />
        </span>
      </div>
      {/* search data  */}
      <div className="my-4 w-full md:w-1/2">
        {searchData &&
          searchData.map((music, index) => (
            <div
              key={index}
              className="flex-1 flex justify-between items-center hover:bg-zinc-700 rounded-md p-2 "
            >
              <div className="flex items-center gap-2">
                <div className="h-[40px] w-[40px] relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src={music.image || "/img/music.svg"}
                    alt="cover image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="">
                  <Link
                    href={`/track/${music.id}`}
                    className="capitalize truncate"
                  >
                    {music.title}
                  </Link>
                  <p className="text-sm truncate">{music.artist.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LikeSong songId={music.id} />
                <button onClick={() => handlePlay(music.id, index)}>
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
