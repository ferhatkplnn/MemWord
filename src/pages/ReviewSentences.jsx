import { useEffect, useState } from "react";
import { selectSentences } from "../redux/sentence/sentenceSlice";
import { useSelector } from "react-redux";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import { speak } from "../utils/utils";
import MemoizedSpeakButton from "../components/SpeakButton";

const ReviewSentences = () => {
  const sentences = useSelector(selectSentences);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState("hide"); // hide | showSentence | show

  const currentSentence = sentences[currentIndex];

  const isShowSentence = status === "showSentence" || status === "show";
  const isShowMeaning = status === "show";

  const handleKeyDown = (e) => {
    if (e.key === "d" || e.key === "D") {
      next();
    } else if (e.key === "a" || e.key === "A") {
      prev();
    } else if (e.key === "e" || e.key === "E") {
      show();
    } else if (e.key === "s" || e.key === "S") {
      refresh();
    }
  };

  useEffect(() => {
    const clear = speak(currentSentence.sentence);

    return () => clear();
  }, [currentSentence.sentence]);

  const next = () => {
    if (sentences.length - 1 <= currentIndex) return;
    setStatus("hide");

    setCurrentIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (currentIndex <= 0) return;
    setStatus("hide");

    setCurrentIndex((prev) => prev - 1);
  };

  const show = () => {
    if (status === "hide") {
      setStatus("showSentence");
    } else if (status === "showSentence") {
      setStatus("show");
    }
  };

  const refresh = () => {
    setStatus("hide");
  };

  return (
    <>
      <div
        onKeyDown={handleKeyDown}
        tabIndex={1}
        className="flex justify-center items-center flex-col outline-none"
      >
        <div className="relative flex flex-col space-y-8 p-8 max-w-screen-sm w-full h-96 bg-slate-700 rounded">
          <MemoizedSpeakButton className="" text={currentSentence.sentence} />
          <span className="absolute top-0 right-8">
            {sentences.length} / {currentIndex + 1}
          </span>
          <div className=" h-32 p-8 rounded text-center mt-12 space-y-4">
            <div className={`font-bold ${isShowSentence ? "" : "blur-sm"} `}>
              {currentSentence.sentence}
            </div>
            <div
              className={`text-slate-400 ${isShowMeaning ? "" : "blur-sm"} `}
            >
              {currentSentence.meaning}
            </div>
          </div>
        </div>

        <div className="flex space-x-8 mt-2">
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={prev}
              disabled={currentIndex <= 0}
              className="h-14 w-14 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 text-slate-400 flex justify-center items-center rounded-full"
            >
              <MdKeyboardArrowLeft size={52} />
            </button>
            <div className="border-2 border-slate-500 w-8 text-center text-slate-400">
              A
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={refresh}
              className="h-14 w-14 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 text-slate-400 flex justify-center items-center rounded-full"
            >
              <IoIosRefresh size={32} />
            </button>
            <div className="border-2 border-slate-500 w-8 text-center text-slate-400">
              S
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={show}
              disabled={status === "show"}
              className="h-14 w-14 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 text-slate-400 flex justify-center items-center rounded-full"
            >
              <FaEye size={32} />
            </button>
            <div className="border-2 border-slate-500 w-8 text-center text-slate-400">
              E
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={next}
              disabled={sentences.length - 1 <= currentIndex}
              className="h-14 w-14 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 text-slate-400 flex justify-center items-center rounded-full"
            >
              <MdKeyboardArrowRight size={52} />
            </button>
            <div className="border-2 border-slate-500 w-8 text-center text-slate-400">
              D
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewSentences;
