"use client";
import LikeSong from "@/components/LikeSong";
import MoreOptions from "@/components/MoreOptions";
import setSongDetails from "@/globalStates/setSongDetails";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

const PlayListItems = ({ playlist, playlists }) => {
  const {
    playlist: pl,
    setActiveSong,
    setPlaylist,
    activeSong,
  } = setSongDetails();

  const handlePlay = (id, index) => {
    if (!pl.songs || playlist.id !== pl.id) {
      setPlaylist(playlist);
      setActiveSong(playlist.songs[index]);
    } else {
      const currentIndex = pl.songs.findIndex((song) => song.id === id);
      setActiveSong(pl.songs[currentIndex]);
    }
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right">
      <thead className="">
        <tr className="border-b">
          <th className="px-6 py-2">#</th>
          <th className="px-6 py-2">Title</th>
          <th className="px-6 py-2">Album</th>
          <th className="px-6 py-2">Date Added</th>
          <th className="px-6 py-2"></th>
          <th className="px-6 py-2">Duration</th>
          <th className="px-6 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {playlist.songs.map((item, index) => (
          <tr
            key={item.id}
            className={`${
              activeSong?.id === item.id && "bg-zinc-700"
            } hover:bg-zinc-800 transition rounded-md my-2 group/table relative`}
          >
            <td className="px-6 py-2">
              <span className="group-hover:hidden">{index + 1}</span>
              <div className="hidden group-hover/table:block absolute left-5 top-[50%] -translate-y-[50%]">
                <FaPlay
                  onClick={() => handlePlay(item.id, index)}
                  size={18}
                  className="cursor-pointer"
                />
              </div>
            </td>
            <td className="px-6 py-2 truncate font-medium whitespace-nowrap text-white">
              <Link
                href={`/track/${item.id}`}
                className={`${
                  playlist.id === pl.id &&
                  activeSong?.id === item.id &&
                  "text-green-600"
                }`}
              >
                {item.title}
              </Link>
            </td>
            <td className="px-6 py-2 truncate font-medium whitespace-nowrap text-white">
              {item.album && item.album}
            </td>
            <td className="px-6 py-2">123</td>
            <td className="px-6 py-2">
              <LikeSong isLiked={false} songId={item.id} />
            </td>
            <td className="px-6 py-2">{item.duration}</td>
            <td className="px-6 py-2 opacity-0 group-hover/table:opacity-100">
              <MoreOptions
                playlist={playlist}
                playlists={playlists}
                songId={item.id}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlayListItems;
