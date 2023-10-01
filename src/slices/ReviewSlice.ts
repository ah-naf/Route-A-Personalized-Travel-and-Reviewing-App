import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { PlaceReviewType, ReviewSliceStateType } from "../util";

const URL = "http://localhost:5000/api";

export const addPlaceReviewThunk = createAsyncThunk(
  "review/addPlaceReview",
  async (payload: PlaceReviewType) => {
    const res = await fetch(`${URL}/placeReview`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return null;
    }
    toast.success(data.msg);
  }
);

export const getPlaceNamesThunk = createAsyncThunk(
  "review/getPlaceNames",
  async () => {
    const res = await fetch(`${URL}/placeReview/place-names`);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return null;
    }
    return data.place_names;
  }
);

export const getAllPlaceReviewThunk = createAsyncThunk(
  "review/getAllPlaceReview",
  async () => {
    const res = await fetch(`${URL}/placeReview`);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return null;
    }
    return data.places;
  }
);

export const getSinglePlaceReviewThunk = createAsyncThunk(
  "review/getSinglePlaceReview",
  async (payload: string) => {
    const res = await fetch(`${URL}/placeReview/${payload}`);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return null;
    }
    return data.place;
  }
);

const initialState: ReviewSliceStateType = {
  place_names: [],
  active_place: "",
  reviews: [],
  filtered_reviews: [],
  search_by_place: true,
  active_review: undefined
};

export const ReviewSlice = createSlice({
  name: "ReviewSlice",
  initialState,
  reducers: {
    setActivePlace: (state, { payload }) => {
      state.active_place = payload;
      if (state.search_by_place) {
        state.filtered_reviews = state.reviews.filter(
          (val) => val.place === payload
        );
      } else {
        state.filtered_reviews = state.reviews.filter((val) => {
          let c = false;
          val.tags.map((v) => {
            if (v.includes(payload)) {
              c = true;
              return;
            }
          });
          return c;
        });
      }
      if (!payload) {
        state.filtered_reviews = state.reviews;
      }
    },
    setSearchByPlace: (state, { payload }) => {
      state.search_by_place = payload;
    },
  },
  extraReducers: {
    [getPlaceNamesThunk.fulfilled.type]: (state, { payload }) => {
      state.place_names = payload;
      //   state.place_names.push({ value: "" });
    },
    [getAllPlaceReviewThunk.fulfilled.type]: (state, { payload }) => {
      state.reviews = payload;
      state.filtered_reviews = payload;
    },
    [getSinglePlaceReviewThunk.fulfilled.type]: (state, { payload }) => {
      state.active_review = payload
    },
  },
});

export const { setActivePlace, setSearchByPlace } = ReviewSlice.actions;

export default ReviewSlice.reducer;
