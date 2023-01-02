const BannerAds = ({ url, banner }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div className=" my-4">
        <img src={banner} alt="banner jasaviral" className="mx-auto w-full" />
      </div>
    </a>
  );
};

export default BannerAds;
