import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { getPlaying } from "../services/tuna";
import onProgress from "../utils/onProgress";

function Widget() {
  /**
   * Todo: Apply a loading state https://tailwindcss.com/docs/animation#pulse
   * Todo: Apply a error state
   * Todo: Apply a empty state
   */
  // const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    album: "",
    album_url: "",
    artists: [],
    cover_path: "",
    cover_url: "",
    duration: 0,
    playback_date: "",
    playback_time: "",
    progress: 0,
    status: "stopped", // playing, paused, stopped
    status_id: 0, // 0, 1, 2
    title: "",
  });

  useEffect(() => {
    let interval = setInterval(async () => {
      const res = await getPlaying();
      if (res.status === 200) {
        setData(res.data);
      } else {
        setData({
          album: "",
          album_url: "",
          artists: [],
          cover_path: "",
          cover_url: "",
          duration: 0,
          playback_date: "",
          playback_time: "",
          progress: 0,
          status: "stopped", // playing, paused, stopped
          status_id: 0, // 0, 1, 2
          title: "",
        });
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="m-8">
      <div
        className="h-[120px] w-[480px] rounded-lg outline outline-2 outline-gray-500 bg-center"
        style={{
          backgroundImage: `url(${data.cover_path})`,
        }}
      >
        <div className="w-full h-full rounded-lg backdrop-blur-sm bg-black/50">
          <div className="flex flex-row">
            <div className="basis-1/4">
              <img
                id="widget-image"
                className="rounded-[5px] m-[15px] w-[90px] h-[90px]"
                src={
                  data.album_url
                    ? data.album_url
                    : "https://via.placeholder.com/90"
                }
                alt="Album Cover"
              />
            </div>
            <div className="basis-3/4">
              <div className="flex flex-col">
                <div className="h-[70px] text-[17px] pt-[15px] ">
                  <div className="flex flex-col ">
                    <div className="text-[23px] strokeme font-medium">
                      {data.title}
                    </div>
                    {/* <div>{data.album}</div> */}
                    <div className="font-bold strokeme">
                      {data.artists.join(", ")}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-none h-[50px] w-[40px]">
                    {!data.status_id ? (
                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faPlay}
                          className="animate-ping text-white fa-xl absolute bottom-0 left-2 top-3"
                        />
                        <div className="absolute bottom-0 left-2 top-3">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="fa-xl text-white"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faPause}
                          className="fa-xl text-white absolute bottom-0 left-2 top-3"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 pl-4 pr-4 pt-[21px]">
                    <div className="w-full bg-white rounded-full h-2 mb-4 dark:bg-gray-700">
                      <div
                        className="bg-gray-600 h-2 rounded-full dark:bg-gray-300"
                        style={{
                          width: `${onProgress({
                            duration: data.duration,
                            progress: data.progress,
                          })}`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Widget;
