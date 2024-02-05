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
  speak,
} from "../utils/utils";
import { useEffect, useRef, useState } from "react";
import SpeakButton from "../components/SpeakButton";

function Box({ selectBoxWords, decreaseAmount }) {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [successClass, setSuccessClass] = useState("");
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
  } = useRandomWord(words);

  const { word, meaning } = randomWord || { word: "", meaning: "" };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText) return;

    const isInputCorrect =
      randomWord.word.toLowerCase() === inputText.toLowerCase();

    if (isInputCorrect) {
      setSuccessClass("text-green-500 scale-105 duration-500");
      setHiddenWord(word);
      setTimeout(() => {
        dispatch(increaseScore({ id: randomWord.id }));
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
    return (
      <div className="text-3xl text-center text-yellow-400">
        Başka kelime yok.
      </div>
    );
  }

  return (
    <div className="flex flex-col  justify-center items-center space-y-8  pb-20">
      <div className="drop-shadow-2xl flex flex-col items-center p-4 rounded-md bg-slate-700 w-11/12 sm:w-2/3 lg:w-1/3">
        <SpeakButton className="self-start" text={word} />
        <div className="text-2xl font-semibold">{meaning}</div>
        <div
          className={`text-4xl font-extrabold h-40 break-all mt-12 tracking-widest ${warningClass} ${successClass} `}
        >
          {hiddenWord}
        </div>
        <div className="flex w-full flex-col  text-sm text-slate-400 text-center min-h-12">
          {showSentence ? (
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
              className="w-full"
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

function useRandomWord(words) {
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
    setHiddenWord(hideWordLetters(randomWord?.word || "no more"));
  }, [randomWord?.word]);

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
