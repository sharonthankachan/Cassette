import { Link } from "react-router-dom";
import { songDetailSampleData } from "../sampleData";
import { useSelector } from "react-redux";

const DetailsHeader = ({ artistId, artistData, songData}) => {

  const songId = songData?.data?.[0]?.id;
  const songTitle= songData?.resources?.["shazam-songs"]?.[songId]?.attributes?.title
  const artistName = songData?.resources?.["shazam-songs"]?.[songId]?.attributes?.artist;
  const artistIdFromFetchedDetails = songData?.resources?.["shazam-songs"]?.[songId]?.relationships?.artists?.data[0]?.id
  const primaryGenre = songData?.resources?.["shazam-songs"]?.[songId]?.attributes?.genres?.primary;
console.log("artistData", artistData,artistId);

  return (
    <div className="relative w-full flex flex-col">
      {artistId ? (
        <div className="relative w-full sm:h-72 h-32">
          <img
            src={artistData?.data?.[0]?.attributes?.artwork?.url}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black" />
        </div>
      ) : (
        <div className="w-full bg-gradient-to-l from-transparent rounded-xl to-red-900/50 sm:h-56 h-32" />
      )}
      <div className="absolute inset-0 flex items-end -bottom-20">
        <img
          src={
            artistId
              ? artistData?.data?.[0]?.avatar
                  .replace("{w}", "900")
                  .replace("{h}", "900")
              : songData?.resources[songData.data[0]?.type][
                  songData?.data[0]?.id
                ].attributes?.artwork?.url
                  .replace("{w}", "900")
                  .replace("{h}", "900")
          }
          alt="art"
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-xl object-cover border-2 ml-4 shadow-md shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold  sm:text-3xl text-xl text-white">{artistId ? artistData?.data?.[0]?.attributes?.name : songTitle}</p>
          {!artistId && (
            <Link to={`/artists/${artistIdFromFetchedDetails}`}>
              <p className="text-base text-red-300 mt-2"> 
                {artistName}
              </p>
            </Link>
          )}
          <p className={`text-base text-gray-300 mt-2 ${!artistId && 'mb-5'}`}> 
            {artistId ? artistData?.data?.[0]?.attributes?.genreNames[0] : primaryGenre}
          </p>
        </div>
      </div>
      {/* <div className="w-full sm:h-52 h-24"/> */}
    </div>
  );
};

export default DetailsHeader;
