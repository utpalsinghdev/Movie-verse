import React from "react";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
const Details = () => {
  // Hooks and context
  const { mediaType, id } = useParams();
  const _credits = { ...useFetch(`/${mediaType}/${id}/credits`) };
  const apiData = useFetch(`/${mediaType}/${id}/videos`);
  // const { ...credit } = useFetch(`/${mediaType}/${id}/credits`);
  console.log(_credits);
  return (
    <div>
      <DetailsBanner
        video={apiData?.data?.results?.[0]}
        crew={_credits?.data?.crew}
      />
    </div>
  );
};

export default Details;
