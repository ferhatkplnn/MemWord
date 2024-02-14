import NavigationCards from "../components/NavigationCards";
import { navigationCards } from "../constants";

function Home() {
  return (
    <>
      <div className="flex justify-center items-center max-w-screen-md xl:max-w-screen-lg mx-auto ">
        <div className="grid grid-rows-3 px-8 md:grid-cols-2 xl:grid-cols-3 gap-2">
          {navigationCards.map(({ to, title, description }) => (
            <NavigationCards
              key={to}
              to={to}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
