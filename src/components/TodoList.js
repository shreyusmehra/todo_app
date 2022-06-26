import { useGlobalContext } from "../context";
import Todo from "./Todo";

const TodoList = () => {
  const { filteredTodos } = useGlobalContext();
  return (
    <div className="todolist-container">
      <ul>
        {filteredTodos?.map((todo) => {
          const { id, text, date, category, completed } = todo;
          return (
            <article key={id}>
              <Todo
                id={id}
                text={text}
                date={date}
                category={category}
                completed={completed}
              />
            </article>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
