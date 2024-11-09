import { create } from "zustand";

const setDeletePlaylist = create((set)=>({
    isOpen:false,
    id:null,
    onOpen:(id)=>set({isOpen:true,id,}),
    onClose:()=>set({isOpen:false}),

}))

export default setDeletePlaylist;