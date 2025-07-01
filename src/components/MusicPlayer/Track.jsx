import React from "react";
import { Link } from "react-router-dom";

const Track = ({ isPlaying, isActive, activeSong }) => {
  return (
    <div className="flex-1 flex items-center justify-start">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img
          src={activeSong?.attributes?.artwork?.url}
          alt="cover art"
          className="rounded-full"
        />
      </div>
      <div className="w-[50%]">
        <Link
          to={`/songs/${activeSong?.id}`}
          title={
            activeSong?.attributes?.name
              ? activeSong?.attributes?.name
              : "No active Song"
          }
        >
          <p className="truncate text-white font-bold text-lg">
            {activeSong?.attributes?.name
              ? activeSong?.attributes?.name
              : "No active Song"}
          </p>
        </Link>
        <Link
          to={
            activeSong?.relationships?.artists
              ? `/artists/${activeSong.relationships?.artists?.data[0]?.id}`
              : "/top-artists"
          }
          title={
            activeSong?.attributes?.artistName
              ? activeSong?.attributes?.artistName
              : "No active Song"
          }
        >
          <p className="truncate text-gray-300">
            {activeSong?.attributes?.artistName
              ? activeSong?.attributes?.artistName
              : "No active Song"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Track;
