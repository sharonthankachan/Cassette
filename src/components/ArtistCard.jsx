import React from "react";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();
  return (
    <div className="cursor-pointer" title={track?.attributes?.artistName} onClick={() => navigate(`/artists/${track?.relationships?.artists?.data[0]?.id}`)}>
        <img
          src={track?.attributes?.artwork?.url}
          alt="artist"
          className="w-[180px] h-[180px] border-2 border-gray-400 rounded-full"
        />
      <p className="mt-4 text-center  m-auto font-semibold text-sm max-w-[180px] text-white truncate">{track?.attributes?.artistName}</p>
    </div>
  );
};

export default ArtistCard;
