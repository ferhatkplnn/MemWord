import AddSentenceForm from "../components/AddSentenceForm";
import { useSelector } from "react-redux";
import { selectSentenceIds } from "../redux/sentence/sentenceSlice";
import { useMemo } from "react";
import { EditSentenceForm } from "../components/EditSentenceForm";

const AddSentence = () => {
  const sentenceIds = useSelector(selectSentenceIds);

  const reversedSentenceIds = useMemo(() => {
    return [...sentenceIds].reverse();
  }, [sentenceIds]);

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-8 max-w-sm p-8 md:max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-bold">Cumle ekle</h1>
        <AddSentenceForm />

        <div className="space-y-2 ">
          {reversedSentenceIds.map((id) => (
            <EditSentenceForm key={id} id={id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AddSentence;
