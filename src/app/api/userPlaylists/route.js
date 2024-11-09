import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async(req)=>{
    const {searchParams} = new URL(req.url)
    const skip = searchParams.get("skip" || "0");
    const take = searchParams.get("take" || "10");
    
    try {
        const playlists = await prisma.playlist.findMany({
            include:{
                creator:true,
                songs:{
                    include:{
                        artist:true,
                    }
                },
            },
            orderBy:{
                createdAt:"desc"
            },
            skip:parseInt(skip),
            take:parseInt(take),
        })
   return new NextResponse(JSON.stringify(playlists,{staus:200}))

    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500})) 
    }
}
