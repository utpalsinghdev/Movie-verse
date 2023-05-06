import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {},
  genres: {},
};

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfig: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfig, getGenres } = HomeSlice.actions;

export default HomeSlice.reducer;
