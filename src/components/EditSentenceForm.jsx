import { useSelector } from "react-redux";
import Input from "./Input";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";
import { selectSentenceById } from "../redux/sentence/sentenceSlice";
import PropTypes from "prop-types";
import { useState } from "react";

export const EditSentenceForm = ({ id }) => {
  const sentenceData = useSelector((state) => selectSentenceById(state, id));
  const [sentenceInput, setSentenceInput] = useState(sentenceData.sentence);
  const [meaningInput, setMeaningInput] = useState(sentenceData.meaning);

  return (
    <>
      <div className="drop-shadow-2xl py-4 px-8 bg-slate-700 rounded-lg">
        <h2 className="text-center font-semibold text-xl p-2"></h2>

        <form
          onSubmit={null}
          className="flex flex-col items-center md:items-start md:flex-row "
        >
          <div className="flex flex-col flex-1">
            <Input
              className={"flex-shrink-1"}
              required
              value={sentenceInput}
              onChange={(e) => setSentenceInput(e.target.value)}
            />
            <span className="font-extralight text-sm text-slate-400 mt-1">
              Cumle
            </span>
          </div>

          <div className="flex flex-col flex-1">
            <Input
              required
              value={meaningInput}
              onChange={(e) => setMeaningInput(e.target.value)}
            />
            <span className="font-extralight text-sm text-slate-400 mt-1">
              Anlamı
            </span>
          </div>

          <div className="flex self-end md:self-start">
            <EditButton type="submit" />
            <DeleteButton type="button" />
          </div>
        </form>
      </div>
    </>
  );
};

EditSentenceForm.propTypes = {
  id: PropTypes.string.isRequired,
};
