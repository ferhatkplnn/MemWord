import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="p-8 text-center mb-2">
        <Link to="/">
          <h1 className="relative inline-block text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 hover:from-red-500 hover:to-pink-500 transition-all duration-300">
            MEM WORD
          </h1>
        </Link>
      </header>
    </>
  );
}

export default Header;
