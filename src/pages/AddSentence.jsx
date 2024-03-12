import AddSentenceForm from "../components/AddSentenceForm";

const AddSentence = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-8 max-w-sm p-8 md:max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-bold">Cumle ekle</h1>
        <AddSentenceForm />
      </div>
    </>
  );
};

export default AddSentence;
