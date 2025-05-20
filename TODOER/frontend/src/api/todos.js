import axios from 'axios';

// Define the base URL for the backend API
// In a production environment, this should be configured differently
const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTodos = async (showFinished = false) => {
  try {
    const response = await api.get('/todos/', {
      params: { show_finished: showFinished }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const createTodo = async (todoData) => {
  try {
    const response = await api.post('/todos/', todoData);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const updateTodo = async (todoId, todoData) => {
  try {
    const response = await api.put(`/todos/${todoId}`, todoData);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo ${todoId}:`, error);
    throw error;
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const response = await api.delete(`/todos/${todoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting todo ${todoId}:`, error);
    throw error;
  }
};

export const completeTodo = async (todoId) => {
    try {
      const response = await api.patch(`/todos/${todoId}/complete`);
      return response.data;
    } catch (error) {
      console.error(`Error completing todo ${todoId}:`, error);
      throw error;
    }
  };

export const incompleteTodo = async (todoId) => {
    try {
      const response = await api.patch(`/todos/${todoId}/incomplete`);
      return response.data;
    } catch (error) {
      console.error(`Error incompleting todo ${todoId}:`, error);
      throw error;
    }
  };
