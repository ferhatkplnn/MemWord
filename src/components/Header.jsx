import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="p-8 text-center mb-20">
        <Link to="/">
          <h1 className="text-6xl font-semibold">MEM WORD</h1>
        </Link>
      </header>
    </>
  );
}

export default Header;
