import { useEffect, useState } from "react";
import { FetchData } from "../utils/api";
const useFetch = (url) => {
  const [apiData, setApiData] = useState({
    data: null,
    loading: "Loading...",
    error: null,
  });

  useEffect(() => {
    setApiData({ data: null, error: null, loading: "Loading..." });

    FetchData(url)
      .then((res) => {
        setApiData({ ...apiData, data: res, loading: false });
      })
      .catch((err) => {
        setApiData({ ...apiData, error: err, loading: false });
      });
  }, [url]);

  return apiData;
};

export default useFetch;
