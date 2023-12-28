"use client";
import SidebarAddItem from "@/components/SidebarAddItem";
import PlaylistLoader from "@/components/loader/PlaylistLoader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Library = ({ likedPlaylist, playlists }) => {
  const { status } = useSession();
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];
  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-md">
        <h1 className="text-xl">Your Library</h1>
        <SidebarAddItem status={status} />
      </div>
      <div className="flex flex-col gap-1">
        {/* Liked songs  */}
        {status === "loading" ? (
          <PlaylistLoader />
        ) : (
          status === "authenticated" && (
            <>
              {likedPlaylist?.songs?.length > 0 && (
                <Link
                  href="/liked"
                  className={`${
                    pathname === "/liked" && "bg-zinc-800/70"
                  } my-3 ring-1 ring-zinc-800 flex items-center gap-2 hover:bg-zinc-800 transition rounded-sm cursor-pointer `}
                >
                  <span
                    className={`h-16 w-16 rounded-sm bg-slate-500 flex items-center justify-center relative overflow-hidden`}
                  >
                    <Image src={likedPlaylist.image} fill alt="music" />
                  </span>
                  <div className={`flex flex-col`}>
                    <span>{likedPlaylist.title}</span>
                    <span className="text-sm text-zinc-200">
                      {likedPlaylist.songs.length} songs
                    </span>
                  </div>
                </Link>
              )}
              {/* Playlist  */}
              {playlists.length > 0 &&
                playlists.map((playlist) => (
                  <Link
                    key={playlist.id}
                    href={`/playlist/${playlist.id}`}
                    className={`${
                      currentPath === playlist.id && "bg-zinc-800/60"
                    } mb-3 ring-1 ring-zinc-800  flex items-center gap-2 hover:bg-zinc-800 transition rounded-sm cursor-pointer `}
                  >
                    <div
                      className={`h-16 w-16 bg-zinc-800 rounded-sm flex items-center justify-center relative overflow-hidden`}
                    >
                      <Image
                        src={playlist.image || "/img/music.svg"}
                        fill
                        alt="music"
                      />
                    </div>

                    <div className={`flex flex-col w-4/5 `}>
                      <span className="truncate">{playlist.title}</span>
                      <div className="flex gap-1 truncate">
                        <span className="text-sm text-zinc-200">Playlist</span>
                        <span className="text-sm font-semibold text-zinc-200">
                          {playlist.creator.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Library;
