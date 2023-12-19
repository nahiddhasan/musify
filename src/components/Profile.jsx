"use client";
import useOutsideClick from "@/hooks/outSideClick";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const Profile = ({ user }) => {
  const [open, setOpen] = useState(false);
  const profileRef = useOutsideClick(() => {
    setOpen(false);
  });
  return (
    <div className="flex items-center gap-3 relative">
      <span className="bg-zinc-950 hover:bg-zinc-950/70 transition rounded-full p-2 cursor-pointer">
        <IoMdNotificationsOutline size={20} />
      </span>
      <div
        onClick={() => setOpen(!open)}
        className=" bg-zinc-950 hover:bg-zinc-950/70 transition rounded-full p-1 cursor-pointer"
      >
        <Image
          src={user.image || "/img/noavatar.jpg"}
          height={28}
          width={28}
          alt="Avatar"
          className=" object-cover rounded-full overflow-hidden"
        />
      </div>
      <div
        ref={profileRef}
        className={`${
          open
            ? "flex right-0 transition-all duration-300"
            : "hidden -right-[1000px] transition-all duration-300"
        } z-50 absolute top-[calc(100%+8px)] bg-zinc-800 shadow-md rounded-sm w-[180px] p-1 flex-col`}
      >
        <span className="hover:bg-zinc-700 transition px-3 p-2 rounded-sm">
          Account
        </span>
        <span className="hover:bg-zinc-700 transition px-3 p-2 rounded-sm">
          Profile
        </span>
        <span className="hover:bg-zinc-700 transition px-3 p-2 rounded-sm">
          Settings
        </span>
        <hr className="h-[1px] border-zinc-700" />
        <button
          onClick={() => signOut()}
          className="hover:bg-zinc-700 transition px-3 p-2 rounded-sm text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
