import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const sentenceAdapter = createEntityAdapter();

const initialState = sentenceAdapter.getInitialState();

const sentenceSlice = createSlice({
  name: "sentence",
  initialState,
  reducers: {
    addSentence: sentenceAdapter.addOne,
  },
});

export const { addSentence } = sentenceSlice.actions;

export default sentenceSlice.reducer;
