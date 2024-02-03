import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 gap-2">
          <Link to="/add-word">
            <div className="border-2 p-8 text-center space-y-4">
              <h2 className="text-4xl font-medium">Add Word</h2>
              <p className="font-light text-slate-500">
                You can add words from here.
              </p>
            </div>
          </Link>

          <Link>
            <div className="border-2 p-8 text-center space-y-4">
              <h2 className="text-4xl font-medium">Box 1</h2>
              <p className="font-light text-slate-500">
                This box contains the first words you added.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
