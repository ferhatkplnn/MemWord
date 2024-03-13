import { useSelector } from "react-redux";
import { selectSentences } from "../redux/sentence/sentenceSlice";
import { useRandomIndex } from "../hooks/useRandomIndex";
import { shuffleArray, speak } from "../utils/utils";
import { useEffect, useState } from "react";
import MemoizedSpeakButton from "../components/SpeakButton";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const SortTheWords = () => {
  const sentences = useSelector(selectSentences);
  const [currentSentenceIndex, getNextRandomIndex] = useRandomIndex(sentences);
  const [selectedWordArray, setSelectedWordArray] = useState([]);
  const currentSentence = sentences[currentSentenceIndex];
  const [optionWordArray, setOptionWordArray] = useState([]);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    if (currentSentence?.sentence) {
      setOptionWordArray(shuffleArray(currentSentence.sentence.split(" ")));
      setSelectedWordArray([]);
    }
  }, [currentSentence?.sentence]);

  const handleOptionToSelectedClick = (index) => {
    const word = optionWordArray[index];
    speak(word || "");
    setOptionWordArray((prevArray) => prevArray.filter((_, i) => i !== index));
    setSelectedWordArray((prevArray) => [...prevArray, word]);
  };

  const handleSelectedToOptionClick = (index) => {
    const word = selectedWordArray[index];
    setSelectedWordArray((prevArray) =>
      prevArray.filter((_, i) => i !== index)
    );
    setOptionWordArray((prevArray) => [...prevArray, word]);
  };

  const isSame = currentSentence?.sentence.split(" ").every((word, index) => {
    return word === selectedWordArray[index];
  });

  const renderSelectedWords = () => (
    <div
      ref={parent}
      className="flex flex-wrap cursor-pointer select-none gap-y-2"
    >
      {selectedWordArray.map((word, index) => (
        <div
          key={index}
          onClick={() => handleSelectedToOptionClick(index)}
          className="bg-slate-600 rounded px-2 py-1 mr-2 hover:brightness-125 duration-500 drop-shadow-lg hover:ring-1 hover:ring-sky-300"
        >
          {word}
        </div>
      ))}
    </div>
  );

  const renderOptionWords = () => (
    <div className="bg-slate-800/40 p-2 min-h-12 flex flex-wrap space-x-2 select-none gap-y-2 mx-20">
      {optionWordArray.map((word, index) => (
        <div
          onClick={() => handleOptionToSelectedClick(index)}
          key={index}
          className="bg-slate-600 px-2 py-1 select-none cursor-pointer hover:brightness-125 duration-500 drop-shadow-lg hover:ring-1 hover:ring-sky-300"
        >
          {word}
        </div>
      ))}
    </div>
  );

  const renderNextButton = () => (
    <button
      className="bg-sky-300 text-slate-800 font-bold py-2 px-4 rounded hover:bg-sky-400 duration-150 cursor-pointer disabled:bg-slate-200 disabled:cursor-auto"
      onClick={getNextRandomIndex}
      disabled={!isSame}
    >
      Next
    </button>
  );

  return (
    <div className="flex justify-center items-center flex-col">
      {sentences.length === 0 ? (
        <div className="text-3xl text-center text-yellow-400">
          Gösterilecek bir cümle bulunamadı. Lütfen yeni bir cümle ekleyin.
        </div>
      ) : (
        <div className="flex flex-col space-y-8 p-8 max-w-screen-sm w-full h-96 bg-slate-700 rounded">
          <div className="p-2 -tracking-wide">{currentSentence?.meaning}</div>
          <div className="relative bg-slate-800/40 h-32 p-8 rounded">
            <div className="absolute top-2 left-2">
              <MemoizedSpeakButton text={currentSentence?.sentence || ""} />
            </div>
            {renderSelectedWords()}
          </div>
          {renderOptionWords()}
        </div>
      )}
      {sentences.length !== 0 && renderNextButton()}
    </div>
  );
};

export default SortTheWords;
