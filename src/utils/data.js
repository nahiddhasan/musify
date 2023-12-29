import { getAuthSession } from "./auth";
import prisma from "./connect";

export const playlistAction = async ()=>{
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
            return allPlaylists;
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

            return {userPlaylists,allPlaylists}


    } catch (error) {
        console.log(error)
        return {messege:"something went wrong"}
    }
}

// liked playlist

export const likedPlaylistAction = async()=>{
    const session = await getAuthSession();

    try {
        if(!session){
            return {messege:"You are not loged in"}  
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
           return {messege:"User not Found!"} 
       }

       const likedPlaylist = user.likedPlaylist[0];

       if (!likedPlaylist) {
        return { message: "Liked playlist not found" };
    }
        return likedPlaylist;

    } catch (error) {
        console.log(error)
        return {messege:"something went wrong"}; 
    }
}