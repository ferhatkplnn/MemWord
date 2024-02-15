import { useSelector, useDispatch } from "react-redux";
import {
  decreaseScore,
  increaseScore,
  selectWordById,
} from "../redux/words/wordsSlice";
import Input from "../components/Input";
import {
  getRandomSentence,
  getRandomWordId,
  hideWordLetters,
  scrollToElement,
  speak,
} from "../utils/utils";
import { useEffect, useRef, useState } from "react";
import SpeakButton from "../components/SpeakButton";
import ProgressBar from "../components/ProgressBar";
import WordInformation from "../components/WordInformation";
import NoMoreWord from "../components/NoMoreWord";

function Box({ selectBoxWords, decreaseAmount, isShowHiddenWord = false }) {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [successClass, setSuccessClass] = useState("");
  const cardRef = useRef(null);
  const words = useSelector(selectBoxWords);

  const {
    randomWord,
    hiddenWord,
    sentence,
    showSentence,
    warningClass,
    nextWord,
    showHint,
    setHiddenWord,
  } = useRandomWord(words, isShowHiddenWord);

  const { word, meaning } = randomWord || { word: "", meaning: "" };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText) return;

    const isInputCorrect =
      randomWord.word.toLowerCase() === inputText.toLowerCase();

    if (isInputCorrect) {
      dispatch(increaseScore({ id: randomWord.id }));
      setSuccessClass("text-green-500 scale-105 duration-500");
      setHiddenWord(word);
      setTimeout(() => {
        nextWord();
        setSuccessClass("");
      }, 2000);
    } else {
      dispatch(decreaseScore({ id: randomWord.id, amount: decreaseAmount }));
      showHint();
    }
    setInputText("");
    speak(randomWord.word);
  };

  if (words.length === 0) {
    return <NoMoreWord />;
  }

  return (
    <div className="flex justify-center items-center ">
      <div
        ref={cardRef}
        className="drop-shadow-2xl flex flex-col items-center p-4 rounded-md bg-slate-700 w-11/12 sm:w-2/3 lg:w-1/3"
      >
        <div className="flex w-full justify-between">
          <SpeakButton className="" text={word} />
          <WordInformation words={words} randomWord={randomWord} />
        </div>
        <div className="text-2xl font-semibold">{meaning}</div>
        <div
          className={`text-4xl font-extrabold font-mono sm:h-40 break-all mt-2 sm:mt-12 tracking-widest flex flex-col items-center ${warningClass} ${successClass} `}
        >
          {hiddenWord}
          <ProgressBar score={randomWord.count.score} key={randomWord.word} />
        </div>
        <div className="flex w-full flex-col  text-sm text-slate-400 text-center min-h-12">
          {showSentence && sentence ? (
            <>
              <SpeakButton text={sentence} /> <span>{sentence}</span>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col w-full space-y-2">
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              onFocus={() => {
                const node = cardRef.current;
                scrollToElement(node);
              }}
              className="w-full text-center"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <button className="w-full bg-sky-300 text-slate-800 font-bold py-2 rounded-md hover:bg-sky-400 duration-150">
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Box;

function useRandomWord(words, isShowHiddenWord) {
  const [randomWordId, setRandomWordId] = useState(() =>
    getRandomWordId(words)
  );
  const prevWordIdRef = useRef(randomWordId);
  const randomWord = useSelector((state) =>
    selectWordById(state, randomWordId)
  );

  const [hiddenWord, setHiddenWord] = useState("");
  const [sentence, setSentence] = useState(() =>
    getRandomSentence(randomWord?.sentences || [])
  );
  const [showSentence, setShowSentence] = useState(false);
  const [warningClass, setWarningClass] = useState("");

  useEffect(() => {
    setSentence(getRandomSentence(randomWord?.sentences || []));
  }, [randomWord?.sentences]);

  useEffect(() => {
    if (isShowHiddenWord) {
      setHiddenWord(hideWordLetters(randomWord?.word || "no more"));
    } else {
      setHiddenWord(randomWord?.word.replace(/[a-zA-Z]/g, "-"));
    }
  }, [randomWord?.word, isShowHiddenWord]);

  const nextWord = () => {
    let newWordId = getRandomWordId(words);
    while (words.length !== 1 && newWordId === prevWordIdRef.current) {
      newWordId = getRandomWordId(words);
    }
    prevWordIdRef.current = newWordId;
    if (words.length === 1) {
      setHiddenWord(hideWordLetters(randomWord?.word || "no more"));
    }
    setRandomWordId(newWordId);
    setWarningClass("");
    setShowSentence(false);
  };

  const showHint = () => {
    setHiddenWord(randomWord.word);
    setWarningClass("animate-wiggle text-red-500");
    setShowSentence(true);
  };

  return {
    randomWord,
    hiddenWord,
    sentence,
    showSentence,
    warningClass,
    nextWord,
    showHint,
    setHiddenWord,
  };
}
