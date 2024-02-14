import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LiaRandomSolid } from "react-icons/lia";
import { FaSortAmountUpAlt } from "react-icons/fa";
import MemoizedSpeakButton from "../components/SpeakButton";
import {
  selectCardWords,
  selectRandomCardWords,
  selectSortedByIncorrectCountCardWords,
} from "../redux/words/wordsSlice";
import { speak } from "../utils/utils";
import { arrowLeft, arrowRight } from "../assets/icons";
import ArrowButton from "../components/buttons/ArrowButton";

const selects = {
  normal: selectCardWords,
  random: selectRandomCardWords,
  sorted: selectSortedByIncorrectCountCardWords,
};

const Card = () => {
  const [isShowBack, setIsShowBack] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [cardFilterStatus, setCardFilterStatus] = useState("normal");
  const words = useSelector(selects[cardFilterStatus]);

  useEffect(() => {
    if (words[wordIndex]) {
      const cancelSpeech = speak(words[wordIndex].word);
      return () => cancelSpeech();
    }
  }, [wordIndex, words]);

  const handleFilterStatus = (status) => {
    setCardFilterStatus(status);
    setWordIndex(0);
  };

  const handleNextClick = () => {
    setWordIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
  };

  const handlePrevClick = () => {
    setWordIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const toggleShowBack = (e) => {
    if (e.target.tagName !== "svg" && e.target.tagName !== "path") {
      setIsShowBack((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-11/12 sm:max-w-lg flex justify-between">
        <span className="text-slate-400">Filter the cards:</span>
        <div className="flex gap-2">
          {["normal", "random", "sorted"].map((status) => (
            <button
              key={status}
              className={`${
                cardFilterStatus === status ? " ring-2" : ""
              } border-slate-500 px-2 py-1 text-sm rounded bg-slate-700`}
              onClick={() => handleFilterStatus(status)}
            >
              {status === "random" ? (
                <LiaRandomSolid />
              ) : status === "sorted" ? (
                <FaSortAmountUpAlt />
              ) : (
                "Normal"
              )}
            </button>
          ))}
        </div>
      </div>
      <div
        onClick={toggleShowBack}
        className={`card ${
          isShowBack ? "open" : ""
        } h-96 flex flex-col items-center rounded-md bg-slate-700 w-11/12 sm:max-w-lg cursor-pointer select-none`}
      >
        <div className="relative front text-5xl">
          <MemoizedSpeakButton
            name="sound"
            className="self-start absolute left-4 top-4"
            text={words[wordIndex]?.word}
          />
          {words[wordIndex]?.word}
        </div>
        <div className="back text-5xl">{words[wordIndex]?.meaning}</div>
      </div>
      <div className="py-2 flex items-center space-x-4">
        <ArrowButton
          isDisable={wordIndex === 0}
          handleClick={handlePrevClick}
          imgURL={arrowLeft}
        />
        <span>
          {wordIndex + 1} / {words.length}
        </span>
        <ArrowButton
          isDisable={wordIndex === words.length - 1}
          handleClick={handleNextClick}
          imgURL={arrowRight}
        />
      </div>
    </div>
  );
};

export default Card;
