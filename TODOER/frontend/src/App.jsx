import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import { useTodos } from './hooks/useTodos'

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos();
  const [showFinished, setShowFinished] = useState(false);

  const displayedTodos = showFinished ? todos : todos.filter(todo => !todo.completed);

  return (
    <div className="App">
      <h1>TODOER App</h1>
      <AddTodoForm onAdd={addTodo} />

      <div>
        <label>
          <input
            type="checkbox"
            checked={showFinished}
            onChange={(e) => setShowFinished(e.target.checked)}
          />
          Show Finished Todos
        </label>
      </div>

      <TodoList
        todos={displayedTodos}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
        onToggleComplete={toggleComplete}
      />
    </div>
  )
}

export default App
