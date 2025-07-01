import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const ArtistDetails = () => {
  const { id:artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: artistData?.data?.[0]?.views?.["top-songs"]?.data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetchingArtistDetails) return <Loader title={"Loading artist details"} />;
  if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col min-h-screen">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <div className="mt-32">
        <h1 className="text-white font-bold text-2xl mb-4">About Artist</h1>
        <div className="text-gray-300 text-base leading-relaxed mb-16"
          dangerouslySetInnerHTML={{__html :artistData?.data?.[0]?.attributes?.artistBio || "No biography available."}}
        />
      </div>

      <RelatedSongs
        data={Object.values(artistData?.data?.[0]?.views?.["top-songs"]?.data || {})}
        topic="Top Songs"
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};
export default ArtistDetails;
