import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("Personal");
  const [status, setStatus] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const [filteredTodos, setFilterTodos] = useState([]);
  const [filteredDates, setFilteredDates] = useState(null);
  const [pending, setPending] = useState(false);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilterTodos(todoList.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilterTodos(todoList.filter((todo) => todo.completed === false));
        break;
      default:
        setFilterTodos(todoList);
        break;
    }
  };

  const allDatesFinder = () => {
    const allDates = [...new Set(filteredTodos.map((todo) => todo.date))];
    setFilteredDates(allDates);
  };

  const dateFilterHandler = (date) => {
    setFilterTodos(todoList?.filter((todo) => todo.date === date));
  };

  useEffect(() => {
    fetch("http://localhost:8000/todoList")
      .then((res) => res.json())
      .then((data) => setTodoList(data));
  }, [pending]);

  useEffect(() => {
    filterHandler();
    allDatesFinder();
    //eslint-disable-next-line
  }, [todoList, status]);

  return (
    <AppContext.Provider
      value={{
        taskName,
        setTaskName,
        deadline,
        setDeadline,
        category,
        setCategory,
        status,
        setStatus,
        todoList,
        setTodoList,
        filteredTodos,
        filteredDates,
        dateFilterHandler,
        pending,
        setPending,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
