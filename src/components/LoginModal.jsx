"use client";
import setLoginModal from "@/globalStates/setLoginModal";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Modal from "./Modal";

const LoginModal = () => {
  const { onClose, isOpen } = setLoginModal();

  return (
    <div>
      {isOpen && (
        <Modal onClose={onClose} title={"Login to Musify"}>
          <div className="flex items-center justify-center flex-col gap-2 min-h-[250px]">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-2 ring-1 ring-zinc-600 hover:bg-zinc-600/70 px-4 p-2 text-white rounded-full"
              >
                <FaGoogle className="text-pink-600" />
                Login With google
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LoginModal;
