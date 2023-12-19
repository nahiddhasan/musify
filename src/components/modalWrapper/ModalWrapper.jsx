"use client";

import { useEffect, useState } from "react";
import AddMusicModal from "../AddMusicModal";
import LoginModal from "../LoginModal";

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
    </div>
  );
};

export default ModalWrapper;
