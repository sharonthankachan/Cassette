import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";
import { sampleData } from "../sampleData";
import { useEffect, useState } from "react";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  // Use skip option to prevent unnecessary API calls if country hasn't changed
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const dispatch = useDispatch();
  const parameters = { countryCode: country, genre: genreListId || "POP" };

  const {
    data,
    isFetching,
    error,
  } = useGetSongsByGenreQuery(parameters, {
    skip: !country,
    refetchOnFocus: false, // ⬅️ Avoid refetch on tab focus
    refetchOnMountOrArgChange: false, // ⬅️ Avoid auto refetch on same params
    keepUnusedDataFor: 3600,
  });

  const genreTitle =
    genres.find((genre) => genre.value === genreListId)?.title || "Pop";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await res.json();
            setCountry(data.countryCode || "");
          } catch (err) {
            setCountry("");
          }
          setLoading(false);
        },
        () => {
          setCountry("");
          setLoading(false);
        }
      );
    } else {
      setCountry("");
      setLoading(false);
    }
  }, []);

  // Conditionally render based on fetching/error state without a separate component
  let mainContent;
  if (isFetching) {
    mainContent = <Loader title="Loading songs" />;
  } else if (error) {
    mainContent = <Error error={error} />;
  } else {
    mainContent = (
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song?.id}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    );
  }


  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          name=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
          id=""
          value={genreListId || "pop"}
          onChange={(e) => {
            console.log(e.target.value);
            dispatch(selectGenreListId(e.target.value));
          }}
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
        {mainContent}
    </div>
  );
};

export default Discover;
