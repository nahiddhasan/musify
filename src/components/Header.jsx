"use client";
import setLoginModal from "@/globalStates/setLoginModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Profile from "./Profile";

const Header = ({ children }) => {
  const router = useRouter();
  const { onOpen } = setLoginModal();
  const { data: session } = useSession();
  const user = session?.user;
  const [active, setActive] = useState(false);
  const isActive = () => {
    console.log(window.scrollY);
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <div
        className={` w-full bg-zinc-900 flex items-center justify-between p-4 z-10`}
      >
        <div className="flex items-center gap-2">
          <span
            onClick={() => router.back()}
            className="bg-zinc-950 hover:bg-zinc-950/70 transition rounded-full p-2 cursor-pointer"
          >
            <SlArrowLeft size={18} />
          </span>

          <span
            onClick={() => router.forward()}
            className="bg-zinc-950 hover:bg-zinc-950/70 transition rounded-full p-2 cursor-pointer"
          >
            <SlArrowRight size={18} />
          </span>
        </div>
        <div>
          {user ? (
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
