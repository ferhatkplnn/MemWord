import NavigationCards from "../components/NavigationCards";

function Home() {
  return (
    <>
      <div className="flex justify-center items-center max-w-screen-md xl:max-w-screen-lg mx-auto ">
        <div className="grid grid-rows-2 px-8 md:grid-cols-2 xl:grid-cols-3 gap-2 mb-24">
          <NavigationCards
            to="/add-word"
            title="Add Word"
            description="You can add words from here"
          />

          <NavigationCards
            to="/box-1"
            title="Box 1"
            description="This box contains the first words you added."
          />

          <NavigationCards
            to="/box-2"
            title="Box 2"
            description="This box is for reviewing the words you have learned, it contains the words you learned in the first box. When you get the words right in this box they will be transferred to box 3."
          />

          <NavigationCards
            to="/box-3"
            title="Box 3"
            description="This box is the last box. Use this box to repeat the words you have learned."
          />
        </div>
      </div>
    </>
  );
}

export default Home;
