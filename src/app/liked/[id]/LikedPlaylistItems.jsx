"use client";
import LikeSong from "@/components/LikeSong";
import MoreOptions from "@/components/MoreOptions";
import setPlayPause from "@/globalStates/setPlayPause";
import setSongDetails from "@/globalStates/setSongDetails";
import Link from "next/link";
import { FaPause, FaPlay } from "react-icons/fa6";

const LikedPlaylistItems = ({ playlist }) => {
  const {
    playlist: pl,
    setActiveSong,
    setPlaylist,
    activeSong,
    onOpen,
  } = setSongDetails();
  const { isPlaying, setPlay, setPause } = setPlayPause();

  const handlePlay = (id, index) => {
    if (isPlaying && id === activeSong?.id) {
      setPause();
    } else {
      if (!pl.songs || playlist.id !== pl.id) {
        setPlaylist(playlist);
        setActiveSong(playlist.songs[index]);
        setPlay();
        onOpen();
      } else {
        const currentIndex = pl.songs.findIndex((song) => song.id === id);
        setActiveSong(pl.songs[currentIndex]);
        setPlay();
      }
    }
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right">
      <thead className="">
        <tr className="border-b border-zinc-600">
          <th className="px-2 md:px-6 py-2">#</th>
          <th className="px-2 md:px-6 py-2">Title</th>
          <th className="px-2 md:px-6 py-2 hidden md:block">Album</th>
          <th className="px-2 md:px-6 py-2"></th>
          <th className="px-2 md:px-6 py-2 hidden md:block">Duration</th>
          <th className="px-2 md:px-6 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {playlist.songs?.map((item, index) => (
          <tr
            key={item.id}
            className={`${
              activeSong?.id === item.id && "bg-zinc-700"
            } hover:bg-zinc-800 transition rounded-md my-2 group/table relative `}
          >
            <td className="px-2 md:px-6 py-2">
              <div className="w-8">
                {isPlaying &&
                playlist.id === pl?.id &&
                activeSong?.id === item.id ? (
                  <svg
                    className="group-hover/table:hidden"
                    width="10"
                    height="16"
                    viewBox="0 0 206 209"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      className="animate-bounce"
                      y="61"
                      width="29"
                      height="148"
                      rx="14.5"
                      fill="#16a34a"
                    />
                    <rect
                      className="animate-bounce"
                      x="177"
                      y="32"
                      width="29"
                      height="177"
                      rx="14.5"
                      fill="#16a34a"
                    />
                    <rect
                      className="animate-bounce"
                      x="118"
                      y="103"
                      width="29"
                      height="106"
                      rx="14.5"
                      fill="#16a34a"
                    />
                    <rect
                      className="animate-bounce"
                      x="59"
                      width="29"
                      height="209"
                      rx="14.5"
                      fill="#16a34a"
                    />
                  </svg>
                ) : (
                  <span className="group-hover/table:hidden px-2">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className=" hidden group-hover/table:block absolute left-2 md:left-6 top-[50%] -translate-y-[50%]">
                <button className="" onClick={() => handlePlay(item.id, index)}>
                  {isPlaying &&
                  playlist.id === pl?.id &&
                  item.id === activeSong?.id ? (
                    <FaPause size={18} />
                  ) : (
                    <FaPlay size={18} />
                  )}
                </button>
              </div>
            </td>
            <td className="px-2 md:px-6 py-2 max-w-[200px] truncate font-medium whitespace-nowrap text-white">
              <Link
                href={`/track/${item.id}`}
                className={`${
                  playlist.id === pl?.id &&
                  activeSong?.id === item.id &&
                  "text-green-600"
                }`}
              >
                <span>{item.title}</span>
                <span className="md:hidden">{item.album && item.album}</span>
              </Link>
            </td>
            <td className="hidden md:block px-2 md:px-6 py-2 truncate font-medium whitespace-nowrap text-white">
              {item.album && item.album}
            </td>
            <td className="px-2 md:px-6 py-2">
              <LikeSong isLiked={false} songId={item.id} />
            </td>
            <td className="px-2 md:px-6 py-2 hidden md:block">
              {item.duration}
            </td>
            <td className="px-2 md:px-6 py-2 md:opacity-0 md:group-hover/table:opacity-100">
              <MoreOptions
                playlist={playlist}
                playlists={playlist}
                songId={item.id}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LikedPlaylistItems;
