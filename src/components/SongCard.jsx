import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ key, song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  }

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 items-center justify-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.id === song?.id
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img src={song.attributes?.artwork?.url} alt="song img" />
      </div>
      <div className="mt-4 flex flex-col">
        {/* <p className="text-lg font-semibold text-white truncate" title={song.attributes?.name}> */}
          <Link className="text-lg font-semibold text-white truncate hover:underline" title={song.attributes?.name} to={`/songs/${song?.id}`}>{song.attributes?.name}</Link>
        {/* </p> */}
        {/* <p className="text-sm truncate text-gray-300 mt-1" title={song.attributes?.artistName}> */}
          <Link
          className="text-sm truncate text-gray-300 mt-1 hover:underline" title={song.attributes?.artistName}
            to={
              song.relationships?.artists
                ? `/artists/${song.relationships?.artists?.data[0]?.id}`
                : "/top-artists"
            }
          >
            {song.attributes?.artistName}
          </Link>
        {/* </p> */}
      </div>
    </div>
  );
};

export default SongCard;
