import React, { useState } from "react";
import ContentWrapper from "../../../components/ContentWrapper/wrapper";
import SwitchTabs from "../../../components/switchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Trending = () => {
  // States
  const [endpoint, setEndpoint] = useState("day");

  // Hooks
  const apiData = useFetch(`/trending/all/${endpoint}`);
  // Functions and Handlers
  const onTabChange = (tab, index) => {
    setEndpoint(tab.toLowerCase());
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={apiData?.data?.results} loading={apiData.loading} />
    </div>
  );
};

export default Trending;
