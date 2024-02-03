import Input from "./Input";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import AddSentenceButton from "./buttons/AddSentenceButton";

function EditWordForm() {
  return (
    <div className="py-4 px-8 bg-slate-700 rounded-lg">
      <h2 className="text-center font-semibold text-xl p-2">Add a new word</h2>

      <form onSubmit={null} className="flex items-start">
        <div className="flex flex-col">
          <Input required />
          <span className="font-extralight text-sm text-slate-400 mt-1">
            Word
          </span>
        </div>

        <div className="flex flex-col">
          <Input required />
          <span className="font-extralight text-sm text-slate-400 mt-1">
            Meaning
          </span>
        </div>

        <EditButton />
        <DeleteButton />
        <AddSentenceButton />
      </form>
    </div>
  );
}

export default EditWordForm;
