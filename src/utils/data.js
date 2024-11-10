"use server"
  
export const getUserPlaylists = async (skip,take) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userPlaylists?take=${take}&skip=${skip}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch Playlists.");
    }

    const data = await res.json();
    return data || [];
} catch (error) {
    console.error(error);
    return { message: "Something went wrong" };
}
 
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

  export const getSongs = async (skip, take) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tracks?take=${take}&skip=${skip}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch songs.");
        }

        const data = await res.json();
        return data || { songs: [], totalSongs: 0 };
    } catch (error) {
        console.error(error);
        return { songs: [], totalSongs: 0, message: "Something went wrong" };
    }
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