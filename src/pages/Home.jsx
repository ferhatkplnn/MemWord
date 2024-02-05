import NavigationCards from "../components/NavigationCards";

function Home() {
  return (
    <>
      <div className="flex justify-center items-center max-w-screen-md xl:max-w-screen-lg mx-auto ">
        <div className="grid grid-rows-3 px-8 md:grid-cols-2 xl:grid-cols-3 gap-2">
          <NavigationCards
            to="/add-word"
            title="Kelime ekle"
            description="Buradan kelime ekleyebilirsiniz."
          />

          <NavigationCards
            to="/box-1"
            title="Kutu 1"
            description="Bu kutu eklediğiniz ilk kelimeleri içerir."
          />

          <NavigationCards
            to="/box-2"
            title="Kutu 2"
            description="Bu kutu öğrendiğiniz kelimeleri tekrar etmek içindir, ilk kutuda öğrendiğiniz kelimeleri içerir. Bu kutudaki kelimeleri doğru bildiğinizde 3. kutuya aktarılacaktır."
          />

          <NavigationCards
            to="/box-3"
            title="Kutu 3"
            description="Bu kutu son kutudur. Öğrendiğiniz kelimeleri tekrar etmek için bu kutuyu kullanın."
          />

          <NavigationCards
            to="/hard-box"
            title="Zor kutu"
            description="Bu kutu içerisinde en çok hata yaptığınız kelimeler bulunmaktadır."
          />

          <NavigationCards
            to="/card"
            title="Kartlar"
            description="Bu bölüm içerisinde kelimelerin bulunduğu kartlar bulunmaktadır. Bu kartlar 1. ve 2. kutulardaki kelimeleri içermektedir."
          />
        </div>
      </div>
    </>
  );
}

export default Home;
