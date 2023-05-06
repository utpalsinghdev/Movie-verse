import React, { useState } from "react";
import ContentWrapper from "../../../components/ContentWrapper/wrapper";
import SwitchTabs from "../../../components/switchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const TopRated = () => {
  // States
  const [endpoint, setEndpoint] = useState("movie");

  // Hooks
  const apiData = useFetch(`/${endpoint}/top_rated`);
  // Functions and Handlers
  const onTabChange = (tab, index) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel
        endpoint={endpoint}
        data={apiData?.data?.results}
        loading={apiData.loading}
      />
    </div>
  );
};

export default TopRated;
