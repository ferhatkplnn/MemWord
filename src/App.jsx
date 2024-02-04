import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Toast from "./components/Toast";
import { useSelector } from "react-redux";
import SentenceModal from "./components/SentenceModal";

function App() {
  const toast = useSelector((state) => state.UI.toast);
  const { isShowModal } = useSelector((state) => state.UI.modal);

  return (
    <>
      <Header />
      <Outlet />
      {toast.status === "showing" && <Toast />}
      {isShowModal && <SentenceModal />}
    </>
  );
}

export default App;
