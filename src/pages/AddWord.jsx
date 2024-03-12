import AddWordForm from "../components/AddWordForm";
import { useSelector } from "react-redux";
import { selectWordIds } from "../redux/words/wordsSlice";
import EditWordForm from "../components/EditWordForm";
import { useMemo } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function AddWord() {
  const wordIds = useSelector(selectWordIds);
  const [parent] = useAutoAnimate();

  const reversedWordIds = useMemo(() => {
    return [...wordIds].reverse();
  }, [wordIds]);

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-8 max-w-sm p-8 md:max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-bold ">Kelime ekle</h1>

        <AddWordForm />

        <div ref={parent} className="space-y-2 ">
          {reversedWordIds.map((id) => (
            <EditWordForm key={id} id={id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AddWord;
