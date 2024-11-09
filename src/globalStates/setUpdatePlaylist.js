import { create } from "zustand";

const setUpdatePlaylist = create((set)=>({
    isOpen:false,
    id:null,
    onOpen:(id)=>set({isOpen:true,id}),
    onClose:()=>set({isOpen:false}),

}))

export default setUpdatePlaylist