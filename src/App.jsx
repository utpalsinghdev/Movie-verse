import { useEffect } from "react";
import { FetchData } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfig, getGenres } from "./redux/slice/HomeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Details from "./pages/details";
import SearchResult from "./pages/searchResult";
import Explore from "./pages/explore";
import PageNotFound from "./pages/404";
import Footer from "./components/footer";
import Header from "./components/header";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    generesCall();
    FetchData("/configuration")
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };

        dispatch(getApiConfig(url));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const generesCall = async () => {
    let promises = [];
    let endpoints = ["movie", "tv"];
    let allGenres = {};

    endpoints.forEach((endpoint) => {
      return promises.push(FetchData(`/genre/${endpoint}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item.name));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
