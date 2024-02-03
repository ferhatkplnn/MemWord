import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./words/wordsSlice";
import UIReducer from "./words/UISlice";

export const store = configureStore({
  reducer: {
    words: wordsReducer,
    UI: UIReducer,
  },
});
