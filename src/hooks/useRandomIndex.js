import { useRef, useState } from "react";
import { getRandomIndex } from "../utils/utils";

export const useRandomIndex = (sentences) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(() =>
    getRandomIndex(sentences)
  );
  const ref = useRef(currentSentenceIndex);

  const getNextRandomIndex = () => {
    let randomIndex = getRandomIndex(sentences);

    while (ref.current === randomIndex && sentences.length !== 1) {
      randomIndex = getRandomIndex(sentences);
    }
    setCurrentSentenceIndex(randomIndex);
    ref.current = randomIndex;
  };

  return [currentSentenceIndex, getNextRandomIndex];
};
