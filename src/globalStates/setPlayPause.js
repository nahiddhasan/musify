import { create } from "zustand";

const setPlayPause = create((set) => ({
    isPlaying: false,
  
    setPlay:()=>set({isPlaying:true}),
    setPause:()=>set({isPlaying:false})
  }));

export default setPlayPause;