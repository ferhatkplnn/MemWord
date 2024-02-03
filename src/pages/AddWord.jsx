import AddWordForm from "../components/AddWordForm";
import { useSelector } from "react-redux";
import { selectWordIds } from "../redux/words/wordsSlice";
import EditWordForm from "../components/EditWordForm";
function AddWord() {
  const wordIds = useSelector(selectWordIds);
  console.log(wordIds);
  return (
    <div className="flex flex-col justify-center items-center space-y-20">
      <h1 className="text-4xl font-medium p-8">Add Word</h1>

      <AddWordForm />

      <div>
        {wordIds.map((id) => (
          <EditWordForm key={id} />
        ))}
      </div>
    </div>
  );
}

export default AddWord;
