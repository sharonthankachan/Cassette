import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import MusicBars from "./MusicBar";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const PlayPause = ({
  song,
  handlePause,
  handlePlay,
  isPlaying,
  activeSong,
}) => (
  <div>
    {isPlaying && activeSong?.id === song?.id ? (
      <FaPauseCircle
        size={35}
        className={` text-gray-300 transition-all duration-300 transform `}
        onClick={handlePause}
      />
    ) : (
      <FaPlayCircle
        size={35}
        className={`text-gray-300 transition-all duration-300 transform `}
        onClick={handlePlay}
      />
    )}
    {activeSong?.id === song?.id && (
      <div className=" absolute bottom-3 right-2">{isPlaying? <MusicBars /> : <PiDotsThreeOutlineFill size={23} className="text-[#FF0000] relative -bottom-2 -right-1" />}</div>
    )}
  </div>
);

export default PlayPause;

//Play animation graphics

