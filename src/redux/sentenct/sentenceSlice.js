import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const sentenceAdapter = createEntityAdapter();

const initialState = sentenceAdapter.getInitialState();

const sentenceSlice = createSlice({
  name: "sentence",
  initialState,
  reducers: {
    addSentence: sentenceAdapter.addOne,
    loadSentences: (state) => {
      sentenceAdapter.setAll(
        state,
        JSON.parse(localStorage.getItem("sentences")) || []
      );
    },
  },
});

export const { addSentence, loadSentences } = sentenceSlice.actions;

export default sentenceSlice.reducer;
