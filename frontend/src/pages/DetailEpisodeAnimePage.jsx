import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerAds from "../components/BannerAds";
import Navbar from "../components/Navbar";
import { postAnimeDetailEpisode } from "../sources/api";
import banner1 from "../assets/banner-buytuber.jpeg";
import bannerSquare from "../assets/banner-square.gif";

const DetailEpisodeAnimePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [linkDownload, setLinkDownload] = useState([]);
  const [linkSteaming, setLinkSteaming] = useState("");
  const [listRekomendasiAnime, setListRekomendasiAnime] = useState([]);
  const [navbarEpisodes, setNavbarEpisodes] = useState([]);
  const [title, setTitle] = useState("");
  const [showAds, setShowAds] = useState(true);
  const navigate = useNavigate();
  const animeUrl = process.env.REACT_APP_BASE_ANIME_URL;

  const { pathname } = window.location;
  const arrayPath = pathname.split("/");
  const anime = `/${arrayPath[arrayPath.length - 2]}`;
  const formData = new FormData();

  const handleClickDetail = (url) => {
    const arrayPath = url.split("/");
    const anime = `/${arrayPath[arrayPath.length - 2]}/`;
    navigate(anime);
  };

  const handleClickEpisodeDetail = (url) => {
    const arrayPath = url.split("/");
    const anime = `/episode/${arrayPath[arrayPath.length - 2]}/`;
    navigate(anime);
  };

  useEffect(() => {
    setIsLoading(true);
    formData.append("url", `${animeUrl}${anime}`);
    postAnimeDetailEpisode(formData)
      .then((response) => {
        setLinkDownload(response.data.response.download);
        setLinkSteaming(response.data.response.url_streaming);
        setListRekomendasiAnime(response.data.response.list_rekomendasi_anime);
        setTitle(response.data.response.title);
        setNavbarEpisodes(response.data.response.navbar_episodes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [pathname]);

  return (
    <div className="w-screen min-h-screen">
      <Navbar search="anime" />
      {isLoading ? (
        <div className="lg:mx-72 p-4 shadow-lg rounded-lg flex flex-col space-y-4">
          <div className="animate-pulse rounded h-56 w-full bg-gray-400"></div>
          <div className="animate-pulse rounded h-56 w-full bg-gray-400"></div>
          <div className="animate-pulse rounded h-56 w-full bg-gray-400"></div>
          <div className="animate-pulse rounded h-56 w-full bg-gray-400"></div>
        </div>
      ) : (
        <div className="lg:mx-72 p-4 shadow-lg rounded-lg">
          <p className="font-bold my-4 text-center text-xl">{title}</p>
          <div className="aspect-video">
            {showAds && (
              <div className="absolute mx-auto left-0 right-0 mt-10">
                <img
                  src="https://3.bp.blogspot.com/-ZZSacDHLWlM/VhvlKTMjbLI/AAAAAAAAF2M/UDzU4rrvcaI/s1600/btn_close.gif"
                  alt="close"
                  className="mx-auto"
                  onClick={() => setShowAds(false)}
                />
                <div className="w-56 h-56 bg-red-500 mx-auto">
                  <img
                    src={bannerSquare}
                    alt="banner buytuber"
                    className="mx-auto"
                  />
                </div>
              </div>
            )}
            <iframe
              src={linkSteaming}
              title="streaming"
              allowFullScreen
              className="w-full aspect-video"
              style={{ pointerEvents: showAds && "none" }}
            />
          </div>
          <div className="flex justify-around my-4">
            {navbarEpisodes.map((item) => {
              if (item.title.includes("Episodes")) {
                return (
                  <div
                    className="px-2 py-1 bg-blue-500 cursor-pointer"
                    onClick={() => handleClickDetail(item.url)}
                    key={item.url}
                  >
                    <p className="text-white">{item.title}</p>
                  </div>
                );
              } else {
                return (
                  <div
                    className="px-2 py-1 bg-red-500 cursor-pointer"
                    onClick={() => handleClickEpisodeDetail(item.url)}
                    key={item.url}
                  >
                    <p className="text-white">{item.title}</p>
                  </div>
                );
              }
            })}
          </div>
          <BannerAds banner={banner1} url="https://buytuber.com" />
          <div className="">
            {linkDownload.map((itemLinkDownload, index) => {
              return (
                <div className="my-8" key={index}>
                  <div className="w-full py-1 px-2 bg-red-500 mb-2">
                    <p className="text-sm text-red-500 font-bold text-white">
                      {itemLinkDownload.ekstensi.toUpperCase()}
                    </p>
                  </div>
                  <div className="w-full">
                    {itemLinkDownload.master.map((itemMaster, indexMaster) => {
                      return (
                        <div
                          key={indexMaster}
                          className="flex space-x-2 justify-between mb-2 place-items-center"
                        >
                          <div className="bg-red-500 px-2 py-1 w-20">
                            <p className="text-white text-center text-sm">
                              {itemMaster.resolusi}
                            </p>
                          </div>
                          <div className="flex space-x-4 w-full">
                            {itemMaster.list_server.map((itemListServer) => {
                              return (
                                <a
                                  key={itemListServer.url}
                                  href={itemListServer.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <p className="text-sm hover:text-red-400">
                                    {itemListServer.server}
                                  </p>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-1 w-full bg-gray-200"></div>
          <div className="mt-4">
            <p className="font-bold my-4 text-center text-xl">
              Rekomendasi anime hari ini
            </p>
            <div className="flex flex-wrap gap-4 justify-around">
              {listRekomendasiAnime.map((anime) => {
                return (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleClickDetail(anime.url)}
                    key={anime.url}
                  >
                    <img src={anime.image} alt="episode" className="w-24" />
                    <p className="font-bold text-xs w-24 text-center">
                      {anime.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailEpisodeAnimePage;
