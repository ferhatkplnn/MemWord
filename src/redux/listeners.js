import { isAnyOf } from "@reduxjs/toolkit";
import {
  addSentence,
  addWord,
  decreaseScore,
  deleteWord,
  editWord,
  increaseScore,
} from "./words/wordsSlice";

export const saveWords = {
  matcher: isAnyOf(
    addWord,
    editWord,
    deleteWord,
    addSentence,
    increaseScore,
    decreaseScore
  ),
  effect: (action, listenerApi) => {
    console.log("LocalStorage guncellendi");
    const words = listenerApi.getState().words;
    localStorage.setItem("words", JSON.stringify(words));
  },
};
