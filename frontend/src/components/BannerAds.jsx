const BannerAds = ({ url, banner }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div className=" my-4">
        <img src={banner} alt="banner buytuber" className="mx-auto" />
      </div>
    </a>
  );
};

export default BannerAds;
