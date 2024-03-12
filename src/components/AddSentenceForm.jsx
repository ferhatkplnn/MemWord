import { useRef } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Input from "./Input";
import AddButton from "./buttons/AddButton";
import { addSentence } from "../redux/sentenct/sentenceSlice";

const AddSentenceForm = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const sentence = e.target[0].value;
    const meaning = e.target[1].value;
    const id = nanoid();

    dispatch(
      addSentence({
        id,
        sentence,
        meaning,
      })
    );

    e.target.reset();
    inputRef.current.focus();
  };

  return (
    <>
      <div className="drop-shadow-2xl py-4 px-8 bg-slate-700 rounded-lg">
        <h2 className="text-center font-semibold text-xl p-2">
          Yeni bir cumle ekle
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex items-start flex-col md:flex-row"
        >
          <div className="flex flex-col">
            <Input required ref={inputRef} />
            <span className="font-extralight text-sm text-slate-400 mt-1">
              Cumle
            </span>
          </div>

          <div className="flex flex-col">
            <Input required />
            <span className="font-extralight text-sm text-slate-400 mt-1">
              Anlamı
            </span>
          </div>
          <AddButton className="self-end md:self-start" />
        </form>
      </div>
    </>
  );
};

export default AddSentenceForm;
