const Footer = () => {
  return (
    <footer className="p-4 bg-white rounded-lg shadow flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between md:p-6">
      <span className="text-sm text-gray-500 sm:text-center">
        © 2022{" "}
        <a href="https://oniime.com/" className="hover:underline">
          Oniime™
        </a>
        . All Rights Reserved.
      </span>
      <div id="histats_counter"></div>
    </footer>
  );
};

export default Footer;
