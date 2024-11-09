import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async(req)=>{
    const session = await getAuthSession();
    if(!session){
        return new NextResponse(JSON.stringify({messege:"You are not loged in"},{staus:500}))           
    }
 
    try {
        const playlists = await prisma.playlist.findMany({
            where:{
                creatorId:session.user.id,
            }
        })
        
   return new NextResponse(JSON.stringify(playlists,{staus:200}))

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
