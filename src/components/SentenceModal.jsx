import Input from "./Input";

function SentenceModal() {
  return (
    <>
      <div className="absolute w-full h-screen inset-0 bg-black/80 flex justify-center items-center duration-500">
        <div className="relative flex-1 max-w-xl flex flex-col bg-slate-800 space-y-8 rounded-md p-8">
          <h3 className="text-xl font-bold">Add sentence</h3>
          <Input
            placeholder="Add sentence"
            className="placeholder:text-slate-600"
          />
          <div className="flex justify-end space-x-2">
            <button className="bg-sky-300/90 text-slate-800 font-semibold px-4 py-2 rounded-md hover:bg-sky-300/70">
              Save
            </button>
            <button className="bg-slate-700  font-semibold px-4 py-2 rounded-md hover:bg-slate-600">
              Cancel
            </button>
            <button className="absolute right-2 top-2 p-1 rounded-md hover:bg-slate-700 duration-150">
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
