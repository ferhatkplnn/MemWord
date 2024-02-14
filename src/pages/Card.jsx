import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemoizedSpeakButton from "../components/SpeakButton";
import {
  selectCardWords,
  selectRandomCardWords,
  selectSortedByIncorrectCountCardWords,
} from "../redux/words/wordsSlice";
import { speak } from "../utils/utils";
import StatusButton from "../components/buttons/StatusButton";
import CardPager from "../components/CardPager";

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
            <StatusButton
              key={status}
              status={status}
              cardFilterStatus={cardFilterStatus}
              handleFilterStatus={handleFilterStatus}
            />
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
      <CardPager
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
        wordIndex={wordIndex}
        words={words}
      />
    </div>
  );
};

export default Card;
