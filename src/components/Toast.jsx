import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeToast } from "../redux/words/UISlice";

function Toast() {
  const { type, message } = useSelector((state) => state.UI.toast);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const dispatch = useDispatch();

  const toastClass = {
    success: "bg-green-700/90 text-white",
    warning: "bg-yellow-400/90 text-black",
  };

  useEffect(() => {
    setIsFirstRender(false);
    let id1 = setInterval(() => {
      setIsFirstRender(true);
    }, 4000);

    let id2 = setInterval(() => {
      dispatch(closeToast());
    }, 5000);

    return () => {
      clearInterval(id1);
      clearInterval(id2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseToast = () => {
    setIsFirstRender(true);
  };

  return (
    <>
      <div
        className={`fixed right-4 -bottom-20 ${
          !isFirstRender ? " -translate-y-24" : ""
        } flex pl-4 pr-8 py-4 rounded-md min-w-60 space-x-2 ${
          toastClass[type]
        } duration-300`}
      >
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </i>
        <span className="font-semibold">{message}</span>
        <button
          onClick={handleCloseToast}
          className="absolute top-1 right-1 hover:bg-black/25 rounded-sm duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Toast;
