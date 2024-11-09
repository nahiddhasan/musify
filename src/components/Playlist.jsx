"use client";
import fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import PlaylistLoader from "./loader/PlaylistLoader";

const Playlist = ({ colapse, currentPath, pathname }) => {
  const { data: playlists, isLoading: playlistLoading } = useSWR(
    "/api/playlists",
    fetcher
  );
  const { data: likedPlaylist, isLoading: isLikedPlLoading } = useSWR(
    "/api/likedPlaylist",
    fetcher
  );

  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  return (
    <div className="flex flex-col gap-1 p-4 pt-2">
      <>
        {isLikedPlLoading ? (
          <div className={`flex items-center gap-2 rounded-sm p-2`}>
            <span
              className={`h-12 w-16 rounded-sm bg-zinc-600 flex items-center justify-center animate-pulse`}
            ></span>
            <div className={`flex flex-col w-full gap-2 `}>
              <span className="h-5 w-4/5 bg-zinc-600 rounded-sm animate-pulse"></span>
              <span className="h-5 w-1/2 bg-zinc-600 rounded-sm animate-pulse"></span>
            </div>
          </div>
        ) : (
          likedPlaylist?.songIds?.length > 0 && (
            <Link
              href={`/liked/${likedPlaylist.id}`}
              className={`flex items-center gap-2 hover:bg-zinc-800 transition rounded-sm cursor-pointer ${
                pathname === "/liked" && "bg-zinc-800/70"
              } ${colapse ? "w-full p-[2px]" : "p-2"}`}
            >
              <span
                className={`${
                  colapse ? "h-8 w-8" : "h-12 w-12"
                } rounded-sm bg-slate-500 flex items-center justify-center relative overflow-hidden`}
              >
                <Image
                  src={likedPlaylist.image || "/img/default.jpg"}
                  fill
                  alt="music"
                />
              </span>
              <div className={`flex flex-col ${colapse && "hidden"}`}>
                <span>{likedPlaylist.title}</span>
                <span className="text-sm text-zinc-200">
                  {likedPlaylist.songIds.length} songs
                </span>
              </div>
            </Link>
          )
        )}

        {playlistLoading ? (
          <PlaylistLoader colapse={colapse} />
        ) : (
          playlists &&
          playlists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlist/${playlist.id}`}
              className={`flex items-center gap-2 hover:bg-zinc-800 transition rounded-sm cursor-pointer ${
                currentPath === playlist.id && "bg-zinc-800/60"
              } ${colapse ? "w-full p-[2px]" : "p-2"}`}
            >
              <div
                className={`${
                  colapse ? "h-8 w-8" : "h-12 w-1/5"
                } bg-zinc-800 rounded-sm flex items-center justify-center relative overflow-hidden`}
              >
                <Image
                  src={playlist.image || "/img/music.svg"}
                  fill
                  alt="music"
                />
              </div>
              <div className={`flex flex-col w-4/5 ${colapse && "hidden"}`}>
                <span className="truncate">{playlist.title}</span>
                <div className="flex gap-1 truncate">
                  <span className="text-sm text-zinc-200">Playlist</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </>
    </div>
  );
};

export default Playlist;
