import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddWord from "../pages/AddWord";
import Home from "../pages/Home";
import Box1 from "../pages/Box1";

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
        element: <Box1 />,
      },
    ],
  },
]);
