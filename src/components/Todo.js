import { useGlobalContext } from "../context";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";

const Todo = ({ id, text, date, category, completed }) => {
  const { todoList, setTodoList } = useGlobalContext();

  const deleteHandler = () => {
    fetch(`http://localhost:8000/todoList/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPending(!pending);
    });
  };

  const completeHandler = () => {
    setTodoList(
      todoList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="todo-container">
      {completed ? (
        <i className="completed-task-icon">
          <BsCheckCircle />
        </i>
      ) : (
        ""
      )}
      <div className={`todo-items ${completed ? "completed" : ""}`}>
        <h3>{text}</h3>
        <h4>Deadline Date: {date}</h4>
        <h4>Category: {category}</h4>
      </div>
      <div className="buttons-container">
        <button className="completed-btn" onClick={completeHandler}>
          <FaCheck />
        </button>
        <button className="delete-btn" onClick={deleteHandler}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Todo;
