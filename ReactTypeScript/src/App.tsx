import { useState } from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './components/models/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo: Todo = new Todo(todoText);

    setTodos((prevTodos) => prevTodos.concat(newTodo));
  };

  const deleteTodoHandler = (todoId: string) => {
    const updatedTodo = todos.filter((todo) => todo.id !== todoId);

    setTodos(updatedTodo);
  };

  return (
    <div>
      <NewTodo onAddTodo={addTodoHandler} />
      <Todos onDeleteTodo={deleteTodoHandler} items={todos} />
    </div>
  );
}

export default App;
