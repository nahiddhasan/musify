"use server"

// import { headers } from "next/headers";

//get all playlists
export const getPlaylist = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/playlist`, {
    cache: "no-store",
    method:"GET",
    // headers:headers(),
    });
    if (!res.ok) {
      return "Something went wrong";
    }
    const data = await res.json()
    return data;
  };

  //get singleplaylist
  export const getSinglePlaylist = async (id) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/playlist/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        return "Something went wrong";
      }
      const data = await res.json()
      return data;
    };
  
  //get all songs
export const getSongs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/track`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return "Something went wrong";
  }
  const data = await res.json()
  return data;
};

 //get singleSong
 export const getSingleSong = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/track/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return "Something went wrong";
  }
  const data = await res.json()
  return data;
};

  //get likedPlaylist
  export const getLikedPlaylist = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/liked`, {
      cache: "no-store",
      method:"GET",
      // headers:headers()
    });
    if (!res.ok) {
      return "Something went wrong";
    }
    const data = await res.json()
    return data;
  };
