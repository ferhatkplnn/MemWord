import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import wordsReducer from "./words/wordsSlice";
import UIReducer from "./words/UISlice";
import { saveWords } from "./listeners";
import sentenceReducer from "./sentenct/sentenceSlice";

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening(saveWords);

export const store = configureStore({
  reducer: {
    words: wordsReducer,
    UI: UIReducer,
    sentence: sentenceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});
