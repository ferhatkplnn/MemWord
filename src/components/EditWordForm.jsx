import { useSelector, useDispatch } from "react-redux";
import Input from "./Input";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import AddSentenceButton from "./buttons/AddSentenceButton";
import {
  deleteWord,
  editWord,
  selectWordById,
} from "../redux/words/wordsSlice";
import { useState } from "react";
import PropTypes from "prop-types";

function EditWordForm({ id }) {
  const data = useSelector((state) => selectWordById(state, id));
  const [word, setWord] = useState(data.word);
  const [meaning, setMeaning] = useState(data.meaning);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editWord({ id, changes: { word, meaning } }));
  };

  const handleDelete = (id) => {
    dispatch(deleteWord(id));
  };

  return (
    <div className="py-4 px-8 bg-slate-700 rounded-lg w">
      <h2 className="text-center font-semibold text-xl p-2"></h2>

      <form onSubmit={handleSubmit} className="flex items-start">
        <div className="flex flex-col flex-1">
          <Input
            onChange={(e) => setWord(e.target.value)}
            value={word}
            required
          />
          <span className="font-extralight text-sm text-slate-400 mt-1">
            Word
          </span>
        </div>

        <div className="flex flex-col flex-1">
          <Input
            onChange={(e) => setMeaning(e.target.value)}
            value={meaning}
            required
          />
          <span className="font-extralight text-sm text-slate-400 mt-1">
            Meaning
          </span>
        </div>

        <EditButton type="submit" />
        <DeleteButton type="button" onClick={() => handleDelete(id)} />
        <AddSentenceButton type="button" />
      </form>
    </div>
  );
}
EditWordForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditWordForm;