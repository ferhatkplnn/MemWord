import { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import AddButton from "./buttons/AddButton";
import { addWord } from "../redux/words/wordsSlice";
import { showToast } from "../redux/words/UISlice";

function AddWordForm() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addWord({ word, meaning }));
    setWord("");
    setMeaning("");
    dispatch(showToast({ type: "success", message: "Word added!" }));
  };
  return (
    <div className="drop-shadow-2xl py-4 px-8 bg-slate-700 rounded-lg">
      <h2 className="text-center font-semibold text-xl p-2">Add a new word</h2>

      <form
        onSubmit={handleSubmit}
        className="flex items-start flex-col md:flex-row"
      >
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
        <AddButton className="self-end md:self-start" />
      </form>
    </div>
  );
}

export default AddWordForm;
