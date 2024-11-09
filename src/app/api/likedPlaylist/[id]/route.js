import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET =async(req,{params})=>{
    const {id} = params;

    try {
        const playlist = await prisma.likedPlaylist.findUnique({
            where:{
                id,
            },
            include:{
                songs:{
                    include:{
                        artist:true,
                    }
                },
            }
        })

        return new NextResponse(JSON.stringify(playlist,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  
    }
}