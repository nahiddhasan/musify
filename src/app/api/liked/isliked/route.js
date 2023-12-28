import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async(req)=>{
    const session = await getAuthSession();
    const { searchParams } = new URL(req.url);
    const songId = searchParams.get("songId");
    try {
        if(!session){
            const isLiked = false;
            return new NextResponse(JSON.stringify(isLiked,{staus:500}))  
       }
       const user = await prisma.User.findUnique({
        where: {
            id: session.user.id,
        },
        include: {
            likedPlaylist: {
                where: {
                    title: "Liked Playlist",
                },
                include: {
                    songs: true,
                },
            },
        },
    });
       if(!user){
           return new NextResponse(JSON.stringify({messege:"User not Found!"},{staus:500}))  
       }

       const likedPlaylist = user.likedPlaylist[0];

       if (!likedPlaylist) {
        const isLiked = false;
        return new NextResponse(JSON.stringify(isLiked, { status: 404 }));
    }

    const isLiked = likedPlaylist.songs.some((song) => song.id === songId);

    return new NextResponse(JSON.stringify(isLiked,{staus:500}))  

    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  

    }
}