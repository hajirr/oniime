import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerAds from "../components/BannerAds";
import Navbar from "../components/Navbar";
import { getAnimeNew, postAnimeNewPagination } from "../sources/api";
import banner1 from "../assets/banner.gif";
import banner2 from "../assets/banner.gif";

const AnimePage = () => {
  const [listLatestAnime, setListLatestAnime] = useState([]);
  const [listHotAnime, setListHotAnime] = useState([]);
  const [listRecomendation, setListRecomendation] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formData = new FormData();
  const skeletonList = [1, 2, 3, 4];
  const navigate = useNavigate();

  const handlePagination = (url) => {
    formData.append("url", url);
    setIsLoading(true);
    postAnimeNewPagination(formData)
      .then((response) => {
        setListLatestAnime(response.data.response.latest);
        setListHotAnime(response.data.response.hot);
        setListRecomendation(response.data.response.recomendation);
        setPagination(response.data.response.navigate);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleClickEpisodeDetail = (url) => {
    const arrayPath = url.split("/");
    const anime = `/episode/${arrayPath[arrayPath.length - 2]}/`;
    navigate(anime);
  };

  useEffect(() => {
    setIsLoading(true);
    getAnimeNew()
      .then((response) => {
        setListLatestAnime(response.data.response.latest);
        setListHotAnime(response.data.response.hot);
        setListRecomendation(response.data.response.recomendation);
        setPagination(response.data.response.navigate);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="w-screen min-h-screen">
      <Navbar search="anime" />
      <div className="lg:mx-72 p-4 shadow-lg rounded-lg  ">
        <p className="font-bold text-lg mb-4">
          Rekomendasi episode anime hari ini
        </p>
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center w-full mb-4">
            {skeletonList.map((item) => {
              return (
                <div className="" key={item}>
                  <div className="animate-pulse h-32 w-24 bg-gray-400 rounded"></div>
                  <div className="animate-pulse h-3 w-24 bg-gray-400 rounded mt-2"></div>
                  <div className="animate-pulse h-3 w-24 bg-gray-400 rounded mt-2"></div>
                </div>
              );
            })}
          </div>
        )}
        {!isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center w-full mb-4">
            {listHotAnime.map((anime) => {
              return (
                <div
                  className="cursor-pointer"
                  onClick={() => handleClickEpisodeDetail(anime.url)}
                  key={anime.url}
                >
                  <img src={anime.image} alt="episode" className="w-24 mb-2" />
                  <p className="font-bold text-xs w-24 text-center">
                    {anime.title}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <BannerAds banner={banner1} url="https://jasaviral.com" />
        <p className="font-bold text-lg">Episode Anime Terbaru</p>
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 my-4 w-full">
            {skeletonList.map((item) => {
              return (
                <div className="flex space-x-4" key={item}>
                  <div className="animate-pulse h-32 w-24 bg-gray-400 rounded"></div>
                  <div className="w-72">
                    <div className="animate-pulse h-3 w-full bg-gray-400 rounded mt-2"></div>
                    <div className="animate-pulse h-3 w-full bg-gray-400 rounded mt-2"></div>
                    <div className="animate-pulse h-3 w-full bg-gray-400 rounded mt-2"></div>
                    <div className="animate-pulse h-3 w-full bg-gray-400 rounded mt-2"></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!isLoading && (
          <div className=" my-4 ">
            {listLatestAnime.map((response) => {
              return (
                <div
                  key={response.url}
                  className="flex space-x-2 mx-2 mb-4 cursor-pointer"
                  onClick={() => handleClickEpisodeDetail(response.url)}
                >
                  <img src={response.image} alt="thumbnail" className="w-20" />
                  <div className="w-full">
                    <p className="text-sm font-bold">{response.title}</p>
                    <div className="flex justify-between place-items-center mt-1">
                      <div className="">
                        {response.info.map((info) => {
                          return (
                            <p key={info} className="text-sm text-gray-400">
                              {info}
                            </p>
                          );
                        })}
                      </div>
                      <div className="rounded px-2 py-1 bg-yellow-500 h-max w-max">
                        <p className="text-xs text-white">{response.score}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex space-x-4 w-full justify-center">
          {pagination.map((item) => {
            return (
              <div
                onClick={() => handlePagination(item.url)}
                className="px-3 py-1 rounded bg-red-500 cursor-pointer"
                key={item.url}
              >
                <p className="text-white">{item.title}</p>
              </div>
            );
          })}
        </div>
        <div className="h-10" />
        <BannerAds url="https://jasaviral.com" banner={banner2} />
        <p className="font-bold text-lg">Anime Rekomendasi</p>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center w-full mb-4">
            {skeletonList.map((item) => {
              return (
                <div className="" key={item}>
                  <div className="animate-pulse h-32 w-24 bg-gray-400 rounded"></div>
                  <div className="animate-pulse h-3 w-24 bg-gray-400 rounded mt-2"></div>
                  <div className="animate-pulse h-3 w-24 bg-gray-400 rounded mt-2"></div>
                </div>
              );
            })}
          </div>
        )}
        {!isLoading && (
          <div className="w-full flex flex-wrap justify-center gap-4 mt-4">
            {listRecomendation.map((anime) => {
              return (
                <div
                  className="cursor-pointer"
                  onClick={() => handleClickEpisodeDetail(anime.url)}
                  key={anime.url}
                >
                  <img src={anime.image} alt="episode" className="w-24" />
                  <p className="text-xs text-gray-400 mb-2">{anime.status}</p>
                  <p className="font-bold text-sm w-24 text-center">
                    {anime.title}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimePage;
