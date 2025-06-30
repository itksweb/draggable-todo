
const Todo = ({
  todo,
  toggleActive,
  removeTodo,
  setDragIndex,
  setDropIndex,
}) => {
  const { text, active, index } = todo;

  const handleDragStart = () => setDragIndex(index);

  // Function to handle the drop event
  const handleDrop = (e) => {
    e.preventDefault();
    setDropIndex(index);
  };
  return (
    <li
      draggable
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      className="flex justify-between items-center w-full gap-2 xls:gap-3 sm:gap-5 p-2 sm:p-4 md:p-5 border-b todo-brdr group"
    >
      <div className="flex items-center gap-2 xls:gap-3 sm:gap-5">
        <button
          type="button"
          className={`${
            !active
              ? "border-0 check-bg flex items-center justify-center"
              : "toggle-brdr"
          } cursor-pointer rounded-full size-4 xls:size-5 sm:size-6 shrink-0`}
          onClick={() => toggleActive(text)}
        >
          {!active ? (
            <img src="/assets/images/icon-check.svg" alt="toggle active icon" />
          ) : (
            <></>
          )}
        </button>

        <p
          className={` text-[12px] xls:text-sm sm:text-lg  cursor-pointer ${
            !active ? "line-through text-done" : "text"
          }`}
        >
          {text}
        </p>
      </div>
      <button
        type="button"
        className=" cursor-pointer hidden group-hover:block"
        onClick={() => removeTodo(text)}
      >
        <img
          src="/assets/images/icon-cross.svg"
          alt="remove to do button"
          className="size-4 "
        />
      </button>
    </li>
  );
};

export default Todo;
