import AddWordForm from "../components/AddWordForm";
import { useSelector } from "react-redux";
import { selectWordIds } from "../redux/words/wordsSlice";
import EditWordForm from "../components/EditWordForm";
function AddWord() {
  const wordIds = useSelector(selectWordIds);
  console.log(wordIds);
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-20  md:max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-medium ">Add Word</h1>

        <AddWordForm />

        <div className="space-y-8 w-full">
          {wordIds.map((id) => (
            <EditWordForm key={id} id={id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AddWord;
