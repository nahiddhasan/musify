import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET =async(req)=>{
    const session = await getAuthSession()
    try {
        if(!session){
            const allPlaylists = await prisma.Playlist.findMany({
                include:{
                    creator:true,
                    songs:{
                        include:{
                            artist:true,
                        }
                    },
                }
            })
            return new NextResponse(JSON.stringify({allPlaylists},{status:500}))
        }
            const userPlaylists = await prisma.Playlist.findMany({
                where:{
                    creatorId:session.user.id,
                },
                include:{
                    creator:true,
                }
            })
            const allPlaylists = await prisma.Playlist.findMany({
                include:{
                    creator:true,
                    songs:{
                        include:{
                            artist:true,
                        }
                    },
                }
            })

            return new NextResponse(JSON.stringify({userPlaylists,allPlaylists},{status:200}))


    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  
    }
}

//Create new playlist
export const POST =async(req)=>{
    const session = await getAuthSession()
    const body = await req.json();

    try {
        if(!session){
             return new NextResponse(JSON.stringify({messege:"You are not loged in"},{staus:500}))  
        }
        const user = await prisma.User.findUnique({
            where:{
                id:session.user.id
            }
        })

        if(!user){
            return new NextResponse(JSON.stringify({messege:"User not Found!"},{staus:500}))  
        }

        const newPlaylist = await prisma.Playlist.create({
            data:{
                ...body,creatorId:session.user.id,
            },
        })
        
        return new NextResponse(JSON.stringify(newPlaylist,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  
    }
}
