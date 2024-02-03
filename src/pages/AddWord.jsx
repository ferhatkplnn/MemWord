import AddWordForm from "../components/AddWordForm";

function AddWord() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-medium p-8">Add Word</h1>

      <AddWordForm />

      <div></div>
    </div>
  );
}

export default AddWord;
