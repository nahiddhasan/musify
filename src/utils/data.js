"use server"


export const getUserPlaylists = async (skip,take) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userPlaylists?take=${take}&skip=${skip}`, {
    cache: "no-store",
  });
 
  if (!res.ok) {
    return "Something went wrong";
  }
  const data = await res.json();
  return data;
};
export const getTopArtists = async (skip,take) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topArtists?take=${take}&skip=${skip}`, {
    cache: "no-store",
  });
 
  if (!res.ok) {
    return "Something went wrong";
  }
  const data = await res.json();
  return data;
};

export const getSinglePlaylist = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/playlists/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return "Something went wrong";
    }
    const data = await res.json()
    return data;
  };

export const getPlaylists = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/playlists`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return "Something went wrong";
    }
    const data = await res.json()
    return data;
  };

  export const getLikedPlSongs = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/likedPlaylist/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return "Something went wrong";
    }
    const data = await res.json()
    return data;
  };

  export const getLikedPlaylist = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/likedPlaylist`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return "Something went wrong";
    }
    const data = await res.json()
    return data;
  };

  export const getSongs = async (skip,take) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tracks?take=${take}&skip=${skip}`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tracks/${id}`);
    if (!res.ok) {
      return "Something went wrong";
    }
    const data = await res.json()
    return data;
  };