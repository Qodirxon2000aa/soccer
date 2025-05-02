import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";
import { toast } from "react-toastify";

const Header = () => {
  const { isMenuOpen, setIsMenuOpen } = useGlobalContext();
  return (
    <div className="sticky top-0 right-0 z-[20] h-[65px] bg-[#1B1C21] border-b border-b-[#313131]  px-[24px] flex justify-between items-center">
      <div className="xl:hidden flex-1 ">
        <Link to="/" className="flex items-center gap-[8px]">
          <img className="w-[30px] vsm:w-fit" src={logo} alt="logo" />
          <h1>Onesport</h1>
        </Link>
      </div>

   

      <button aria-label="menu toggle" className="xl:hidden text-[20px]">
        {isMenuOpen ? (
          <FaTimes
            onClick={() => setIsMenuOpen(false)}
            className="text-[red] "
          />
        ) : (
          <FaBars onClick={() => setIsMenuOpen(true)} />
        )}
      </button>
    </div>
  );
};

export default Header;
