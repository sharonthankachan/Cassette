import React, { useEffect, useState } from "react";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";

const TopCharts = () => {
  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(true);

  const { data, isFetching, error } = useGetTopChartsQuery(country, {
    skip: !country,
    refetchOnFocus: false, // ⬅️ Avoid refetch on tab focus
    refetchOnMountOrArgChange: false, // ⬅️ Avoid auto refetch on same params
    keepUnusedDataFor: 3600,
  });
  const { activeSong, isPlaying } = useSelector((state) => state.player);

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
            setCountryName(data.countryName || "");
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


    let mainContent;
    if (isFetching) {
      mainContent = <Loader title="Loading top charts" />;
    } else if (error) {
      mainContent = <Error error={error} />;
    } else {
      mainContent = (
        <div className="flex flex-wrap sm:justify-start justify-center mt-10 gap-8">
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
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Charts
      </h2>
      {mainContent}
    </div>
  );
};

export default TopCharts;
