"use client";

import { useEffect, useState } from "react";
import AddMusicModal from "../AddMusicModal";
import DeleteMusicModal from "../DeleteMusicModal";
import DeletePlaylistModal from "../DeletePlaylistModal";
import LoginModal from "../LoginModal";
import UpdateMusicModal from "../UpdateMusicModal";
import UpdatePlaylistModal from "../UpdatePlaylistModal";

const ModalWrapper = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div>
      <LoginModal />
      <AddMusicModal />
      <UpdateMusicModal />
      <UpdatePlaylistModal />
      <DeleteMusicModal />
      <DeletePlaylistModal />
    </div>
  );
};

export default ModalWrapper;
