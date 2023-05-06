import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/ContentWrapper/wrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Image from "../../../components/lazyLoadImage/img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  // Hooks and context
  const { mediaType, id } = useParams();
  const apiData = useFetch(`/${mediaType}/${id}`);

  // States and variables
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { url } = useSelector((state) => state.home);
  const _generas = apiData?.data?.genres?.map((g) => g.id);
  const director = crew?.filter((c) => c.job === "Director");
  const writers = crew?.filter(
    (c) => c.job === "Screenplay" || c.job === "Writer" || c.job === "Story"
  );

  // Methods and handlers
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!apiData.loading ? (
        <React.Fragment>
          <div className="backdrop-img">
            <Image src={url?.backdrop + apiData?.data?.backdrop_path} />
          </div>
          <div className="opacity-layer"></div>
          <ContentWrapper>
            <div className="content">
              <div className="left">
                {apiData?.data?.poster_path ? (
                  <Image
                    className={"posterImg"}
                    src={url?.poster + apiData?.data?.poster_path}
                  />
                ) : (
                  <Image
                    className={"posterImg"}
                    src={PosterFallback}
                    alt="poster"
                  />
                )}
              </div>
              <div className="right">
                <div className="title">
                  {`${
                    apiData?.data?.title || apiData?.data?.name || "N/A"
                  } (${dayjs(
                    apiData?.data?.release_date || apiData?.data?.first_air_date
                  ).format("YYYY")})`}
                </div>
                <div className="subtitle">
                  {apiData?.data?.tagline || "N/A"}
                </div>
                <Genres genres_data={_generas} />
                <div className="row">
                  <CircleRating
                    rating={apiData?.data?.vote_average.toFixed(1)}
                  />
                  <div
                    className="playbtn"
                    onClick={() => {
                      setShow(true);
                      setVideoId(video?.key);
                    }}
                  >
                    <PlayIcon />
                    <span className="text">Watch Trailer</span>
                  </div>
                </div>
                <div className="overview">
                  <div className="heading">Overview</div>
                  <div className="description">{apiData?.data?.overview}</div>
                </div>
                <div className="info">
                  {apiData?.data?.status && (
                    <div className="infoItem">
                      <span className="text bold">Status: </span>
                      <span className="text">{apiData?.data?.status}</span>
                    </div>
                  )}
                  {apiData?.data?.release_date && (
                    <div className="infoItem">
                      <span className="text bold">Release Date: </span>
                      <span className="text">
                        {dayjs(apiData?.data?.release_date).format(
                          "MMM D, YYYY"
                        )}
                      </span>
                    </div>
                  )}
                  {apiData?.data?.runtime && (
                    <div className="infoItem">
                      <span className="text bold">Runtime: </span>
                      <span className="text">
                        {toHoursAndMinutes(apiData?.data?.runtime)}
                      </span>
                    </div>
                  )}
                </div>
                {director?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Director: </span>
                    <span className="text">
                      {director?.map((d, idx) => (
                        <span key={idx}>
                          {d.name}
                          {director.length - 1 !== idx && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                {writers?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Writer: </span>
                    <span className="text">
                      {writers?.map((d, idx) => (
                        <span key={idx}>
                          {d.name}
                          {writers.length - 1 !== idx && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                {apiData.data?.created_by?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Creator: </span>
                    <span className="text">
                      {apiData.data?.created_by?.map((d, idx) => (
                        <span key={idx}>
                          {d.name}
                          {apiData.data?.created_by - 1 !== idx && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <VideoPopup
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
            />
          </ContentWrapper>
        </React.Fragment>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
