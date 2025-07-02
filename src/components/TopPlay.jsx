import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { useState } from "react";
import { sampleData } from "../sampleData";
import PlayPause from "./PlayPause";
import { SongDetails } from "../pages";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song.attributes?.artwork?.url}
        alt={song.attributes?.name}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.id}`} title={song.attributes?.name}>
          <p className="text-lg font-semibold text-white  hover:underline">
            {song.attributes?.name}
          </p>
        </Link>
        <Link to={`/artists/${song.relationships?.artists?.data[0]?.id}`} title={song.attributes?.artistName}>
          <p className="text-sm text-gray-300 mt-1  hover:underline">
            {song.attributes?.artistName}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      song={song}
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery(country, {
    skip: !country,
  });
  const divRef = useRef(null);

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
          // setLoading(false);
        },
        () => {
          setCountry("");
          // setLoading(false);
        }
      );
    } else {
      setCountry("");
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: "smooth" });
  });

  const topPlays = data?.slice(0, 5)

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] h-full max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer ">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {!isFetching && topPlays?.length > 0
            ? topPlays.map((song, i) => (
                <TopChartCard
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePauseClick={handlePauseClick}
                  handlePlayClick={() => handlePlayClick(song, i)}
                  key={song?.id}
                  song={song}
                  i={i}
                  isLoading={isFetching}
                />
              ))
            : 
            Array(5)
                .fill()
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="w-full xl:w-[500px] flex flex-row items-center py-2 p-4 rounded-lg cursor-pointer mb-2 animate-pulse bg-white/5"
                  >
                    <div className="font-bold text-base text-white mr-3 w-4 h-4 bg-white/5 rounded" />

                    <div className="flex-1 flex flex-row justify-between items-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-lg" />

                      <div className="flex-1 flex flex-col justify-center mx-3 space-y-2">
                        <div className="w-3/4 h-5 bg-white/5 rounded" />
                        <div className="w-1/2 h-4 bg-white/5 rounded" />
                      </div>
                    </div>

                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-full" />
                  </div>
                ))
                }
        </div>
      </div>
      <div className="w-full flex flex-col mt-8 mb-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer ">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {!isFetching && topPlays?.length > 0
            ? topPlays.map((song, i) => (
              <div key={song?.id}>
                <SwiperSlide
                  style={{ width: "25%", height: "auto" }}
                  className="shadow-lg rounded-full animate-slideright flex justify-center items-center"
                >
                  <Link
                    to={`/artists/${song?.relationships?.artists?.data[0]?.id}`}
                  >
                    <img
                      src={song?.attributes?.artwork?.url}
                      alt="artist"
                      className="rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover"
                    />
                  </Link>
                </SwiperSlide>
                      <p className="mt-4 text-center  m-auto font-semibold text-sm max-w-[180px] text-white truncate">{song?.attributes?.artistName || "artist"}</p>

                </div>
              ))
            : (
              <div className="flex overflow-x-hidden justify-center gap-4 w-full xl:w-[500px]">
                {Array(5)
                  .fill()
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="w-20 cursor-pointer h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 aspect-square animate-pulse bg-white/5 rounded-full"
                    />
                  ))}
              </div>
            )}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
