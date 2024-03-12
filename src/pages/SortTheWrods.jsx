import { useSelector } from "react-redux";
import { selectSentences } from "../redux/sentence/sentenceSlice";
import { useRandomIndex } from "../hooks/useRandomIndex";
import { shuffleArray, speak } from "../utils/utils";
import { useEffect, useState } from "react";
import MemoizedSpeakButton from "../components/SpeakButton";

const SortTheWrods = () => {
  const sentences = useSelector(selectSentences);
  const [currentSentenceIndex, getNextRandomIndex] = useRandomIndex(sentences);
  const [selectedWordArray, setSelectedWordArray] = useState([]);
  const currentSentence = sentences[currentSentenceIndex];
  const [optionWordArray, setOptionWordArray] = useState(
    shuffleArray(currentSentence?.sentence?.split(" ") || [])
  );

  const getNextSentence = () => {
    getNextRandomIndex();

    setSelectedWordArray([]);
  };
  useEffect(() => {
    setOptionWordArray(
      shuffleArray(currentSentence?.sentence.split(" ") || [])
    );
  }, [currentSentence?.sentence]);

  const handleOptionToSelectedClick = (index) => {
    const word = optionWordArray[index];
    speak(word);
    setOptionWordArray(optionWordArray.filter((w) => w !== word));
    setSelectedWordArray((prev) => [...prev, word]);
  };

  const handleSelectedToOptionClick = (index) => {
    const word = selectedWordArray[index];
    setSelectedWordArray(selectedWordArray.filter((w) => w !== word));
    setOptionWordArray((prev) => [...prev, word]);
  };

  const isSame = currentSentence?.sentence.split(" ").every((word, index) => {
    return word === selectedWordArray[index];
  });

  if (sentences.length === 0)
    return (
      <div className="text-3xl text-center text-yellow-400">
        Gösterilecek bir cümle bulunamadı. Lütfen yeni bir cümle ekleyin.
      </div>
    );

  return (
    <>
      <div className="flex  justify-center items-center flex-col">
        <div className="flex flex-col space-y-8 p-8 max-w-screen-sm w-full h-96 bg-slate-700 rounded">
          <div className="p-2 -tracking-wide ">{currentSentence?.meaning}</div>
          <div className="relative bg-slate-800/40 h-32 p-8 rounded">
            <div className="absolute top-2 left-2">
              <MemoizedSpeakButton text={currentSentence?.sentence || ""} />
            </div>
            <div className="flex flex-wrap cursor-pointer select-none gap-y-2">
              {selectedWordArray.map((word, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectedToOptionClick(index)}
                  className="bg-slate-600 rounded px-2 py-1 mr-2 hover:brightness-125 duration-500 "
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/40 p-2 min-h-12 flex flex-wrap space-x-2 select-none gap-y-2 mx-20">
            {optionWordArray.map((word, index) => (
              <div
                onClick={() => handleOptionToSelectedClick(index)}
                key={index}
                className="bg-slate-600 px-2 py-1 select-none cursor-pointer hover:brightness-125 duration-500 drop-shadow-lg"
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        {isSame && (
          <button
            className="bg-sky-300 text-slate-800 font-bold py-2 px-4 rounded hover:bg-sky-400 duration-150"
            onClick={getNextSentence}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default SortTheWrods;
