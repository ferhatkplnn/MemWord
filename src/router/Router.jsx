import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddWord from "../pages/AddWord";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add-word",
    element: <AddWord />,
  },
]);
