import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import Header from "./components/Header";
const data = [
  { text: "Eat some vegetables", active: true },
  { text: "Read a good book for at least an hour", active: true },
  { text: "Call Mark Anthony", active: false },
  { text: "Beagin to code my to do app", active: true },
  { text: "Play with my babies", active: true },
];

const App = () => {
  const [theme, setTheme] = useState("light");
  const [todos, setTodos] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [selected, setSelected] = useState("All");
  const [dragIndex, setDragIndex] = useState(-1);
  const [dropIndex, setDropIndex] = useState(-1);

  //defining sub-components STARTS here
  const TextButton = ({ text }) => {
    const handleButtonClick = () => {
      if (text === "Clear Completed") {
        return clearCompleted();
      }
      setSelected(text);
    };
    return (
      <button
        className={`cursor-pointer ${
          selected === text ? "text-primary" : "text-pl hover:text-hover"
        }`}
        onClick={handleButtonClick}
        type="button"
      >
        {text}
      </button>
    );
  };
  const FilterButtons = ({ cls }) => {
    return (
      <div
        className={`${cls ? cls : ""} flex items-center gap-5 justify-center`}
      >
        {["All", "Active", "Completed"].map((text) => (
          <TextButton text={text} key={text} />
        ))}
      </div>
    );
  };
  //defining sub-components ENDS here


  //defining actions/functions STARTS here
  const toggleActive = (text) => {
    let workData = [...todos];
    let newWorkData = workData.map((todo) => {
      if (todo.text === text) {
        todo.active = !todo.active;
      }
      return todo;
    });
    setTodos([...newWorkData]);
    localStorage.setItem("todos", JSON.stringify([...newWorkData]));
  };
  const removeTodo = (text) => {
    const NewTodos = [...todos].filter((todo) => todo.text !== text);
    setTodos([...NewTodos]);
    localStorage.setItem("todos", JSON.stringify([...NewTodos]));
  };
  const clearCompleted = () => {
    const NewTodos = [...todos].filter((todo) => todo.active);
    setTodos([...NewTodos]);
    localStorage.setItem("todos", JSON.stringify([...NewTodos]));
  };
  const addTodo = (text) => {
    const todoExists = todos.filter((todo) => todo.text === text).length;
    if (todoExists) {
      console.log("This to do already exists in the database");
    } else {
      const NewTodos = [...todos, { text, active: true }];
      setTodos([...NewTodos]);
      localStorage.setItem("todos", JSON.stringify([...NewTodos]));
    }
  };
  const retrieveUserPref = () => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  };
  const switchTheme = () => {
    const myTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", myTheme);
    setTheme(myTheme);
  };
  //defining actions/functions ENDS here

  useEffect(() => {
    const userThemePref = retrieveUserPref();
    if (userThemePref && userThemePref !== theme) {
      setTheme(userThemePref);
    }
  }, []);

  useEffect(() => {
    if (selected === "All") {
      setSelectedTodos([...todos]);
    } else if (selected === "Active") {
      setSelectedTodos(todos.filter((todo) => todo.active));
    } else if (selected === "Completed") {
      setSelectedTodos(todos.filter((todo) => !todo.active));
    }
  }, [selected, todos]);

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
      console.log("from localStorage");
    } else {
      setTodos([...data]);
      localStorage.setItem("todos", JSON.stringify([...data]));
      console.log("from file");
    }
  }, []);

  useEffect(() => {
    if (selected === "All") {
      if (dropIndex !== -1) {
        const draggedItem = [...todos][dragIndex];
        let newSortedItems = [...todos]; // create a copy of the array
        newSortedItems.splice(dragIndex, 1); // remove the dragged item
        newSortedItems.splice(dropIndex, 0, draggedItem); // insert the dragged item at the new index
        setTodos([...newSortedItems]); // update the state with the new sorted array
        setDragIndex(-1);
        setDropIndex(-1);
        localStorage.setItem("todos", JSON.stringify([...newSortedItems]));
      }
    }
  }, [selected, dropIndex, dragIndex, todos]);

  return (
    <div
      data-theme={theme}
      className={`w-[100vw] flex flex-col items-center main-bg`}
    >
      <Header theme={theme} addTodo={addTodo} switchTheme ={switchTheme} />
      <main className="w-[80%] h-[70vh] sm:h-[60vh] md:w-[600px] ">
        <div className="w-full shadow-xl rounded-md todos max-sm:-mt-7 -mt-10 todo-bg ">
          <ul>
            {selectedTodos.map((item, i) => (
              <Todo
                todo={{ ...item, index: i }}
                key={item.text}
                toggleActive={toggleActive}
                removeTodo={removeTodo}
                setDragIndex={setDragIndex}
                setDropIndex={setDropIndex}
              />
            ))}
          </ul>
          <div className=" flex items-center justify-between text-[13px] gap-2 xls:gap-3 sm:gap-5 p-3 sm:p-4 md:p-5">
            <p className="text-pl">{`${
              todos.filter((todo) => todo.active).length
            } items left`}</p>
            <FilterButtons cls="max-sm:hidden w-1/2" />
            <TextButton text="Clear Completed" />
          </div>
        </div>
        <FilterButtons cls="sm:hidden text-[13px] text-pl p-3 sm:p-4 md:p-5 rounded-md todo-bg mt-5" />
        <p className="text-[13px] mt-5 text-center text-last">
          Drag and drop to reorder list
        </p>
      </main>
    </div>
  );
};

export default App;
