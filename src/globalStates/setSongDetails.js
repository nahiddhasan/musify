import { create } from "zustand";

const setSongDetails = create((set)=>({
    isOpen:false,
    isPlaying:false,
    playlist:[],
    activeSong:undefined,
    
    setPlaylist:(playlist)=>set({playlist}),
    setActiveSong:(song)=>set({activeSong:(song)}),
    reset:()=>set({playlist:[],activeSong:undefined}),

    onPlay:()=>set({isPlaying:true}),
    onPause:()=>set({isPlaying:false}),

    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),

}))

export default setSongDetails;[]