import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { revalidatePath } from "next/cache";
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

export const DELETE =async(req,{params})=>{
    const {id} = params;
    const session = await getAuthSession()
    
    if(!session){
         return new NextResponse(JSON.stringify({messege:"You are not Loged in!"},{status:200}))
    }

    try {
        const song = await prisma.song.findUnique({
            where:{
                id,
            }
        })
        
        if(!song){
            return new NextResponse(JSON.stringify("Song Not Found!"))
        }
        if(song.artistId !== session.user.id){
            return new NextResponse(JSON.stringify("You are not Authorized!"))
        }
       const res = await prisma.song.delete({
        where:{
            id:song.id,
        }
       })
        return new NextResponse(JSON.stringify({messege:"Song Deleted..."},{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  
    }
}
export const PATCH =async(req,{params})=>{
    const {id} = params;
   const body = await req.json();

    const session = await getAuthSession()
  
    if(!session){
         return new NextResponse(JSON.stringify({messege:"You are not Loged in!"},{status:200}))
    }

    try {
        const song = await prisma.song.findUnique({
            where:{
                id,
            }
        })

        if(!song){
            return new NextResponse(JSON.stringify("Song Not Found!"))
        }

        if(song.artistId !== session.user.id){
            return new NextResponse(JSON.stringify("You are not Authorized!"))
        }

       await prisma.song.update({
        where:{
            id:song.id,
        },
        data:{
           ...body
        }
       })
       revalidatePath(`/track/${song.id}`)
        return new NextResponse(JSON.stringify({messege:"Song Updated..."},{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  
    }
}
