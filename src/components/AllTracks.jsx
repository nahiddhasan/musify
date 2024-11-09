"use client";
import { getSongs } from "@/utils/data";
import { useState } from "react";
import SingleSong from "./SingleSong";
import MusicLoader from "./loader/MusicLoader";
const TRACKS_PER_PAGE = 10;

const AllTracks = ({ initialSongs, totalSongs }) => {
  const [songs, setSongs] = useState(initialSongs);
  const [skip, setSkip] = useState(TRACKS_PER_PAGE);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadMore = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setHasError(false);

      try {
        const { songs: apiData } = await getSongs(skip, TRACKS_PER_PAGE);

        setSongs((prevSongs) => [...prevSongs, ...apiData]);
        setSkip((prevSkip) => prevSkip + TRACKS_PER_PAGE);
      } catch (error) {
        console.log(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLoadMore = () => {
    if (songs.length < totalSongs) {
      loadMore();
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4 -z-0">
        {songs.length > 0 &&
          songs.map((song) => (
            <SingleSong key={song.id} songs={songs} song={song} />
          ))}
      </div>
      {isLoading && <MusicLoader />}
      {songs.length < totalSongs && (
        <div className="flex items-center justify-center py-12">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default AllTracks;
