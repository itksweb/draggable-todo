import NewTodo from "./NewTodo";

const Header = ({ theme, addTodo, switchTheme }) => {
  return (
    <header
      className={`w-full h-[30vh] sm:h-[40vh] flex items-center flex-col justify-center bg-cover ${
        theme === "dark"
          ? "bg-[url(/assets/images/bg-desktop-dark.jpg)] max-sm:bg-[url(/assets/images/bg-mobile-dark.jpg)]"
          : "bg-[url(/assets/images/bg-desktop-light.jpg)] max-sm:bg-[url(/assets/images/bg-mobile-light.jpg)]"
      }`}
    >
      <div className="w-[80%] md:w-[600px] items-center flex justify-between">
        <h1 className="text-2xl xls:text-3xl sm:text-5xl text-white font-bold uppercase">
          Todo
        </h1>
        <button type="button" onClick={() => switchTheme()}>
          <img
            src={`${
              theme === "dark"
                ? "/assets/images/icon-sun.svg"
                : "/assets/images/icon-moon.svg"
            }`}
            alt="remove to do button"
            className="size-4 xls:size-6 sm:size-8"
          />
        </button>
      </div>
      <NewTodo addTodo={addTodo} />
    </header>
  );
};

export default Header;
