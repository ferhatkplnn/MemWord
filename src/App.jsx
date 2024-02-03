import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Toast from "./components/Toast";
import { useSelector } from "react-redux";
function App() {
  const toast = useSelector((state) => state.UI.toast);
  return (
    <>
      <Header />
      <Outlet />
      {toast.status === "showing" && <Toast />}
    </>
  );
}

export default App;
