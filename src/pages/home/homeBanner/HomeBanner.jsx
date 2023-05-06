import "./style.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Image from "../../../components/lazyLoadImage/img";
import ContentWrapper from "../../../components/ContentWrapper/wrapper";
const HomeBanner = () => {
  const navigate = useNavigate();
  const apiData = useFetch("/movie/upcoming");

  const { url } = useSelector((state) => state.home);

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      navigate(`/search/${query}`);
    }
  };

  useEffect(() => {
    const bg =
      url.backdrop +
      apiData?.data?.results[
        Math.floor(Math.random() * apiData?.data?.results?.length)
      ]?.backdrop_path;
    if (bg) {
      setBackground(bg);
      console.log(bg);
    }
  }, [apiData.data]);

  return (
    <div className="heroBanner">
      {!apiData.loading && (
        <div className="backdrop-img">
          <Image src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              className=""
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              placeholder="Search For a Movie or TV show..."
            />
            <button className="searchBtn">Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HomeBanner;
