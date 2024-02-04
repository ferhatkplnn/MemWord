import { Link } from "react-router-dom";

function NavigationCards({ to, title, description }) {
  return (
    <>
      <Link
        to={to}
        className="bg-slate-700 rounded-lg shadow-xl p-8 hover:ring-4"
      >
        <div className=" text-center space-y-4">
          <h2 className="text-4xl font-medium">{title}</h2>
          <p className="font-light  text-slate-400">{description}</p>
        </div>
      </Link>
    </>
  );
}

export default NavigationCards;
