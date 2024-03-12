import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import { loadWords } from "./redux/words/wordsSlice.js";
import { loadSentences } from "./redux/sentenct/sentenceSlice.js";

store.dispatch(loadWords());
store.dispatch(loadSentences());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
