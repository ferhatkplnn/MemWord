import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const wordsAdapter = createEntityAdapter();

const initialState = wordsAdapter.getInitialState();

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
});

export default wordsSlice.reducer;
