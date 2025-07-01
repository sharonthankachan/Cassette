import React, { useEffect, useState } from "react";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

const Search = () => {
  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useParams();

  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm, {
    skip: !searchTerm,
    refetchOnFocus: false, // ⬅️ Avoid refetch on tab focus
    refetchOnMountOrArgChange: false, // ⬅️ Avoid auto refetch on same params
    keepUnusedDataFor: 3600,
  });

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const songs = data?.tracks?.hits?.map((hit) => hit.track) || [];

  const updatedRelativeSongData = songs?.map((song) => ({
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

    let mainContent;
    if (isFetching) {
      mainContent = <Loader title="Loading results" />;
    } else if (error) {
      mainContent = <Error error={error} />;
    } else {
      mainContent = (
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {updatedRelativeSongData?.map((song, i) => (
          <SongCard
            key={song?.id}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={updatedRelativeSongData}
          />
        ))}
      </div>
      );
    }

  return (
    <div className="flex flex-col">
      
      {!isFetching && <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <i className="text-gray-400">"{searchTerm}"</i>
      </h2>}
      {mainContent}
    </div>
  );
};

export default Search;
