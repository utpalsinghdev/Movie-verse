import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_URL;
const Token = import.meta.env.VITE_APP_TMDB_TOKEN;

export const FetchData = async (url, params) => {
  try {
    const { data } = await axios.get(`${BaseUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      params: params,
    });
    return data;
  } catch (error) {
    return error;
  }
};
