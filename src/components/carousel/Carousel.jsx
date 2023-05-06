import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../ContentWrapper/wrapper";
import Image from "../lazyLoadImage/img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
const Carousel = ({ data, loading, endpoint }) => {
  console.log(loading);
  // Hooks
  const navigate = useNavigate();
  const carouselContainer = useRef(null);

  // States and Redux
  const { url } = useSelector((state) => state.home);

  // Functions and Handlers
  const navigationHandler = (direction) => {
    const container = carouselContainer.current;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock skeleton">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => {
            navigationHandler("left");
          }}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => {
            navigationHandler("right");
          }}
        />
        {!loading ? (
          <div ref={carouselContainer} className="carouselItems">
            {data?.map((item, index) => {
              var poster = item?.poster_path
                ? `${url.poster}${item?.poster_path}`
                : PosterFallback;
              return (
                <div
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                  key={item?.id}
                >
                  <div className="posterBlock">
                    <Image
                      src={poster}
                      alt={item?.title || item?.name}
                      onClick={() => {
                        navigate(`/details/${item?.media_type}/${item?.id}`);
                      }}
                    />
                    <CircleRating rating={item?.vote_average?.toFixed(1)} />
                    <Genres genres_data={item?.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">
                      {item?.title || item?.name || item?.original_name}
                    </span>
                    <span className="date">
                      {dayjs(item?.release_date || item?.first_air_date).format(
                        "MMM DD YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
