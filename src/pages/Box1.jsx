import { useSelector, useDispatch } from "react-redux";
import {
  decreaseScore,
  increaseScore,
  selectBox1Words,
  selectWordById,
} from "../redux/words/wordsSlice";
import Input from "../components/Input";
import {
  getRandomSentence,
  getRandomWordId,
  hideWordLetters,
} from "../utils/utils";
import { useEffect, useState } from "react";

function Box1() {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const words = useSelector(selectBox1Words);

  const {
    randomWord,
    hiddenWord,
    sentence,
    showSentence,
    warningClass,
    nextWord,
    showHint,
  } = useRandomWord(words);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText) return;

    const isInputCorrect =
      randomWord.word.toLowerCase() === inputText.toLowerCase();

    if (isInputCorrect) {
      dispatch(increaseScore({ id: randomWord.id }));
      nextWord();
    } else {
      dispatch(decreaseScore({ id: randomWord.id, amount: 1 }));
      showHint();
    }
    setInputText("");
  };

  return (
    <div className="flex flex-col  justify-center items-center space-y-8">
      <h2 className="text-3xl font-semibold">Beginner Word Box</h2>
      {words.length > 0 ? (
        <div className="flex flex-col items-center p-4 rounded-md bg-slate-700 w-1/3 min-w-96">
          <div className="text-2xl font-semibold">{randomWord.meaning}</div>
          <div
            className={`text-4xl font-extrabold h-40 break-all mt-12 tracking-widest ${warningClass}`}
          >
            {hiddenWord}
          </div>
          <div className="text-sm text-slate-400 text-center min-h-6">
            {showSentence ? sentence : ""}
          </div>
          <div className="flex flex-col w-full space-y-2">
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                className="w-full"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              <button className="w-full bg-sky-300 text-slate-800 font-bold py-2 rounded-md hover:bg-sky-400 duration-150">
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-3xl text-center text-yellow-400">
          There are no more words.
        </div>
      )}
    </div>
  );
}

export default Box1;

function useRandomWord(words) {
  const [randomWordId, setRandomWordId] = useState(() =>
    getRandomWordId(words)
  );
  const randomWord = useSelector((state) =>
    selectWordById(state, randomWordId)
  );
  const [hiddenWord, setHiddenWord] = useState(() =>
    hideWordLetters(randomWord.word)
  );
  const [sentence, setSentence] = useState(() =>
    getRandomSentence(randomWord.sentences)
  );
  const [showSentence, setShowSentence] = useState(false);
  const [warningClass, setWarningClass] = useState("");

  useEffect(() => {
    setSentence(getRandomSentence(randomWord.sentences));
  }, [randomWord.sentences]);

  useEffect(() => {
    setHiddenWord(hideWordLetters(randomWord.word));
  }, [randomWord.word]);

  const nextWord = () => {
    setRandomWordId(getRandomWordId(words));
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
  };
}
