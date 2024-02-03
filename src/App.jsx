import { Outlet } from "react-router-dom";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <div></div>
    </>
  );
}

export default App;
