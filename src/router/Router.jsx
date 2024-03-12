import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddWord from "../pages/AddWord";
import Home from "../pages/Home";
import Box from "../pages/Box";
import {
  selectBox1Words,
  selectBox2Words,
  selectBox3Words,
  selectHardBoxWords,
} from "../redux/words/wordsSlice";
import Card from "../pages/Card";
import AddSentence from "../pages/AddSentence";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-word",
        element: <AddWord />,
      },
      { path: "/add-sentence", element: <AddSentence /> },
      {
        path: "/box-1",
        element: (
          <Box
            selectBoxWords={selectBox1Words}
            decreaseAmount={2}
            isShowHiddenWord={true}
          />
        ),
      },
      {
        path: "/box-2",
        element: <Box selectBoxWords={selectBox2Words} decreaseAmount={4} />,
      },
      {
        path: "/box-3",
        element: <Box selectBoxWords={selectBox3Words} decreaseAmount={6} />,
      },
      {
        path: "/hard-box",
        element: <Box selectBoxWords={selectHardBoxWords} decreaseAmount={3} />,
      },
      {
        path: "/card",
        element: <Card />,
      },
    ],
  },
]);
