"use client";
import Playlist from "@/components/Playlist";
import SidebarAddItem from "@/components/SidebarAddItem";
import { usePathname } from "next/navigation";

const Library = () => {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];
  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-md">
        <h1 className="text-xl">Your Library</h1>
        <SidebarAddItem colapse={false} />
      </div>
      <div className="flex flex-col gap-1">
        <Playlist
          currentPath={currentPath}
          colapse={false}
          pathname={pathname}
        />
      </div>
    </div>
  );
};

export default Library;
