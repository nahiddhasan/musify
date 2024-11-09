import { create } from "zustand";

const setUpdateMusic = create((set)=>({
    isOpen:false,
    id:null,
    onOpen:(id)=>set({isOpen:true,id,}),
    onClose:()=>set({isOpen:false}),

}))

export default setUpdateMusic;