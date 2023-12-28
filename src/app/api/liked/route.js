import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

//Create or update Liked songs playlist
export const POST =async(req)=>{
    const session = await getAuthSession()
    const { searchParams } = new URL(req.url);
    const songId = searchParams.get("songId");

    try {
        if(!session){
             return new NextResponse(JSON.stringify({messege:"You are not loged in"},{staus:500}))  
        }
        const user = await prisma.User.findUnique({
            where:{
                id:session.user.id
            },
            include:{
                likedPlaylist:true,
            }
        })
        if(!user){
            return new NextResponse(JSON.stringify({messege:"User not Found!"},{staus:500}))  
        }

        const IsLikedPlaylist = user.likedPlaylist.find((playlist)=>playlist.title === "Liked Playlist")

        let isAlreadyLiked = false;

        if(IsLikedPlaylist){
            const songsInLikedPlaylist = IsLikedPlaylist.songIds.find((id)=>id === songId);
            isAlreadyLiked = !!songsInLikedPlaylist;
        }

        if(!IsLikedPlaylist){
            const newLikedPlaylist = await prisma.LikedPlaylist.create({
                data:{
                    title:"Liked Playlist",
                    image:"/img/love.png",
                    creator:{
                        connect:{
                            id:session.user.id,
                        }
                    },
                    songs:{
                        connect:{
                            id:songId,
                        }
                    }
                }
            })
        return new NextResponse(JSON.stringify({messege:"Song added to Liked songs"},{status:200}))    
        }
        
        
        if(isAlreadyLiked){
            await prisma.LikedPlaylist.update({
                where:{
                    id:IsLikedPlaylist.id,
                },
                data:{
                    songs:{
                        disconnect:{
                            id:songId,
                        }
                    }
                }
            })
        return new NextResponse(JSON.stringify({messege:"Song removed from Liked songs"},{status:200}))
        }
        
            await prisma.LikedPlaylist.update({
                where:{
                    id:IsLikedPlaylist.id,
                },
                data:{
                    songs:{
                        connect:{
                            id:songId,
                        }
                    }
                }
            })
        return new NextResponse(JSON.stringify({messege:"Song added to Liked songs"},{status:200}))
        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  
    }
}

export const GET = async(req)=>{
    const session = await getAuthSession();
    const { searchParams } = new URL(req.url);
    const songId = searchParams.get("songId");
    try {
        if(!session){
            return new NextResponse(JSON.stringify({messege:"You are not loged in"},{staus:500}))  
       }
       const user = await prisma.User.findUnique({
        where: {
            id: session.user.id,
        },
        include: {
            likedPlaylist: {
                where: {
                    creatorId:session.user.id,
                    title: "Liked Playlist",
                },
                include: {
                    songs: {
                        include:{
                            artist:true,
                        }
                    },
                },
            },
        },
    });
       if(!user){
           return new NextResponse(JSON.stringify({messege:"User not Found!"},{staus:500}))  
       }

       const likedPlaylist = user.likedPlaylist[0];

       if (!likedPlaylist) {
        return new NextResponse(JSON.stringify({ message: "Liked playlist not found" }, { status: 404 }));
    }
        return new NextResponse(JSON.stringify(likedPlaylist,{staus:500}))  

    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  

    }
}