import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

//upload new song
export const POST =async(req)=>{
    const session = await getAuthSession()
    const body = await req.json();

    try {
        if(!session){
        return new NextResponse(JSON.stringify({messege:"You are not loged in"},{staus:500}))  
        }
        const newSong = await prisma.Song.create({
            data:{
                ...body,artistId:session.user.id,
            },
        })
        return new NextResponse(JSON.stringify(newSong,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  
    }
}

//get all songs
export const GET =async(req)=>{
    const {searchParams} = new URL(req.url)
    const search = searchParams.get("search")

    try {
        const songs = await prisma.Song.findMany({
            where:{
                ...(search && { title: {contains: search,mode:"insensitive"} }),
            },
            include:{
                artist:true,
            }
        })
        return new NextResponse(JSON.stringify(songs,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500}))  
    }
}