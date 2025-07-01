import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import { songDetailSampleData } from "../sampleData";

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSong } =
    useGetSongDetailsQuery(songid);

  const detailsId = songData?.data[0]?.id;
  const {
    data,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongRelatedQuery(detailsId);

  const updatedRelativeSongData = data?.map((song) => ({
    id: song.key,
    type: "songs",
    href: `/v1/catalog/in/songs/${song.key}`,
    attributes: {
      name: song.title || "",
      albumName: "", // Not available in Shazam data
      artistName: song.subtitle || "",
      genreNames: ["Music"], // Default, since genre not provided
      releaseDate: "", // Not available
      durationInMillis: undefined, // Not available
      isrc: "", // Not available
      hasLyrics: false,
      hasTimeSyncedLyrics: false,
      audioLocale: "",
      composerName: "",
      contentRating: song.hub?.explicit ? "explicit" : "clean",
      isAppleDigitalMaster: false,
      isMasteredForItunes: false,
      isVocalAttenuationAllowed: false,
      discNumber: 1,
      trackNumber: 1,
      audioTraits: [],
      artwork: {
        url: song.images?.coverart?.replace("/400x400cc", "/440x440bb") || "",
        width: 440,
        height: 440,
        textColor1: "",
        textColor2: "",
        textColor3: "",
        textColor4: "",
        bgColor: "",
        hasP3: false,
      },
      previews: [
        {
          url: song.hub?.actions?.find((a) => a.type === "uri")?.uri || "",
        },
      ],
      url:
        song.hub?.options?.[0]?.actions?.find(
          (a) => a.type === "applemusicopen"
        )?.uri ||
        song.url ||
        "",
      playParams: {
        id: song.key,
        kind: "song",
      },
    },
    relationships: {
      "music-videos": {
        href: `/v1/catalog/in/songs/${song.key}/music-videos`,
        data: [],
      },
      artists: {
        href: `/v1/catalog/in/songs/${song.key}/artists`,
        data:
          song.artists?.map((artist) => ({
            id: artist.adamid,
            type: "artists",
            href: `/v1/catalog/in/artists/${artist.adamid}`,
          })) || [],
      },
    },
    meta: {
      contentVersion: {},
    },
  }));


  const songDetails =
    songData?.resources?.["shazam-songs"]?.[detailsId] || null;
  const lyricsId = songDetails?.relationships?.lyrics?.data?.[0]?.id;
  const lyrics = songData?.resources?.lyrics?.[lyricsId]?.attributes?.text;

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: updatedRelativeSongData, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

    if (isFetchingSong || isFetchingSongDetails) return <Loader title={"Loading song details"}/>;
    if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={""} songData={songData} />

      <div className="mb-10 mt-32">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.resources?.lyrics ? (
            lyrics?.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              No lyrics available for this song.
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        data={updatedRelativeSongData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={""}
      />
    </div>
  );
};
export default SongDetails;
