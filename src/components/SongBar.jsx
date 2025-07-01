import React from "react";
import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";

const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  console.log("song", song);

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.id === song?.id
          ? "bg-[#4c426e]"
          : "bg-transparent"
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={
            artistId
              ? song?.attributes?.artwork?.url
                  .replace("{w}", "125")
                  .replace("{h}", "125")
              : song?.attributes?.artwork?.url
                  .replace("{w}", "125")
                  .replace("{h}", "125")
          }
          alt={song?.attributes?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song?.id}`} title={song?.attributes?.name}>
            <p className="text-xl font-bold text-white hover:underline">
              {song?.attributes?.name}
            </p>
          </Link>

          {song?.relationships?.artists?.data[0] ? (
            <Link to={`/artists/${song?.relationships?.artists?.data[0]?.id}`} title={artistId
                  ? song?.attributes?.albumName
                  : song?.attributes?.artistName}>
              <p className="text-base text-gray-300 mt-1  hover:underline">
                {artistId
                  ? song?.attributes?.albumName
                  : song?.attributes?.artistName}
              </p>
            </Link>
          ) : (
            <p className="text-base text-gray-300 mt-1">
              {artistId
                ? song?.attributes?.albumName
                : song?.attributes?.artistName}
            </p>
          )}
        </div>
      </div>

      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    </div>
  );
};

export default SongBar;
