import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, completeTodo, incompleteTodo } from '../api/todos';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async (showFinished = false) => {
    setLoading(true);
    try {
      const data = await getTodos(showFinished);
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err);
      setTodos([]); // Clear todos on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos on initial load
  }, []); // Empty dependency array means this runs once on mount

  const addTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData);
      setTodos([...todos, newTodo]); // Add new todo to state
    } catch (err) {
      console.error("Failed to add todo:", err);
      setError(err);
    }
  };

  const updateTodoState = (updatedTodo) => {
    setTodos(todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  const updateTodo = async (todoId, todoData) => {
    try {
      const updated = await updateTodo(todoId, todoData);
      updateTodoState(updated);
    } catch (err) {
      console.error(`Failed to update todo ${todoId}:`, err);
      setError(err);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      // API might return the deleted todo, or just success. Adjust based on actual API.
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId)); // Remove from state
    } catch (err) {
      console.error(`Failed to delete todo ${todoId}:`, err);
      setError(err);
    }
  };

  const toggleComplete = async (todoId, isComplete) => {
      try {
          const updatedTodo = isComplete
              ? await completeTodo(todoId)
              : await incompleteTodo(todoId);
          updateTodoState(updatedTodo);
      } catch (err) {
          console.error(`Failed to toggle complete status for todo ${todoId}:`, err);
          setError(err);
      }
  };


  return { todos, loading, error, fetchTodos, addTodo, updateTodo, deleteTodo, toggleComplete };
};
