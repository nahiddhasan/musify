import { create } from "zustand";

const setUpdatePlaylist = create((set)=>({
    isOpen:false,

    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),

}))

export default setUpdatePlaylist