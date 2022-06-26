import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="App">
      <div className="title">
        <h1>Todo App</h1>
      </div>
      <div className="container">
        <Form />
        <TodoList />
      </div>
    </div>
  );
};

export default App;
