import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET =async(req,{params})=>{
    const {id} = params;
    try {
        const song = await prisma.Song.findUnique({
            where:{
                id,
            },
            include:{
                artist:true,
            }
        })
        return new NextResponse(JSON.stringify(song,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  
    }
}