import logo from "../assets/logo.png";

const Loading = () => {
  return (
    <div
      className="w-screen min-h-screen flex justify-center place-items-center"
      style={{ backgroundColor: "#F4F4F4" }}
    >
      <div className="w-96 px-8">
        <img src={logo} alt="zeta_loader" className="animate-bounce" />
      </div>
    </div>
  );
};

export default Loading;
