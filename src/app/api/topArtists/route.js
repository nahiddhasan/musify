import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async(req)=>{
    const {searchParams} = new URL(req.url)
    const skip = searchParams.get("skip" || "0");
    const take = searchParams.get("take" || "10");
    
    try {
        const artists = await prisma.user.findMany({
            where:{
                role:"ARTIST"
            },
            include:{
                song:true,
            },
            
            skip:parseInt(skip),
            take:parseInt(take),
        })
   return new NextResponse(JSON.stringify(artists,{staus:200}))

    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{staus:500})) 
    }
}
