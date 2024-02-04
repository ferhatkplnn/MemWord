import { useSelector } from "react-redux";
import { selectBox1Words } from "../redux/words/wordsSlice";
import Input from "../components/Input";
import { getRandomWord } from "../utils/utils";
import { useState } from "react";

function Box1() {
  const [inputText, setInputText] = useState("");
  const words = useSelector(selectBox1Words);
  const [randomWord, setRandomWord] = useState(getRandomWord(words));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText) return;
    if (randomWord.word.toLocaleLowerCase() === inputText.toLocaleLowerCase()) {
      alert("Correct!");
    } else {
      //
    }
  };

  return (
    <div className="flex flex-col  justify-center items-center space-y-8">
      <h2 className="text-3xl font-semibold">Beginner Word Box</h2>
      <div className="flex flex-col items-center p-4 rounded-md bg-slate-700 w-1/3 min-w-96">
        <div className="text-2xl font-semibold">{randomWord.meaning}</div>
        <div className="text-4xl font-extrabold h-40 break-all mt-12 ">
          {randomWord.word}
        </div>
        <div className="text-sm text-slate-400 text-center">
          this is a pencil
        </div>
        <div className="flex flex-col w-full space-y-2">
          <form onSubmit={handleSubmit}>
            <Input
              className="w-full"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </form>

          <button className="bg-sky-300 text-slate-800 font-bold py-2 rounded-md hover:bg-sky-400 duration-150">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Box1;
