import { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import AddButton from "./buttons/AddButton";
import { addWord } from "../redux/words/wordsSlice";

function AddWordForm() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addWord({ word, meaning }));
    setWord("");
    setMeaning("");
  };
  return (
    <div className="py-4 px-8 bg-slate-700 rounded-lg">
      <h2 className="text-center font-semibold text-xl p-2">Add a new word</h2>

      <form onSubmit={handleSubmit} className="flex items-start">
        <div className="flex flex-col">
          <Input
            onChange={(e) => setWord(e.target.value)}
            value={word}
            required
          />
          <span className="font-extralight text-sm text-slate-400 mt-1">
            Word
          </span>
        </div>

        <div className="flex flex-col">
          <Input
            onChange={(e) => setMeaning(e.target.value)}
            value={meaning}
            required
          />
          <span className="font-extralight text-sm text-slate-400 mt-1">
            Meaning
          </span>
        </div>
        <AddButton />
      </form>
    </div>
  );
}

export default AddWordForm;
