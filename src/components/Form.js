import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import { FaFilter } from "react-icons/fa";

const Form = () => {
  const {
    taskName,
    setTaskName,
    deadline,
    setDeadline,
    category,
    setCategory,
    setStatus,
    todoList,
    setTodoList,
    filteredDates,
    dateFilterHandler,
  } = useGlobalContext();

  const inputTextHandler = (e) => {
    setTaskName(e.target.value);
  };

  const dateHandler = (e) => {
    setDeadline(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    setTodoList([
      ...todoList,
      {
        text: taskName,
        completed: false,
        id: uuidv4(),
        date: deadline,
        category: category,
      },
    ]);
    setTaskName("");
    setDeadline("");
    setCategory("Personal");
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const filterHandler = (e) => {
    dateFilterHandler(e.target.value);
  };
  return (
    <form>
      <div className="create-task-container">
        <label>Task Name</label>
        <input
          type={"text"}
          className="todo-input"
          value={taskName}
          required
          id="task-input-field"
          onChange={inputTextHandler}
          placeholder="Enter Task"
        ></input>
        <label>Deadline Date</label>
        <input
          type="date"
          name="date"
          className="todo-date"
          placeholder="Date (DD/MM/YYYY)"
          required
          id="input-date"
          value={deadline}
          onChange={dateHandler}
        ></input>
        <label>Category of Task</label>
        <select
          onChange={categoryHandler}
          name="categories"
          className="categories-dropdown"
        >
          <option value={"Personal"} defaultValue>
            Personal
          </option>
          <option value={"Work"}>Work</option>
          <option value={"College"}>College</option>
          <option value={"Other"}>Other</option>
        </select>
        <button
          className="todo-button"
          id="submit-btn"
          type="submit"
          onClick={submitTodoHandler}
        >
          Submit
        </button>
      </div>
      <div className="select">
        <i className="filter-icon">
          <FaFilter />
        </i>
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value={"all"}>All</option>
          <option value={"completed"}>Completed</option>
          <option value={"uncompleted"}>Uncompleted</option>
        </select>
        <select className="filter-date-todo" onChange={filterHandler}>
          {filteredDates?.map((date, index) => {
            return (
              <option key={index} value={date}>
                {date}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};

export default Form;
