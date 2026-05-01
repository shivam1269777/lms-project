import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="w-full bg-gray-800 text-white py-5 px-6 sm:px-20 flex flex-col sm:flex-row items-center justify-between">
      <section className="text-lg text-center sm:text-left mb-3 sm:mb-0">
        Copyright {year} | All rights reserved
      </section>
      <section className="flex items-center justify-center gap-5 text-2xl">
        <a href="#" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
          <BsFacebook />
        </a>
        <a href="https://www.instagram.com/mr.shivamsahu2022/
" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
          <BsInstagram />
        </a>
        <a href="https://www.linkedin.com/in/shivam-sahu-759259262/" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
          <BsLinkedin />
        </a>
        <a href="#" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
          <BsTwitter />
        </a>
      </section>
    </footer>
  );
}

export default Footer;
