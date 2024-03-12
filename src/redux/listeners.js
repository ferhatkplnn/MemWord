import { isAnyOf } from "@reduxjs/toolkit";
import {
  addSentence,
  addWord,
  decreaseScore,
  deleteWord,
  editWord,
  increaseScore,
} from "./words/wordsSlice";

import { addSentence as addSentenceOne } from "./sentenct/sentenceSlice";

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
    const words = listenerApi.getState().words;
    localStorage.setItem("words", JSON.stringify(words));
  },
};

export const saveSentence = {
  actionCreator: addSentenceOne,
  effect: (action, listenerApi) => {
    const sentences = listenerApi.getState().sentence.entities;
    localStorage.setItem("sentences", JSON.stringify(sentences));
  },
};
