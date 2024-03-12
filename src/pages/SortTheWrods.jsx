import { useSelector } from "react-redux";
import { selectSentences } from "../redux/sentence/sentenceSlice";
import { useRandomIndex } from "../hooks/useRandomIndex";
import { shuffleArray } from "../utils/utils";
import { useEffect, useMemo, useState } from "react";

const SortTheWrods = () => {
  const sentences = useSelector(selectSentences);
  const [currentSentenceIndex, getNextRandomIndex] = useRandomIndex(sentences);

  const [selectedWordArray, setSelectedWordArray] = useState([]);

  const currentSentence = sentences[currentSentenceIndex];
  const wordsInSentence = useMemo(
    () => currentSentence.sentence.split(" "),
    [currentSentence.sentence]
  );

  const [shuffledWords, setShuffledWords] = useState(
    shuffleArray(wordsInSentence)
  );

  useEffect(() => {
    setShuffledWords(shuffleArray(wordsInSentence));
  }, [wordsInSentence]);

  const getNextSentence = () => {
    getNextRandomIndex();
  };

  return (
    <div className="flex justify-center ">
      <div className="border flex flex-col space-y-8 p-8 max-w-screen-sm w-full">
        <div className="border h-8 p-2">{currentSentence.meaning}</div>
        <div className="border min-h-32">{/* Burayi sallicam */}</div>
        <div className="border  p-2 flex flex-wrap space-x-2  gap-y-2 ">
          {shuffledWords.map((word, index) => (
            <div
              className="border px-2 py-1 select-none cursor-pointer"
              key={index}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      <button onClick={getNextSentence}>x</button>
    </div>
  );
};

export default SortTheWrods;
