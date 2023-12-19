import { create } from "zustand";

const setAddMusic = create((set)=>({
    isOpen:false,

    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),

}))

export default setAddMusic;