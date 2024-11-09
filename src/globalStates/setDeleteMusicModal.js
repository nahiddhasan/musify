import { create } from "zustand";

const setDeleteMusic = create((set)=>({
    isOpen:false,
    id:null,
    onOpen:(id)=>set({isOpen:true,id,}),
    onClose:()=>set({isOpen:false}),

}))

export default setDeleteMusic;