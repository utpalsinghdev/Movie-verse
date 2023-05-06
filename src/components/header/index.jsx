import "./style.scss";
import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu, SlMinus } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "../ContentWrapper/wrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");

  // Functions and Handlers
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (window.scrollY > 200) {
      if (currentScrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(currentScrollY);
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (url) => {
    navigate(url);
    setMobileMenu(false);
  };

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      navigate(`/search/${query}`);
    }
  };

  // Effects

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setShowSearch(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} onClick={()=> navigationHandler("/")} alt="Movix Logo" />
        </div>
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => navigationHandler("/explore/movie")}
          >
            Movies
          </li>
          <li
            className="menuItem"
            onClick={() => navigationHandler("/explore/tv")}
          >
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openMobileMenu} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie, tv show......"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
            </div>
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
