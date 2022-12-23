const BannerAds = ({ url, banner }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div className="shadow my-4">
        <img src={banner} alt="banner buytuber" />
      </div>
    </a>
  );
};

export default BannerAds;
