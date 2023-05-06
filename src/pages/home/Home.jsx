import React from "react";
import "./style.scss";
import HomeBanner from "./homeBanner/HomeBanner";
import Trending from "./trending/Trending";
import Popular from "./popular";
import TopRated from "./topRated/TopRated";
const Home = () => {
  return (
    <div>
      <HomeBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
