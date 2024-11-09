import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

//get single playlist
export const GET =async(req,{params})=>{
    const {id} = params;
    try {
        const playlist = await prisma.Playlist.findUnique({
            where:{
                id,
            },
            include:{
                creator:true,
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

// Update Playlist 
export const PATCH =async(req,{params})=>{
    const {id} = params;
    const session = await getAuthSession()

    const body =await req.json();
    
    if(!session){
        return new NextResponse(JSON.stringify({messege:"You are not Loged in!"},{status:200}))
   }

    try {
       const creator = await prisma.Playlist.findFirst({
           where:{
                id,
               creatorId:session.user.id,
           }
       })
       
       if(!creator){
        return new NextResponse(JSON.stringify({messege:"You are not owner of this playlist!"},{status:200}))
       }
       if(id && !body.songId){
        const updatedPlaylist = await prisma.playlist.update({
            where:{
                id:creator.id,
            },
            data:{
                ...body,
            },
        })
        return new NextResponse(JSON.stringify(updatedPlaylist,{status:200}))
       }
       if(creator.songIds.includes(body.songId)){
        const updatedPlaylist = await prisma.playlist.update({
            where:{
                id:creator.id,
            },
            data:{
                songs:{
                    disconnect: body.songId ? { id: body.songId } : undefined,
                }
            },
        })
        return new NextResponse(JSON.stringify(updatedPlaylist,{status:200}))
       }
        const updatedPlaylist = await prisma.playlist.update({
            where:{
                id:creator.id,
            },
            data:{
                songs:{
                    connect: body.songId ? { id: body.songId } : undefined,
                }
            },
        })
        return new NextResponse(JSON.stringify(updatedPlaylist,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  
    }
}

// Delete Playlist 
export const DELETE =async(req,{params})=>{
    const {id} = params;
    const session = await getAuthSession()
    
    if(!session){
         return new NextResponse(JSON.stringify({messege:"You are not Loged in!"},{status:200}))
    }

    try {
        const creator = await prisma.Playlist.findFirst({
            where:{
                id,
                creatorId:session.user.id,
            }
        })
        if(session.user.id !== creator.creatorId){
             return new NextResponse(JSON.stringify({messege:"You are not owner of this playlist!"},{status:200}))
        }
         await prisma.playlist.delete({
            where:{
                id:creator.id,
            },
        })
        return new NextResponse(JSON.stringify({messege:"Deleted..."},{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  
    }
}