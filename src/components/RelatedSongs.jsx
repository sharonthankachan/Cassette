import SongBar from "./SongBar";
const RelatedSongs = ({
  handlePauseClick,
  handlePlayClick,
  data,
  isPlaying,
  activeSong,
  artistId,
  topic
}) => {
  return <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">{ topic ||"Related Songs : "}</h1>
    <div className="mt-6  w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={`${song?.id}-${artistId}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={() => handlePlayClick(song, i)}
        />
      ))}
    </div>
  </div>
};

export default RelatedSongs;
