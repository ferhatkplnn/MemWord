import {
  createSlice,
  createEntityAdapter,
  createSelector,
  nanoid,
} from "@reduxjs/toolkit";

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
    increaseScore: (state, action) => {
      const { id } = action.payload;

      wordsAdapter.updateOne(state, {
        id,
        changes: {
          count: {
            ...state.entities[id].count,
            current: state.entities[id].count.current + 1,
            score: state.entities[id].count.score + 1,
          },
        },
      });
    },
  },
});

export const {
  selectIds: selectWordIds,
  selectById: selectWordById,
  selectAll: selectAllWords,
} = wordsAdapter.getSelectors((state) => state.words);

export const selectBox1Words = createSelector(selectAllWords, (words) =>
  words.filter((word) => word.count.score <= 20)
);

export const {
  addWord,
  editWord,
  deleteWord,
  addSentence,
  loadWords,
  increaseScore,
} = wordsSlice.actions;
export default wordsSlice.reducer;
