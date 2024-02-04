import { isAnyOf } from "@reduxjs/toolkit";
import {
  addSentence,
  addWord,
  deleteWord,
  editWord,
  increaseScore,
} from "./words/wordsSlice";

export const saveWords = {
  matcher: isAnyOf(addWord, editWord, deleteWord, addSentence, increaseScore),
  effect: (action, listenerApi) => {
    console.log("LocalStorage guncellendi");
    const words = listenerApi.getState().words;
    localStorage.setItem("words", JSON.stringify(words));
  },
};
