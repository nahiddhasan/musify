import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async()=>{
    const session = await getAuthSession();
    if(!session){
        return new NextResponse(JSON.stringify({messege:"You are not loged in"},{staus:500}))           
   }

    try {
    const likedPlaylist = await prisma.likedPlaylist.findFirst({
        where: {
            creatorId:session.user.id,
            title: "Liked Playlist",
        }
        
    })

   return new NextResponse(JSON.stringify(likedPlaylist,{staus:200}))

    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500})) 
    }
}

