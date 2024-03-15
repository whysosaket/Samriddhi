import { GiSesame } from "react-icons/gi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";

const Navbar = () => {
  const isMobile = window.innerWidth < 768;
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
console.log(window.innerWidth)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className={`flex quando justify-between ${mobileMenuOpen && isMobile && "mb-60"}`}
    >
      <Link to="/" className="flex align-middle ">
        <GiSesame size={30} className="text-primary my-auto" />
        <h1 className="my-auto ml-2">Samriddhi</h1>
      </Link>
      <div className="flex align-middle">
        {/* Mobile Menu Button */}
        <button
          className="block lg:hidden bg-transparent focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="h-6 w-6 fill-current text-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                fillRule="evenodd"
                d="M3 18h18v-2H3v2zM3 13h18v-2H3v2zM3 6v2h18V6H3z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4.22 5h15.56c.6 0 1.1.51 1.1 1.12v12.77a1.12 1.12 0 01-1.1 1.11H4.22A1.12 1.12 0 013.1 18.88V6.12C3.1 5.51 3.61 5 4.22 5zm0 6h15.56V7H4.22v4z"
              />
            )}
          </svg>
        </button>
        {!isMobile &&
              <div className="flex align-middle mx-4 my-auto">
              <ul className="flex my-auto">
                <li className="mx-4">
                  <Link to="/">Home</Link>
                </li>
                <li className="mx-4">
                  <Link to="/services">Services</Link>
                </li>
                <li className="mx-4">
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
        }

        {/* Mobile Menu Links */}
        {mobileMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${"absolute w-full left-8 top-14 z-[100]"} lg:flex lg:items-center lg:ml-4`}
          >
            <ul className="flex flex-col lg:flex-row my-auto">
              <li className="my-2 lg:my-0 lg:mx-4 bg-white/10 px-4 py-2 w-5/6">
                <Link to="/" onClick={toggleMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="my-2 lg:my-0 lg:mx-4 bg-white/10 px-4 py-2 w-5/6">
                <Link to="/services" onClick={toggleMobileMenu}>
                  Services
                </Link>
              </li>
              <li className="my-2 lg:my-0 lg:mx-4 bg-white/10 px-4 py-2 w-5/6">
                <Link to="/about" onClick={toggleMobileMenu}>
                  About
                </Link>
              </li>
              <li className="flex justify-end bg-white/0 px-4 py-2 w-5/6">
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className=" bg-primary hover:bg-[#e37655] text-black px-8 py-2 rounded-lg mx-4 my-auto"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/signup"
                    className=" bg-primary hover:bg-[#e37655] text-black px-8 py-2 rounded-lg mx-4 my-auto"
                  >
                    Get Started
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}

        {/* Auth Buttons */}
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="hidden lg:block bg-primary hover:bg-[#e37655] text-black px-8 py-2 rounded-lg mx-4 my-auto"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/signup"
            onClick={toggleMobileMenu}
            className="hidden lg:block bg-primary hover:bg-[#e37655] text-black px-8 py-2 rounded-lg mx-4 my-auto"
          >
            Get Started
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
