import NewTodo from './components/NewTodo';
import Todos from './components/Todo';
import Todo from './components/models/todo';

function App() {
  const todos = [new Todo('Learn React'), new Todo('Learn TypeScript')];

  return (
    <div>
      <NewTodo />
      <Todos items={todos} />
    </div>
  );
}

export default App;
