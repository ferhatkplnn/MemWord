import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const sentenceAdapter = createEntityAdapter();

const initialState = sentenceAdapter.getInitialState();

const sentenceSlice = createSlice({
  name: "sentence",
  initialState,
  reducers: {
    addSentence: sentenceAdapter.addOne,
    deleteSentence: sentenceAdapter.removeOne,
    editSentence: sentenceAdapter.updateOne,
    loadSentences: (state) => {
      sentenceAdapter.setAll(
        state,
        JSON.parse(localStorage.getItem("sentences")) || []
      );
    },
  },
});

export const { selectIds: selectSentenceIds, selectById: selectSentenceById } =
  sentenceAdapter.getSelectors((state) => state.sentence);

export const { addSentence, loadSentences, deleteSentence, editSentence } =
  sentenceSlice.actions;

export default sentenceSlice.reducer;
