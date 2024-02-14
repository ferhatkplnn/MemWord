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
            count: { wrong: 0, current: 0, score: 0, combo: 0 },
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
      const { combo } = state.entities[id].count;
      let amount = 1;
      if (combo > 5) {
        amount = 2;
      } else if (combo > 10) {
        amount = 4;
      }

      wordsAdapter.updateOne(state, {
        id,
        changes: {
          count: {
            ...state.entities[id].count,
            current: state.entities[id].count.current + 1,
            score: state.entities[id].count.score + amount,
            combo: state.entities[id].count.combo + 1,
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
            combo: 0,
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

export const selectHardBoxWords = createSelector(selectAllWords, (words) =>
  words
    .filter((word) => word.count.score < 60)
    .sort((a, b) => b.count.wrong - a.count.wrong)
    .slice(0, 10)
);

export const selectCardWords = createSelector(selectAllWords, (words) =>
  words.filter((word) => word.count.score <= 80)
);

export const selectRandomCardWords = createSelector(selectAllWords, (words) =>
  words.sort(() => Math.random() - 0.5)
);

export const selectSortedByIncorrectCountCardWords = createSelector(
  selectAllWords,
  (words) => words.sort((a, b) => b.count.wrong - a.count.wrong)
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
