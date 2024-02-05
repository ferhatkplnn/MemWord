import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCardWords } from "../redux/words/wordsSlice";
import MemoizedSpeakButton from "../components/SpeakButton";
import { speak } from "../utils/utils";

function Card() {
  const [isShowBack, setIsShowBack] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const words = useSelector(selectCardWords);

  useEffect(() => {
    const cancelSpeech = speak(words[wordIndex].word);
    return () => cancelSpeech();
  }, [wordIndex, words]);

  const handleNextClick = () => {
    setWordIndex((prev) => (prev !== words.length - 1 ? prev + 1 : prev));
  };

  const handlePrevClick = () => {
    setWordIndex((prev) => (prev !== 0 ? prev - 1 : prev));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        onClick={(e) => {
          if (e.target.tagName !== "svg" && e.target.tagName !== "path")
            setIsShowBack(!isShowBack);
        }}
        className={`card ${
          isShowBack ? "open" : ""
        } h-96 flex flex-col items-center rounded-md bg-slate-700 w-11/12 sm:max-w-lg cursor-pointer select-none`}
      >
        <div className="relative front text-5xl">
          <MemoizedSpeakButton
            name="sound"
            className="self-start absolute left-4 top-4"
            text={words[wordIndex].word}
          />
          {words[wordIndex].word}
        </div>
        <div className="back text-5xl">{words[wordIndex].meaning}</div>
      </div>
      <div className="space-x-4 py-2 flex items-center">
        <button
          disabled={wordIndex === 0}
          onClick={handlePrevClick}
          className="border-2 border-slate-400 rounded-full p-3 hover:bg-slate-100/20 duration-150 disabled:border-slate-600 disabled:hover:bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </button>
        <span>
          {wordIndex + 1} / {words.length}
        </span>
        <button
          disabled={wordIndex === words.length - 1}
          onClick={handleNextClick}
          className="border-2 border-slate-400 rounded-full p-3 hover:bg-slate-100/20 duration-150 disabled:border-slate-600 disabled:hover:bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Card;
