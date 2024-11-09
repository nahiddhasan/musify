"use client";
import setLoginModal from "@/globalStates/setLoginModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Profile from "./Profile";
import LoginLoader from "./loader/LoginLoader";

const Header = ({ children }) => {
  const router = useRouter();
  const { onOpen } = setLoginModal();
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <div className="sticky top-0 z-50">
      <div
        className={` w-full bg-zinc-900 flex items-center justify-between p-4 z-10`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="bg-zinc-950 hover:bg-zinc-950/70 disabled:cursor-default disabled:bg-zinc-800 disabled:hover:bg-zinc-800 transition rounded-full p-2 cursor-pointer"
          >
            <SlArrowLeft size={18} />
          </button>

          <button
            onClick={() => router.forward()}
            className="bg-zinc-950 hover:bg-zinc-950/70 disabled:cursor-default disabled:bg-zinc-800 disabled:hover:bg-zinc-800 transition rounded-full p-2 cursor-pointer"
          >
            <SlArrowRight size={18} />
          </button>
        </div>
        <div>
          {status === "loading" ? (
            <LoginLoader />
          ) : user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => onOpen()}
              className="px-4 p-1 rounded-full bg-white text-black  text-lg"
            >
              Log in
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
