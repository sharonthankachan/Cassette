import { loader } from "../assets";

const LoadSpinner = () => {
  return (
    <div class="loader"></div>
  );
};

const Loader = ({ title, artistLoader }) => {
  if (artistLoader)
    return (
      <div>
      <div className="flex items-center gap-4 mt-2">
        <h1 className="font-bold flex text-2xl text-white ">
          {title || "Loading"}
        </h1>
        <LoadSpinner />
      </div>
        <div className="flex flex-wrap sm:justify-start md:justify-center justify-center gap-8 mt-10">
          {Array(16)
            .fill()
            .map((_, idx) => (
              <div className="cursor-pointer animate-pulse flex flex-col items-center">
                <div className="w-[180px] h-[180px] rounded-full bg-white/5" />
                <div className="mt-4 w-3/4 h-4 bg-white/5 rounded" />
              </div>
            ))}
        </div>
      </div>
    );

  return (
    // <div className="w-full flex justify-center items-center flex-col">
    //   <img src={loader} className="w-32 h-32 object-contain" alt="loader" />
    //   <h1 className="font-bold text-2xl text-white mt-2">{title || "Loading..."}</h1>
    // </div>
    <div>
      <div className="flex items-center gap-4 mt-2">
        <h1 className="font-bold flex text-2xl text-white ">
          {title || "Loading"}
        </h1>
        <LoadSpinner />
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center mt-10 gap-8">
        {Array(16)
          .fill()
          .map((_, idx) => (
            <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-pulse rounded-lg cursor-pointer">
              <div className="relative w-full h-56 rounded-lg overflow-hidden bg-white/5" />

              <div className="mt-4 flex flex-col gap-2">
                <div className="w-3/4 h-5 bg-white/5 rounded" />
                <div className="w-1/2 h-4 bg-white/5 rounded" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Loader;
