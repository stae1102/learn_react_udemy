import React, { useState } from 'react';
import Todo from '../components/models/todo';

type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  deleteTodo: (id: string) => {},
});

const TodosContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo: Todo = new Todo(todoText);

    setTodos((prevTodos) => prevTodos.concat(newTodo));
  };

  const deleteTodoHandler = (todoId: string) => {
    const updatedTodo = todos.filter((todo) => todo.id !== todoId);

    setTodos(updatedTodo);
  };

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    deleteTodo: deleteTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
