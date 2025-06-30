import { useState } from "react";

const NewTodo = ({ addTodo }) => {
  const [input, setInput] = useState("");

  const handleEnterKeyPress = (e) => {
    const text = input.trim();
    if (text && e.key === "Enter") {
       addTodo(text)
       setInput("")
    }
  };
  return (
    <div className="flex gap-2 xls:gap-3 sm:gap-5 p-2 sm:p-4 md:p-5 items-center w-[80%] md:w-[600px] todo-bg  shadow-2xs mt-8 rounded-md">
      <span className="size-4 xls:size-5 sm:size-6 border toggle-brdr rounded-full shrink-0 "></span>
      <input
        type="text"
        className="w-full caret-primary outline-0 focus:ring-0 focus:border-0 text-[12px] xls:text-sm sm:text-lg text placeholder:text-pl"
        onKeyDown={handleEnterKeyPress}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Create a new todo"
      />
    </div>
  );
};

export default NewTodo;
