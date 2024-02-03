import { createSlice, createEntityAdapter, nanoid } from "@reduxjs/toolkit";

export const wordsAdapter = createEntityAdapter();

const initialState = wordsAdapter.getInitialState();

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    addWord: {
      reducer: wordsAdapter.addOne,
      prepare: (data) => {
        return {
          payload: {
            id: nanoid(),
            word: data.word,
            meaning: data.meaning,
            count: { wrong: 0, current: 0, score: 0 },
            sentences: [],
          },
        };
      },
    },
    editWord: wordsAdapter.updateOne,
    deleteWord: wordsAdapter.removeOne,
    addSentence: wordsAdapter.updateOne,
    loadWords: (state) => {
      wordsAdapter.setAll(
        state,
        JSON.parse(localStorage.getItem("words"))?.entities || []
      );
    },
  },
});

export const { selectIds: selectWordIds, selectById: selectWordById } =
  wordsAdapter.getSelectors((state) => state.words);

export const { addWord, editWord, deleteWord, addSentence } =
  wordsSlice.actions;
export default wordsSlice.reducer;
