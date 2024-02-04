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
    decreaseScore: (state, action) => {
      const { id, amount } = action.payload;

      wordsAdapter.updateOne(state, {
        id,
        changes: {
          count: {
            ...state.entities[id].count,
            wrong: state.entities[id].count.wrong + 1,
            score: state.entities[id].count.score - amount,
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

export const selectBox2Words = createSelector(selectAllWords, (words) =>
  words.filter((word) => word.count.score > 20 && word.count.score <= 40)
);

export const selectBox3Words = createSelector(selectAllWords, (words) =>
  words.filter((word) => word.count.score > 40)
);

export const {
  addWord,
  editWord,
  deleteWord,
  addSentence,
  loadWords,
  increaseScore,
  decreaseScore,
} = wordsSlice.actions;
export default wordsSlice.reducer;
