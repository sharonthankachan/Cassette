import React, { useEffect, useState } from "react";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { ArtistCard, Loader, Error } from "../components";

const TopArtists = () => {
  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(true);

  const { data, isFetching, error } = useGetTopChartsQuery(country, {
    skip: !country,
    refetchOnFocus: false, // ⬅️ Avoid refetch on tab focus
    refetchOnMountOrArgChange: false, // ⬅️ Avoid auto refetch on same params
    keepUnusedDataFor: 3600,
  });

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
    mainContent = <Loader artistLoader={true} title="Loading top artists" />;
  } else if (error) {
    mainContent = <Error error={error} />;
  } else {
    mainContent = (
     <div className="flex flex-wrap sm:justify-start md:justify-center justify-center gap-8">
        {data?.map((track) => (
          <ArtistCard key={track?.id} track={track} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Artists
      </h2>
      {mainContent}
    </div>
  );
};

export default TopArtists;
