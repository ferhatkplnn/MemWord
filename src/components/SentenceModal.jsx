import { useEffect, useState } from "react";
import { toggleModal } from "../redux/words/UISlice";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { addSentence, selectWordById } from "../redux/words/wordsSlice";
function SentenceModal() {
  const [sentence, setSentence] = useState("");
  const id = useSelector((state) => state.UI.modal.data);
  const { sentences } = useSelector((state) => selectWordById(state, id));
  const [isEffectActive, setIsEffetcActive] = useState(false);

  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(toggleModal(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addSentence({ id, changes: { sentences: [...sentences, sentence] } })
    );
    setSentence("");
    handleCloseModal();
  };

  useEffect(() => {
    setIsEffetcActive(true);
    console.log("Modal render edildi");
    return () => {
      console.log("Modla sokuldu");
    };
  }, []);

  return (
    <>
      <div className="fixed w-full h-screen inset-0 backdrop-blur-lg flex justify-center items-center">
        <div
          className={`relative opacity-70 scale-110 flex-1 max-w-xl flex flex-col bg-slate-800 space-y-8 rounded-md p-8 duration-500 ${
            isEffectActive ? " !opacity-100 !scale-100" : ""
          }`}
        >
          <h3 className="text-xl font-bold">Add sentence</h3>
          <form onSubmit={handleSubmit}>
            <Input
              autoFocus
              required
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="Add sentence"
              className="placeholder:text-slate-600 w-full"
            />
          </form>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSubmit}
              className="bg-sky-300/90 text-slate-800 font-semibold px-4 py-2 rounded-md hover:bg-sky-300/70"
            >
              Save
            </button>
            <button
              onClick={handleCloseModal}
              className="bg-slate-700  font-semibold px-4 py-2 rounded-md hover:bg-slate-600"
            >
              Cancel
            </button>
            <button
              onClick={handleCloseModal}
              className="absolute right-2 top-2 p-1 rounded-md hover:bg-slate-700 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SentenceModal;
