import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddWord from "../pages/AddWord";
import Home from "../pages/Home";
import Box from "../pages/Box";
import { selectBox1Words } from "../redux/words/wordsSlice";

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
      {
        path: "/box-1",
        element: <Box selectBox1Words={selectBox1Words} decreaseAmount={2} />,
      },
      {
        path: "/box-2",
        element: <Box selectBox1Words={selectBox1Words} decreaseAmount={2} />,
      },
    ],
  },
]);
