"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FcMusic } from "react-icons/fc";
import { GoHome, GoHomeFill } from "react-icons/go";
import { MdLibraryMusic, MdOutlineLibraryMusic } from "react-icons/md";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";

const MobileBottombar = () => {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];

  return (
    <div className="md:hidden w-full h-12 absolute bottom-0 left-0 bg-zinc-900 p-4 flex justify-between gap-4">
      <Link href="/" className="flex items-center  gap-3 cursor-pointer">
        <FcMusic size={32} className="text-rose-700" />
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
      </Link>
      <Link
        href="/mobilelibrary"
        className={`flex items-center gap-3 cursor-pointer ${
          pathname === "/"
            ? "font-bold !text-white"
            : "text-zinc-300 hover:text-white  transition "
        }`}
      >
        {pathname === "/mobilelibrary" ? (
          <MdLibraryMusic size={32} />
        ) : (
          <MdOutlineLibraryMusic size={32} />
        )}
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
      </Link>
    </div>
  );
};

export default MobileBottombar;
