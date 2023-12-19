"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FcMusic } from "react-icons/fc";
import { GoHome, GoHomeFill } from "react-icons/go";
import { MdLibraryMusic, MdOutlineLibraryMusic } from "react-icons/md";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";
import SidebarAddItem from "./SidebarAddItem";

const LeftSidebar = ({ playlists, likedPlaylist }) => {
  const { status } = useSession();
  const pathname = usePathname();
  const [colapse, setColapse] = useState(false);
  const currentPath = pathname.split("/")[2];
  return (
    <aside
      className={`${
        colapse
          ? "w-[70px] transition-all duration-300"
          : "w-[300px] transition-all duration-300"
      } flex flex-col gap-2 h-full`}
    >
      <div className="bg-zinc-900 rounded-md p-4 flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <FcMusic size={32} className="text-rose-700" />
          <span className={`font-bold ${colapse && "hidden"}`}>Musify</span>
        </Link>
        <Link
          href="/"
          className={`flex items-center gap-3 cursor-pointer ${
            pathname === "/"
              ? "font-bold !text-white"
              : "text-zinc-300 hover:text-white  transition "
          }`}
        >
          {pathname === "/" ? <GoHomeFill size={32} /> : <GoHome size={32} />}
          <span className={`${colapse && "hidden"}`}>Home</span>
        </Link>
        <Link
          href="/search"
          className={`flex items-center gap-3 cursor-pointer ${
            pathname === "/search"
              ? "font-bold text-white"
              : "text-zinc-300 hover:text-white  transition "
          }`}
        >
          {pathname === "/search" ? (
            <RiSearch2Fill size={32} />
          ) : (
            <RiSearch2Line size={32} />
          )}
          <span className={`${colapse && "hidden"}`}>Search</span>
        </Link>
      </div>
      <div className="bg-zinc-900 rounded-md p-4 overflow-auto h-full">
        <div className="flex items-center justify-between mb-3">
          <span
            onClick={() => setColapse(!colapse)}
            className="flex gap-3 items-center text-lg cursor-pointer"
          >
            {colapse ? (
              <MdLibraryMusic size={32} />
            ) : (
              <MdOutlineLibraryMusic size={32} />
            )}

            <span
              className={`hover:text-white text-zinc-300 transition ${
                colapse && "hidden"
              } `}
            >
              Your Library
            </span>
          </span>
          {/* add library options  */}
          <SidebarAddItem colapse={colapse} status={status} />
        </div>
        <div className="flex flex-col gap-1">
          {/* Liked songs  */}
          {status === "authenticated" && (
            <>
              {likedPlaylist?.songs?.length > 0 && (
                <Link
                  href="/liked"
                  className={`${
                    pathname === "/liked" && "bg-zinc-800/70"
                  } flex items-center gap-2 hover:bg-zinc-800 transition rounded-sm cursor-pointer ${
                    colapse ? "w-full p-[2px]" : "p-2"
                  }`}
                >
                  <span
                    className={`${
                      colapse ? "h-8 w-8" : "h-12 w-12"
                    } rounded-sm bg-slate-500 flex items-center justify-center relative overflow-hidden`}
                  >
                    <Image src={likedPlaylist.image} fill alt="music" />
                  </span>
                  <div className={`flex flex-col ${colapse && "hidden"}`}>
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
                    } flex items-center gap-2 hover:bg-zinc-800 transition rounded-sm cursor-pointer ${
                      colapse ? "w-full p-[2px]" : "p-2"
                    }`}
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

                    <div
                      className={`flex flex-col w-4/5 ${colapse && "hidden"}`}
                    >
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
          )}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;