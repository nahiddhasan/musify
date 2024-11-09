"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FcMusic } from "react-icons/fc";
import { GoHome, GoHomeFill } from "react-icons/go";
import { MdLibraryMusic, MdOutlineLibraryMusic } from "react-icons/md";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";
import Playlist from "./Playlist";
import SidebarAddItem from "./SidebarAddItem";

const LeftSidebar = () => {
  const pathname = usePathname();
  const [colapse, setColapse] = useState(false);
  const currentPath = pathname.split("/")[2];

  return (
    <aside
      className={`hidden md:flex flex-col gap-2 h-full transition-all duration-300 ${
        colapse ? "w-[70px]" : "w-[300px]"
      }`}
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
              : "text-zinc-300 hover:text-white transition"
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
              : "text-zinc-300 hover:text-white transition"
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

      <div className="relative bg-zinc-900 rounded-md overflow-auto h-full no-scrollbar">
        <div className="sticky top-0 left-0 flex items-center justify-between z-10 bg-zinc-900 p-4 pb-2">
          <div
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
              }`}
            >
              Your Library
            </span>
          </div>
          <SidebarAddItem colapse={colapse} />
        </div>

        <Playlist
          currentPath={currentPath}
          colapse={colapse}
          pathname={pathname}
        />
      </div>
    </aside>
  );
};

export default LeftSidebar;
